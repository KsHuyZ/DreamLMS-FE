'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

import { useSignUp } from '@/feature/auth/features/sign-up/hooks';
import { signUpSchema } from '@/validator';

import { TSignUpCredentials } from '@/types';

const SignUp = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });
  const { toast } = useToast();
  const router = useRouter();
  const [isStudent, setIsStudent] = useState(true);
  const { mutateAsync: signUp, isPending } = useSignUp(isStudent);

  const onSubmit = async (values: TSignUpCredentials) => {
    await signUp(values);
    toast({
      title: 'Sign Up Success',
      description: 'Please confirm email in your gmail!',
      variant: 'success',
    });
    router.replace('/sign-in');
  };
  return (
    <div className='p-6 space-y-2 md:space-y-6 sm:p-8'>
      <div className='flex flex-col gap-y-2'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
          Sign up
        </h1>
        <div className='grid grid-cols-2 gap-2 items-center'>
          <Button
            variant={isStudent ? 'default' : 'outline'}
            onClick={() => setIsStudent(true)}
          >
            Student
          </Button>
          <Button
            variant={!isStudent ? 'default' : 'outline'}
            onClick={() => setIsStudent(false)}
          >
            Instructor
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='flex items-center justify-between'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder='Huy' required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Phan' required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='••••••••'
                      type='password'
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' isLoading={isPending} className='w-full'>
              Sign Up
            </Button>
          </form>
          <p className='text-sm font-light text-gray-500 dark:text-gray-400 mt-3'>
            Already have account?{' '}
            <Link
              href='/sign-in'
              className='font-medium text-primary-600 hover:underline dark:text-primary-500'
            >
              Sign in
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
