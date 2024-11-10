import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useState,
} from 'react';

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
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import CountdownTime from '@/app/(global)/courses/learning/[courseId]/_components/units/components/quiz/components/countdown-time';

import { TChoice, TQuestionResponse, TQuestionResults, TUnit } from '@/types';

interface IQuizProps {
  questions?: TQuestionResponse[];
  isLoading: boolean;
  questionResultList: TQuestionResults[];
  selectUnit?: TUnit;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  onAddQuestionList: (question: TQuestionResponse, choice: TChoice) => void;
  mutateAsync: (values: {
    quizId: string;
    questionResultRequestList: TQuestionResults[];
  }) => Promise<void>;
  isPending: boolean;
}

const Quiz = ({
  questions,
  isLoading,
  questionResultList,
  onAddQuestionList,
  currentIndex,
  selectUnit,
  setCurrentIndex,
  mutateAsync,
  isPending,
}: IQuizProps) => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

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

  const onChangeQuiz = useCallback(
    (next: number) => {
      createQueryString('question', (currentIndex + next).toString());
      setCurrentIndex(currentIndex + next);
    },
    [currentIndex, createQueryString, setCurrentIndex]
  );

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              If you submit, your result will be saved and can not be cancel
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Card>
        <CardHeader></CardHeader>
        <CardContent className='min-w-full'>
          <div className='flex flex-col space-y-8'>
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
                    <CountdownTime totalSeconds={0} />
                  )}
                </div>
              </div>
              {isLoading ? (
                <Skeleton className='w-24 h-10' />
              ) : (
                <Button
                  onClick={() =>
                    mutateAsync({
                      quizId: selectUnit?.id ?? '',
                      questionResultRequestList: questionResultList,
                    })
                  }
                  isLoading={isPending}
                >
                  Submit
                </Button>
              )}
            </div>
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
                      questions && questions[currentIndex].content
                    )}
                  </p>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  {isLoading && !questions
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} className='w-48 h-10' />
                      ))
                    : questions &&
                      questions[currentIndex].choiceResponses.map((choice) => (
                        <Button
                          key={choice.content}
                          variant={
                            questionResultList.find(
                              (question) =>
                                question.answerResults[0].answerId === choice.id
                            )
                              ? 'default'
                              : 'outline'
                          }
                          onClick={() =>
                            onAddQuestionList(questions[currentIndex], choice)
                          }
                        >
                          {choice.content}
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
                      stroke-width='2'
                    ></circle>
                    <g className='origin-center -rotate-90 transform'>
                      <circle
                        cx='18'
                        cy='18'
                        r='16'
                        fill='none'
                        className='stroke-current text-primary-600 duration-300'
                        stroke-width='2'
                        stroke-dasharray='100'
                        // stroke-dashoffset={
                        //   100 -
                        //   (questionResultList.length /
                        //     Number(questions?.length) ?? 1) *
                        //     100
                        // }
                        stroke='currentColor'
                        stroke-linecap='round'
                      ></circle>
                    </g>
                  </svg>
                  <div className='absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2'>
                    <span className='text-center text-2xl font-bold text-gray-800 '>
                      {questionResultList.length} / {questions?.length}
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
    </>
  );
};

export default memo(Quiz);
