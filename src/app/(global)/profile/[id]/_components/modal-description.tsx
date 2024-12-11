import { Content } from '@tiptap/core';
import { Pen } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import MinimalTiptapEditor from '@/components/ui/minimal-tiptap';

import { useSocial } from '@/app/(global)/profile/[id]/_hooks';

import { TUser } from '@/types';

interface Props {
  user?: TUser;
  refetch: () => void;
}

const ModalDescription: React.FC<Props> = ({ user, refetch }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Content | null>(user?.description ?? null);

  useEffect(() => {
    if (user?.description) {
      setValue(user.description);
    }
  }, [user]);

  const { mutateAsync: updateUser, isPending } = useSocial();

  const onSubmit = async () => {
    await updateUser({ description: value as string });
    setOpen(false);
    refetch();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div
        className='p-2 rounded-full hover:bg-gray-300 cursor-pointer'
        onClick={() => setOpen(true)}
      >
        <Pen className='text-muted-foreground' size={15} />
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Description</DialogTitle>
          <MinimalTiptapEditor
            onChange={(value) => setValue(value)}
            value={value}
            immediatelyRender={false}
            editorContentClassName='p-5'
            output='html'
            placeholder='Type your description here...'
            autofocus={true}
            editable={true}
            editorClassName='focus:outline-none'
          />
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onSubmit} isLoading={isPending}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDescription;
