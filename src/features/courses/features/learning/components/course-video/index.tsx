'use client';

import { Contract, ethers } from 'ethers';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Lottie from 'react-lottie';

import { cn } from '@/lib/utils';

import Spinner from '@/components/loading/spinner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';

import { abi } from '@/abi/contract.json';
import { useQuestion } from '@/app/(global)/_hooks';
import Loading from '@/app/(global)/courses/learning/[courseId]/_components/units/components/loading';
import Quiz from '@/app/(global)/courses/learning/[courseId]/_components/units/components/quiz';
import { useSubmitQuiz } from '@/app/(global)/courses/learning/[courseId]/_components/units/components/quiz/hooks';
import { congratulationsOptions } from '@/constant';
import ListLessons from '@/features/courses/features/learning/components/course-video/components/lesson-list';
import Video from '@/features/courses/features/learning/components/course-video/components/video';
import { useLessonLearning } from '@/features/courses/features/learning/components/course-video/hooks';
import { generateNameColor } from '@/utils';

import {
  EUnitType,
  TAnswer,
  TCourseProgress,
  TQuestionResponse,
  TQuestionResults,
  TUnit,
} from '@/types';

interface CourseVideoProps {
  course: TCourseProgress;
  userId: string;
}

export type TUnitParent = {
  parentId: string;
  isCompleted?: boolean;
} & TUnit;

const CONTRACT_ADDRESS = '0x6CAe432354A436fd826f03E258aD84F83f84a7F8';

