import { useParams, useRouter } from 'next/navigation';
import React, { memo, useEffect, useState } from 'react';
import Lottie from 'react-lottie';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

import { runningOptions } from '@/constant';
import { useCreateCertificate } from '@/features/courses/features/learning/components/course-video/hooks';

interface ModalCertificateProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ModalCertificate: React.FC<ModalCertificateProps> = ({
  open,
  setOpen,
}) => {
  const [progress, setProgress] = useState(0);
  const { courseId } = useParams();
  const { isLoading } = useCreateCertificate(courseId as string, open);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (isLoading || !open) return;
    setProgress(100);
    router.refresh();
    setOpen(false);
    toast({ variant: 'success', title: 'Create certificate success' });
  }, [isLoading, open, router, setOpen, toast]);

  useEffect(() => {
    if (!open) return setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev === 96) {
          clearInterval(interval);
          return 96;
        }
        return prev + 2;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create certificate</DialogTitle>
          <DialogDescription>
            We are creating your certificate. Please be patient, it will take 1
            - 2 minutes
          </DialogDescription>
        </DialogHeader>
        <div className='p-10 flex flex-col space-y-4 justify-center items-center'>
          <Lottie
            options={runningOptions}
            style={{ width: 150, height: 150 }}
            isClickToPauseDisabled={false}
          />
          <Progress value={progress} color='bg-red-600' className='h-2' />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ModalCertificate);
