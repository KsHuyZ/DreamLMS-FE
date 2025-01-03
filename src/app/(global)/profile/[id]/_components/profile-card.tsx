'use client';
import Image from 'next/image';
import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import { TUser } from '@/types';
import { FileWithPreview, ImageCropper } from '@/components/image-cropper';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUploadAvatar } from '@/app/(global)/profile/[id]/_components/hooks';
import { useToast } from '@/components/ui/use-toast';

interface IProfileCardProps {
  user?: TUser;
  refetch: () => void;
}

const accept = {
  'image/*': [],
};

const ProfileCard = ({ user, refetch }: IProfileCardProps) => {
  const [selectedFile, setSelectedFile] =
    React.useState<FileWithPreview | null>(null);
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const { mutateAsync: uploadAvatar, isPending } = useUploadAvatar();
  const { toast } = useToast();
  const onCompleted = async (file: string) => {
    await uploadAvatar(file);
    setSelectedFile(null);
    refetch();
    toast({ variant: 'success', title: 'Update avatar success!' });
  };

  const onDrop = React.useCallback((acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      alert('Selected image is too large!');
      return;
    }

    const fileWithPreview = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    setSelectedFile(fileWithPreview);
    setDialogOpen(true);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  });

  return (
    <Card className='border-none p-0'>
      <CardContent className='p-0'>
        <div className='relative h-35 md:h-65'>
          <div className='bg-[url(/images/banner.png)] w-full h-48 rounded-md' />
        </div>
        <div className='w-full h-5 relative'>
          <div className='absolute -bottom-2 left-3'>
            <div className='flex items-center space-x-4'>
              <div className='relative z-[9] drop-shadow-2'>
                {selectedFile ? (
                  <ImageCropper
                    dialogOpen={isDialogOpen}
                    setDialogOpen={setDialogOpen}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    onCompleted={onCompleted}
                    isPending={isPending}
                  />
                ) : (
                  <Avatar
                    {...getRootProps()}
                    className='size-36 cursor-pointer ring-offset-2 ring-2 ring-slate-200'
                  >
                    <input {...getInputProps()} />
                    <AvatarImage
                      src={user?.photo || '/images/avatar.jpg'}
                      alt='@shadcn'
                    />
                    <AvatarFallback>AVT</AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className='flex flex-col text-background'>
                <Label className='text-lg font-bold text-black'>
                  {user?.firstName} {user?.lastName}
                </Label>
                <span className='text-black text-sm font-thin'>
                  {user?.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
