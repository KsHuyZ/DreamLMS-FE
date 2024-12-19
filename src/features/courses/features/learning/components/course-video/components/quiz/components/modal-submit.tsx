import React, {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useState,
} from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import { useSubmitQuiz } from '@/app/(global)/courses/learning/[courseId]/_components/units/components/quiz/hooks';

import { TQuestionResults, TUnit } from '@/types';

interface IModalSubmitProps {
  selectUnit?: TUnit;
  questionResultList: TQuestionResults[];
  refetch: () => void;
  setShowAnimation: Dispatch<SetStateAction<boolean>>;
  refetchLesson: () => void;
}

const ModalSubmit: React.FC<IModalSubmitProps> = ({
  selectUnit,
  questionResultList,
  refetch,
  setShowAnimation,
  refetchLesson,
}) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useSubmitQuiz();

  const onSubmit = useCallback(async () => {
    const score = await mutateAsync({
      quizId: selectUnit?.id ?? '',
      questionResultRequestList: questionResultList,
    });
    if (score >= 50) {
      setShowAnimation(true);
    }
    refetch();
    refetchLesson();
    setOpen(false);
  }, [
    mutateAsync,
    questionResultList,
    refetch,
    selectUnit?.id,
    setShowAnimation,
    refetchLesson,
  ]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Submit</Button>
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
            <Button onClick={onSubmit} isLoading={isPending}>
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default memo(ModalSubmit);
