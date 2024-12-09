import React, { Dispatch, memo, SetStateAction } from 'react';

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

interface IModalQuizProps {
  openQuiz: boolean;
  setOpenQuiz: Dispatch<SetStateAction<boolean>>;
  onStartQuiz: () => void;
  loading: boolean;
}

const ModalQuiz: React.FC<IModalQuizProps> = ({
  openQuiz,
  setOpenQuiz,
  onStartQuiz,
  loading,
}) => {
  return (
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
          <Button isLoading={loading} onClick={onStartQuiz}>
            Start
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default memo(ModalQuiz);
