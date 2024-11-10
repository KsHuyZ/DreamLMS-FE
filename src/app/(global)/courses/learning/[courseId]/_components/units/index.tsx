'use client';

import { Contract, ethers } from 'ethers';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import Lottie from 'react-lottie';

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
import { useLessonList } from '@/app/(global)/courses/_hooks';
import ListUnits from '@/app/(global)/courses/learning/[courseId]/_components/units/components/list-units';
import Loading from '@/app/(global)/courses/learning/[courseId]/_components/units/components/loading';
import Quiz from '@/app/(global)/courses/learning/[courseId]/_components/units/components/quiz';
import { useSubmitQuiz } from '@/app/(global)/courses/learning/[courseId]/_components/units/components/quiz/hooks';
import Video from '@/app/(global)/courses/learning/[courseId]/_components/units/components/video';

import {
  EUnitType,
  TChoice,
  TQuestionResponse,
  TQuestionResults,
  TUnit,
} from '@/types';
interface CourseVideoProps {
  id: string;
  userId: string;
}

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: require('@/assets/json/confetti.json'),
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const CONTRACT_ADDRESS = '0x6CAe432354A436fd826f03E258aD84F83f84a7F8';

const CourseVideo = ({ id, userId }: CourseVideoProps) => {
  const { data, isLoading } = useLessonList(id);
  const [currentLesson, setCurrentLesson] = useState<string[]>([]);
  const [selectUnit, setSelectUnit] = useState<TUnit | undefined>(undefined);
  const [open, setOpen] = useState(false);
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
  const { replace, push } = useRouter();
  const { mutateAsync, isPending } = useSubmitQuiz();
  const [finalResult, setFinalResult] = useState<
    { score: string; isFinal: boolean; isPass: boolean } | undefined
  >(undefined);
  const [currentIndex, setCurrentIndex] = useState(
    Number(searchParams.get('question')) || 0
  );
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onAddQuestionList = useCallback(
    (question: TQuestionResponse, choice: TChoice) => {
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
    setFinalResult(result);
    if (!result.isFinal) {
      return;
    }
    try {
      if (window.ethereum) {
        setLoading(true);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
        const transaction = await contract.createCertificate(
          userId,
          id,
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

  // useEffect(() => {
  //   if (data && !isLoading) {
  //     const unitId = searchParams.get('unitId');
  //     if (unitId) {
  //       data.forEach((lesson) =>
  //         lesson.units.forEach((unit) => {
  //           if (unit.id === unitId) {
  //             setSelectUnit(unit);
  //             setCurrentLesson((prev) => [...prev, lesson.id]);
  //           }
  //         })
  //       );
  //     } else {
  //       setCurrentLesson([data[0].id]);
  //       setSelectUnit(data[0].units[0]);
  //     }
  //   }
  // }, [data, isLoading, searchParams]);

  useEffect(() => {
    if (showAnimation) {
      setTimeout(() => setShowAnimation(false), 4000);
    }
  }, [showAnimation]);

  const handleContinueLearning = () => {
    if (finalResult?.isFinal) {
      push(`/certificate/${userId}/${id}`);
      return;
    }
    // if (data) {
    //   data.forEach((lesson) =>
    //     lesson.units.forEach((unit, index) => {
    //       if (unit.id === selectUnit?.id && lesson.units.length - 1 < index) {
    //         setSelectUnit(lesson.units[index]);
    //       }
    //     })
    //   );
    //   setSelectUnit(data[0].units[0]);
    // }
    setFinalResult(undefined);
  };

  return (
    <>
      <Loading open={loading} />
      {showAnimation && (
        <Lottie
          style={{
            backgroundColor: 'transparent',
            position: 'fixed',
          }}
          options={defaultOptions}
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
      <div className='flex px-5 flex-col space-y-4 overflow-y-scroll h-[calc(100vh-100px)] no-scrollbar'>
        <div className='w-full'>
          <div className='mx-auto'>
            <div>
              <Label className='text-xl font-bold'>
                {!selectUnit ? (
                  <Skeleton className='w-64 h-4' />
                ) : (
                  selectUnit.title ?? 'Unknowns'
                )}
              </Label>
            </div>
            {finalResult ? (
              <>
                <Card>
                  <CardHeader></CardHeader>
                  <CardContent>
                    <div className='flex flex-col space-y-4 items-center w-full'>
                      <Label className='text-xl font-bold'>
                        You are competed this test with
                      </Label>
                      <Label className='text-2xl font-bold text-primary-600'>
                        {finalResult.score}
                      </Label>
                      <Button onClick={handleContinueLearning}>
                        {finalResult.isFinal
                          ? 'See your certificate'
                          : 'Continue learning'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className='grid grid-cols-4 gap-2 items-stretch overflow-scroll no-scrollbar mt-5'>
                <div className='col-span-3'>
                  {data && selectUnit ? (
                    selectUnit.unit === EUnitType.VIDEO ? (
                      <Video selectUnit={selectUnit} />
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
                    <ListUnits
                      data={data}
                      isLoading={isLoading}
                      currentLesson={currentLesson}
                      setCurrentLesson={setCurrentLesson}
                      selectUnit={selectUnit}
                      id={id}
                    />
                  )
                ) : null}
              </div>
            )}
          </div>
        </div>

        <div className='mx-4 flex flex-col space-y-2'>
          <Label className='font-bold text-xl'>Description</Label>
          {/* <div
            dangerouslySetInnerHTML={{
              __html: selectUnit
                ? selectUnit.video
                  ? selectUnit?.video?.description ?? ''
                  : selectUnit?.quizResponse?.description ?? ''
                : '',
            }}
          /> */}
        </div>
      </div>
    </>
  );
};

export default CourseVideo;
