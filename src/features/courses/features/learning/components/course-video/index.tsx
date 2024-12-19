'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import Spinner from '@/components/loading/spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

import ListLessons from '@/features/courses/features/learning/components/course-video/components/lesson-list';
import ModalCertificate from '@/features/courses/features/learning/components/course-video/components/modal-certificate';
import ModalQuiz from '@/features/courses/features/learning/components/course-video/components/modal-quiz';
import Quiz from '@/features/courses/features/learning/components/course-video/components/quiz';
import {
  useQuestion,
  useQuizStart,
} from '@/features/courses/features/learning/components/course-video/components/quiz/hooks';
import Video from '@/features/courses/features/learning/components/course-video/components/video';
import {
  useLessonLearning,
  useStartQuiz,
} from '@/features/courses/features/learning/components/course-video/hooks';
import { generateNameColor } from '@/utils';

import {
  EUnitType,
  TAnswerTest,
  TCourseProgress,
  TQuestionResults,
  TQuestionTest,
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

const CourseVideo = ({ course, userId }: CourseVideoProps) => {
  const { data: lessons, isLoading, refetch } = useLessonLearning(course.id);
  const [selectLesson, setSelectLesson] = useState<string[]>([]);
  const [selectUnit, setSelectUnit] = useState<TUnit | undefined>(undefined);
  const [openQuiz, setOpenQuiz] = useState(false);

  const searchParams = useSearchParams();
  const [questionResultList, setQuestionResultList] = useState<
    TQuestionResults[]
  >([]);
  const pathName = usePathname();
  const { replace } = useRouter();
  const [tempUnit, setTempUnit] = useState<TUnitParent>();
  const [currentIndex, setCurrentIndex] = useState(
    Number(searchParams.get('question')) || 0
  );
  const [openCertificate, setOpenCertificate] = useState(false);
  const { mutateAsync: startQuiz, isPending: starting } = useStartQuiz();

  const { data: questions, isLoading: questionLoading } = useQuestion(
    selectUnit?.id,
    selectUnit?.isCompleted
  );
  const { data: quizResult, refetch: retryQuiz } = useQuizStart(
    selectUnit?.unit === EUnitType.QUIZ,
    selectUnit?.id
  );
  const [showResult, setShowResult] = useState(false);

  const onAddQuestionList = useCallback(
    (question: TQuestionTest, answer: TAnswerTest) => {
      setQuestionResultList((prev) => {
        const tempQuestionList = [...prev];
        const isQuestionExist = prev.find((q) => q.questionId === question.id);

        if (isQuestionExist) {
          if (isQuestionExist.answerId === answer.id) {
            return tempQuestionList.filter((q) => q.questionId !== question.id);
          }
          return tempQuestionList.map((question) => {
            if (isQuestionExist.questionId === question.questionId) {
              return {
                ...question,
                answerResults: [{ answerId: answer.id ?? '' }],
              };
            }
            return question;
          });
        }
        const newQuestion: TQuestionResults = {
          questionId: question.id ?? '',
          answerId: answer.id ?? '',
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

  const onSelectIndex = useCallback(
    (index: number) => {
      createQueryString('question', index.toString());
      setCurrentIndex(index);
    },
    [createQueryString, setCurrentIndex]
  );

  const onSelectUnit = useCallback(
    (unit: TUnitParent) => {
      if (unit.unit === EUnitType.QUIZ && !unit.isCompleted) {
        setTempUnit(unit);
        setOpenQuiz(true);
        return;
      }
      setSelectUnit(unit);
      createQueryString('unitId', unit.id);
    },
    [createQueryString, setSelectUnit]
  );

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

  const onNextLesson = useCallback((currentUnit: TUnitParent) => {
    setSelectLesson((prev) => {
      const selectLesson = prev.find((item) => item === currentUnit.parentId);
      if (selectLesson) return prev;
      return [...prev, currentUnit.parentId];
    });
  }, []);

  const onNextUnit = useCallback(() => {
    const unitIndex = units.findIndex((unit) => unit.id === selectUnit?.id);
    if (unitIndex === units.length - 1) {
      return;
    }
    const currentUnit = unitIndex > -1 ? units[unitIndex + 1] : units[0];
    if (currentUnit.unit === EUnitType.QUIZ) {
      setOpenQuiz(true);
      setTempUnit(currentUnit);
    } else {
      setSelectUnit(currentUnit);
      onNextLesson(currentUnit);
    }
  }, [selectUnit?.id, units, onNextLesson]);

  const onStartQuiz = useCallback(async () => {
    if (tempUnit && tempUnit.id) {
      await startQuiz(tempUnit.id);
      setSelectUnit(tempUnit);
      onNextLesson(tempUnit);
      createQueryString('unitId', tempUnit.id);
      setTempUnit(undefined);
      setOpenQuiz(false);
    }
  }, [createQueryString, onNextLesson, startQuiz, tempUnit]);

  const onClearQuiz = useCallback(() => {
    setQuestionResultList([]);
  }, []);

  const isCompletedCourse = useMemo(
    () => units.length && units.every((unit) => unit.isCompleted),
    [units]
  );

  useEffect(() => {
    if (isCompletedCourse && !course.haveCertificate) {
      // setOpenCertificate(true);
    }
  }, [course.haveCertificate, isCompletedCourse]);

  return (
    <>
      <ModalCertificate
        open={openCertificate}
        setOpen={setOpenCertificate}
        userId={userId}
      />
      <ModalQuiz
        openQuiz={openQuiz}
        setOpenQuiz={setOpenQuiz}
        onStartQuiz={onStartQuiz}
        loading={starting}
      />
      <div className='grid grid-cols-7 gap-7 justify-between w-full'>
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
                      <Video
                        selectUnit={selectUnit}
                        onNextUnit={onNextUnit}
                        refetch={refetch}
                      />
                    ) : (
                      <Quiz
                        questions={questions ?? []}
                        isLoading={questionLoading}
                        questionResultList={questionResultList}
                        onAddQuestionList={onAddQuestionList}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                        selectUnit={selectUnit}
                        onClearQuiz={onClearQuiz}
                        onNextUnit={onNextUnit}
                        refetchLesson={refetch}
                        showResult={showResult}
                        setShowResult={setShowResult}
                        quizResult={quizResult}
                        retryQuiz={retryQuiz}
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
                {(selectUnit &&
                  selectUnit.unit === EUnitType.QUIZ &&
                  !quizResult?.isCompleted) ||
                (quizResult?.isCompleted && showResult) ? (
                  <Card className='border rounded-md'>
                    <CardHeader>
                      <CardTitle>Quiz list</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='grid grid-cols-10 gap-10'>
                        {questionLoading
                          ? Array.from({ length: 20 }).map((_, index) => (
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
                                className={cn(
                                  'rounded-md',
                                  q.answers.some((answer) =>
                                    answer.isCorrect === answer.isSelected
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-red-600 text-white'
                                  )
                                )}
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
                )}
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
