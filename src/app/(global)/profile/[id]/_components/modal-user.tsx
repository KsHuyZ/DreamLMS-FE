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

import { useSocial } from '@/app/(global)/profile/[id]/_hooks';

import { TUser } from '@/types';
import { useToast } from '@/components/ui/use-toast';

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
  });
  const { control, reset } = form;
  const { mutateAsync: updateProfile, isPending } = useSocial();
  const { toast } = useToast();

  const onSubmit = async () => {
    const { email, ...restValue } = form.getValues();
    await updateProfile(restValue);
    refetch();
    toast({ variant: 'success', title: 'Update success' });
  };

  useEffect(() => {
    reset(user);
  }, [user]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>Update profile</Button>
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
                  <Input {...field} className='rounded-md' />
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