const CourseVideo = ({ userId, course }: CourseVideoProps) => {
  const { data: lessons, isLoading } = useLessonLearning(course.id);
  const [selectLesson, setSelectLesson] = useState<string[]>([]);
  const [selectUnit, setSelectUnit] = useState<TUnit | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const searchParams = useSearchParams();
  const [questionResultList, setQuestionResultList] = useState<
    TQuestionResults[]
  >([]);
  const { data: questions, isLoading: questionLoading } = useQuestion(
    selectUnit?.id,
    selectUnit?.unit
  );
  const pathName = usePathname();
  const { replace } = useRouter();
  const { mutateAsync, isPending } = useSubmitQuiz();
  const [tempUnit, setTempUnit] = useState<TUnitParent>();
  const [currentIndex, setCurrentIndex] = useState(
    Number(searchParams.get('question')) || 0
  );
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onAddQuestionList = useCallback(
    (question: TQuestionResponse, choice: TAnswer) => {
      setQuestionResultList((prev) => {
        const tempQuestionList = [...prev];
        const isQuestionExist = prev.find((q) => q.questionId === question.id);

        if (isQuestionExist) {
          if (isQuestionExist.answerResults[0].answerId === choice.id) {
            return tempQuestionList.filter((q) => q.questionId !== question.id);
          }
          return tempQuestionList.map((question) => {
            if (isQuestionExist.questionId === question.questionId) {
              return {
                ...question,
                answerResults: [{ answerId: choice.id ?? '' }],
              };
            }
            return question;
          });
        }
        const newQuestion: TQuestionResults = {
          questionId: question.id ?? '',
          answerResults: [{ answerId: choice.id ?? '' }],
        };
        return [...tempQuestionList, newQuestion];
      });
    },
    [setQuestionResultList]
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(
        searchParams as unknown as URLSearchParams
      );
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return replace(`${pathName}?${params.toString()}`);
    },
    [pathName, replace, searchParams]
  );

  const handleSubmit = async (values: {
    quizId: string;
    questionResultRequestList: TQuestionResults[];
  }) => {
    const result = await mutateAsync({ ...values });
    setShowAnimation(true);
    try {
      if (window.ethereum) {
        setLoading(true);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
        const transaction = await contract.createCertificate(
          userId,
          course.id,
          ethers.toBigInt(result.score.split('/')[0]),
          {
            value: ethers.parseEther('0.0025'),
          }
        );
        await transaction.wait();
        toast({ variant: 'success', title: 'Saved result success!' });
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'Save result fail' });
    } finally {
      setLoading(false);
    }
  };

  const onSelectIndex = useCallback(
    (index: number) => {
      createQueryString('question', index.toString());
      setCurrentIndex(index);
    },
    [createQueryString, setCurrentIndex]
  );

  const onSelectUnit = useCallback(
    (unit: TUnitParent) => {
      if (unit.unit === EUnitType.QUIZ) {
        setTempUnit(unit);
        setOpenQuiz(true);
        return;
      }
      setSelectUnit(unit);
      createQueryString('unitId', unit.id);
    },
    [createQueryString, setSelectUnit]
  );

  const onStartQuiz = () => {
    if (tempUnit && tempUnit.id) {
      onSelectUnit(tempUnit);
      onNextLesson(tempUnit);
      setTempUnit(undefined);
      setOpenQuiz(false);
    }
  };

  const units = useMemo(
    () =>
      lessons?.flatMap((lesson) => {
        const videos = lesson?.videos.map((video) => ({
          ...video,
          unit: EUnitType.VIDEO,
          parentId: lesson.id,
          id: video.id,
        }));
        const quizzes = lesson?.quizzes.map((quiz) => ({
          ...quiz,
          unit: EUnitType.QUIZ,
          parentId: lesson.id,
          id: quiz.id,
        }));
        return [...videos, ...quizzes].sort(
          (a, b) => Number(a.order) - Number(b.order)
        );
      }) ?? [],
    [lessons]
  );

  const onSelectLessons = useCallback((id: string) => {
    setSelectLesson((prev) => {
      const selectLesson = prev.find((item) => item === id);
      if (selectLesson) {
        return prev.filter((lesson) => lesson !== id);
      }
      return [...prev, id];
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const unitId = searchParams.get('unitId');
      const selectUnit = units.find((unit) => unit.id === unitId);
      if (selectUnit) {
        setSelectUnit(selectUnit);
        setSelectLesson((prev) => [...prev, selectUnit.parentId]);
      } else {
        setSelectLesson([units[0].parentId]);
        setSelectUnit(units[0]);
      }
    }
  }, [units, isLoading, searchParams]);

  useEffect(() => {
    if (showAnimation) {
      const timeoutId = setTimeout(() => setShowAnimation(false), 4000);
      return () => clearTimeout(timeoutId);
    }
  }, [showAnimation]);

  const onNextLesson = useCallback((currentUnit: TUnitParent) => {
    setSelectLesson((prev) => {
      const selectLesson = prev.find((item) => item === currentUnit.parentId);
      if (selectLesson) return prev;
      return [...prev, currentUnit.parentId];
    });
  }, []);

  const onNextUnit = useCallback(() => {
    const unitIndex = units.findIndex((unit) => unit.id === selectUnit?.id);
    const currentUnit = unitIndex > -1 ? units[unitIndex + 1] : units[0];
    if (currentUnit.unit === EUnitType.QUIZ) {
      setOpenQuiz(true);
      setTempUnit(currentUnit);
    } else {
      setSelectUnit(currentUnit);
      onNextLesson(currentUnit);
    }
  }, [selectUnit?.id, units, onNextLesson]);

  return (
    <>
      <Loading open={loading} />

      <AlertDialog open={openQuiz} onOpenChange={setOpenQuiz}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you ready for test</AlertDialogTitle>
            <AlertDialogDescription>
              When you press start, the quiz time count will start and can not
              cancel
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={onStartQuiz}>Start</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {showAnimation && (
        <Lottie
          style={{
            backgroundColor: 'transparent',
            position: 'fixed',
          }}
          options={congratulationsOptions}
          height='100%'
          width='100%'
        />
      )}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className='grid grid-cols-7 gap-7 justify-between h-screen w-full'>
        <div className='flex px-5 flex-col space-y-4 col-span-5'>
          <div className='w-full'>
            <div className='mx-auto'>
              <div className='items-stretch overflow-scroll no-scrollbar mt-5'>
                <div className='col-span-4'>
                  <div className='rounded-md w-full shadow-md p-4 bg-tertiary-800 flex items-center space-x-4 mb-4'>
                    <Image
                      src={course.image.url}
                      width={200}
                      height={200}
                      alt='course image'
                      className='rounded-md border shadow-md'
                    />
                    <div className='flex flex-col space-y-4 text-white'>
                      <h2 className='font-bold'>{course.name}</h2>
                      <div className='flex items-center space-x-4'>
                        <div
                          style={{
                            backgroundColor: generateNameColor(
                              cn(
                                course.createdBy.firstName,
                                course.createdBy.lastName
                              )
                            ),
                          }}
                          className='w-10 h-10 rounded-full flex justify-center items-center'
                        >
                          <span className='text-white text-2xl'>
                            {course.createdBy.firstName.charAt(0)}
                          </span>
                        </div>
                        <p>
                          Author:{' '}
                          {cn(
                            course.createdBy.firstName,
                            course.createdBy.lastName
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  {units && selectUnit ? (
                    selectUnit.unit === EUnitType.VIDEO ? (
                      <Video selectUnit={selectUnit} onNextUnit={onNextUnit} />
                    ) : (
                      <Quiz
                        questions={questions}
                        isLoading={questionLoading}
                        questionResultList={questionResultList}
                        onAddQuestionList={onAddQuestionList}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                        selectUnit={selectUnit}
                        mutateAsync={handleSubmit}
                        isPending={isPending}
                      />
                    )
                  ) : (
                    <div className='w-full h-96 flex items-center justify-center'>
                      <Spinner />
                    </div>
                  )}
                  <div>
                    <Label className='text-xl font-bold mt-20'>
                      {!selectUnit ? (
                        <Skeleton className='w-64 h-4' />
                      ) : (
                        selectUnit.title ?? 'Unknowns'
                      )}
                    </Label>
                  </div>
                </div>
                {selectUnit ? (
                  selectUnit.unit === EUnitType.QUIZ ? (
                    <Card className='border rounded-md'>
                      <CardHeader>
                        <CardTitle>Quiz list</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='grid grid-cols-4 gap-4'>
                          {questionLoading && !questions
                            ? Array.from({ length: 12 }).map((_, index) => (
                                <Skeleton className='w-24 h-4' key={index} />
                              ))
                            : questions &&
                              questions.map((q, i) => (
                                <Button
                                  variant={
                                    questionResultList.find(
                                      (question) => question.questionId === q.id
                                    )
                                      ? 'default'
                                      : 'outline'
                                  }
                                  key={i}
                                  onClick={() => onSelectIndex(i)}
                                >
                                  {i < 10 ? 0 : ''}
                                  {i + 1}
                                </Button>
                              ))}
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <></>
                  )
                ) : null}
              </div>
            </div>
          </div>

          <div className='mx-4 flex flex-col space-y-2'>
            <Label className='font-bold text-xl'>Description</Label>
            <div
              dangerouslySetInnerHTML={{
                __html: selectUnit ? selectUnit.description : '',
              }}
            />
          </div>
        </div>
        <ListLessons
          isLoading={isLoading}
          lessons={lessons ?? []}
          selectLessons={selectLesson}
          onSelectLessons={onSelectLessons}
          selectUnit={selectUnit}
          onSelectUnit={onSelectUnit}
          id={course.id}
          progress={course.progress}
        />
      </div>
    </>
  );
};

export default CourseVideo;
