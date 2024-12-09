import { ChevronLeft, ChevronRight, Clock, Frown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FaCircleCheck } from 'react-icons/fa6';
import Lottie from 'react-lottie';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

import CountdownTime from '@/app/(global)/courses/learning/[courseId]/_components/units/components/quiz/components/countdown-time';
import { congratulationsOptions } from '@/constant';
import ModalSubmit from '@/features/courses/features/learning/components/course-video/components/quiz/components/modal-submit';
import { useQuizStart } from '@/features/courses/features/learning/components/course-video/components/quiz/hooks';
import { useStartQuiz } from '@/features/courses/features/learning/components/course-video/hooks';
import { convertUTC7ToUTC0 } from '@/utils';

import { TAnswerTest, TQuestionResults, TQuestionTest, TUnit } from '@/types';

interface IQuizProps {
  questions: TQuestionTest[];
  isLoading: boolean;
  questionResultList: TQuestionResults[];
  selectUnit?: TUnit;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  onAddQuestionList: (question: TQuestionTest, choice: TAnswerTest) => void;
  onClearQuiz: () => void;
  onNextUnit: () => void;
  refetchLesson: () => void;
  setShowResult: (value: boolean) => void;
  showResult: boolean;
}

const Quiz = ({
  questionResultList,
  onAddQuestionList,
  currentIndex,
  selectUnit,
  setCurrentIndex,
  isLoading,
  questions,
  onClearQuiz,
  onNextUnit,
  refetchLesson,
  showResult,
  setShowResult,
}: IQuizProps) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const { data, refetch } = useQuizStart(selectUnit?.id);
  const [showAnimation, setShowAnimation] = useState(false);
  const { mutateAsync: startQuiz, isPending: starting } = useStartQuiz();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      // if (value) {
      //   searchParams.set(name, value);
      // } else {
      //   searchParams.delete(name);
      // }
      // return replace(`${pathName}?${searchParams.toString()}`);
    },
    [pathName, replace, searchParams]
  );

  useEffect(() => {
    if (showAnimation) {
      const timeoutId = setTimeout(() => setShowAnimation(false), 4000);
      return () => clearTimeout(timeoutId);
    }
  }, [showAnimation]);

  const onChangeQuiz = useCallback(
    (next: number) => {
      createQueryString('question', (currentIndex + next).toString());
      setCurrentIndex(currentIndex + next);
    },
    [currentIndex, createQueryString, setCurrentIndex]
  );

  const restTime = useMemo(() => {
    const duration = selectUnit?.time ?? 0;
    const endTime = new Date(data?.createdAt || 0).getTime() + duration * 1000;
    const now = new Date(convertUTC7ToUTC0(new Date())).getTime();
    const timeRemaining = Math.max((endTime - now) / 1000, 0);
    return Math.floor(timeRemaining);
  }, [data?.createdAt, selectUnit?.time]);

  const isPass = useMemo(() => Number(data?.score) > 50, [data?.score]);

  const tryAgain = useCallback(async () => {
    if (selectUnit?.id) {
      await startQuiz(selectUnit?.id);
      refetch();
      onClearQuiz();
    }
  }, [refetch, selectUnit?.id, startQuiz, onClearQuiz]);

  const onContinue = useCallback(async () => {
    if (!isPass) {
      return await tryAgain();
    }
    onNextUnit();
  }, [isPass, tryAgain, onNextUnit]);

  return (
    <>
      {showAnimation && (
        <Lottie
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            zIndex: 9999,
          }}
          options={congratulationsOptions}
        />
      )}
      {data?.isCompleted && !showResult ? (
        <Card>
          <CardContent className='min-w-full flex flex-col justify-center space-y-5 items-center'>
            <Label>{isPass ? 'Congratulation' : 'Opps'}</Label>
            <div className='flex items-center justify-center'>
              {isPass ? (
                <div className='flex items-center justify-center'>
                  <div className='absolute w-4 h-4 rounded-full bg-primary-600 opacity-50 animate-ripple z-10'></div>
                  <FaCircleCheck className='w-8 h-8 text-primary-600 z-30 rounded-full bg-white' />
                </div>
              ) : (
                <Frown className='w-10 h-10  text-primary-600' />
              )}
            </div>
            <Label className='text-center  text-sm text-slate-500 '>
              Total point: {data.score}
            </Label>
            <Label className='text-center  text-sm text-slate-500 '>
              {isPass
                ? 'You are pass this quiz'
                : 'You are fail this quiz. Please try again'}
            </Label>
          </CardContent>
          <CardFooter className='flex justify-end'>
            <div className='flex items-center space-x-2'>
              <Button variant='outline' onClick={() => setShowResult(true)}>
                Check your result
              </Button>
              <Button onClick={onContinue} isLoading={starting}>
                {isPass ? 'Continue learning' : 'Try again'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardContent className='min-w-full'>
            <div className='flex flex-col space-y-8'>
              {showResult ? (
                <div className='flex justify-start'>
                  <div
                    className='cursor-pointer hover:bg-slate-400 p-2 rounded-full'
                    onClick={() => setShowResult(false)}
                  >
                    <ChevronLeft size={20} />
                  </div>
                </div>
              ) : (
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <Clock size={30} />
                    <div className='flex flex-col'>
                      <span className='font-bold text-sm text-gray-500'>
                        Time remaining
                      </span>
                      {isLoading ? (
                        <Skeleton className='w-48 h-4' />
                      ) : (
                        <CountdownTime totalSeconds={restTime} />
                      )}
                    </div>
                  </div>
                  {isLoading ? (
                    <Skeleton className='w-24 h-10' />
                  ) : (
                    <ModalSubmit
                      selectUnit={selectUnit}
                      questionResultList={questionResultList}
                      refetch={refetch}
                      setShowAnimation={setShowAnimation}
                      refetchLesson={refetchLesson}
                    />
                  )}
                </div>
              )}
              <div className='grid grid-cols-3 gap-3'>
                <div className='flex flex-col space-y-6 col-span-2'>
                  <div className='flex flex-col space-y-4'>
                    {isLoading ? (
                      <Skeleton className='w-48 h-4' />
                    ) : (
                      <span className='text-sm font-bold'>
                        Question {currentIndex + 1} of {questions?.length}
                      </span>
                    )}
                    <p className='text-xl font-bold'>
                      {isLoading ? (
                        <div className='flex flex-col space-y-2'>
                          <Skeleton className='w-96 h-4' />
                          <Skeleton className='w-96 h-4' />
                          <Skeleton className='w-96 h-4' />
                          <Skeleton className='w-96 h-4' />
                        </div>
                      ) : (
                        questions && questions[currentIndex].title
                      )}
                    </p>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    {isLoading
                      ? Array.from({ length: 4 }).map((_, index) => (
                          <Skeleton key={index} className='w-48 h-10' />
                        ))
                      : questions &&
                        questions[currentIndex].answers.map((choice) => (
                          <Button
                            key={choice.title}
                            variant={
                              questionResultList.find(
                                (question) => question.answerId === choice.id
                              )
                                ? 'default'
                                : 'outline'
                            }
                            onClick={() => {
                              if (showResult) return;
                              onAddQuestionList(
                                questions[currentIndex],
                                choice
                              );
                            }}
                            className={cn(
                              showResult && choice.isSelected
                                ? 'bg-red-600 text-white'
                                : '',
                              showResult && choice.isCorrect
                                ? 'bg-emerald-600 text-white'
                                : ''
                            )}
                          >
                            {choice.title}
                          </Button>
                        ))}
                  </div>
                </div>
                <div className='w-full h-full flex items-center justify-center'>
                  <div className='relative size-40'>
                    <svg
                      className='size-full'
                      width='36'
                      height='36'
                      viewBox='0 0 36 36'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle
                        cx='18'
                        cy='18'
                        r='16'
                        fill='none'
                        className='stroke-current text-gray-200 '
                        strokeWidth='2'
                      ></circle>
                      <g className='origin-center -rotate-90 transform'>
                        <circle
                          cx='18'
                          cy='18'
                          r='16'
                          fill='none'
                          className='stroke-current text-primary-600 duration-300'
                          strokeWidth='2'
                          strokeDasharray='100'
                          strokeDashoffset={
                            100 -
                            (showResult
                              ? questions.length
                              : questionResultList.length /
                                Number(questions?.length)) *
                              100
                          }
                          stroke='currentColor'
                          strokeLinecap='round'
                        ></circle>
                      </g>
                    </svg>
                    <div className='absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2'>
                      <span className='text-center text-2xl font-bold text-gray-800 '>
                        {showResult
                          ? questions.length
                          : questionResultList.length}{' '}
                        / {questions.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-between'>
                <Button
                  leftIcon={ChevronLeft}
                  variant='outline'
                  disabled={currentIndex === 0}
                  onClick={() => onChangeQuiz(-1)}
                >
                  Back
                </Button>
                <Button
                  rightIcon={ChevronRight}
                  disabled={currentIndex === Number(questions?.length) - 1}
                  onClick={() => onChangeQuiz(1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default memo(Quiz);
