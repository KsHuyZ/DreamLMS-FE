'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import {} from '@/lib/action';

import Input from '@/components/inputs/Input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

import { forgetPasswordSchema } from '@/validator';

import { TForgetPasswordCredentials } from '@/types';

const ForgotPassword = () => {
  const form = useForm<TForgetPasswordCredentials>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const { toast } = useToast();

  const onSubmit = async (values: TForgetPasswordCredentials) => {
    console.log({ values });
    toast({ title: 'Forgot password success!', variant: 'success' });
  };

  return (
    <div className='p-6 pt-0 space-y-4 md:space-y-6 sm:p-8'>
      <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
        Forgot Password
      </h1>
      <Form {...form}>
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='name@name.com'
                    type='email'
                    error={form.formState.errors.email}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className='w-full text-center'
            // isLoading={isPending}
            disabled={!form.formState.isDirty}
          >
            Send Recovery Email
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPassword;
