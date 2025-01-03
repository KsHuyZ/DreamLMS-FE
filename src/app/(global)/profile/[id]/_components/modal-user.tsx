import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Input from '@/components/inputs/Input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

import { useSocial } from '@/app/(global)/profile/[id]/_hooks';
import { profileSchema } from '@/validator';

import { TUser } from '@/types';

interface Props {
  user?: TUser;
  refetch: () => void;
}

const ModalUser: React.FC<Props> = ({ user, refetch }) => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      walletAddress: '',
    },
    resolver: zodResolver(profileSchema),
  });
  const { control, reset } = form;
  const { mutateAsync: updateProfile, isPending } = useSocial();
  const { toast } = useToast();

  const onSubmit = async () => {
    const result = await form.trigger();
    if (!result) return;
    const { email, ...restValue } = form.getValues();
    await updateProfile(restValue);
    refetch();
    toast({ variant: 'success', title: 'Update success' });
    setOpen(false);
  };

  useEffect(() => {
    reset(user);
  }, [reset, user]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className='flex justify-end'>
        <Button onClick={() => setOpen(true)} className='rounded-md'>
          Update profile
        </Button>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <FormField
            control={control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} className='rounded-md' disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} className='rounded-md' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} className='rounded-md' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='walletAddress'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wallet Address</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input {...field} className='rounded-md' />
                    <Image
                      src='/images/metamask.png'
                      width={50}
                      height={50}
                      alt='metamask'
                      className='w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-3'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
        <DialogFooter>
          <Button
            className='rounded-md'
            onClick={onSubmit}
            isLoading={isPending}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUser;
