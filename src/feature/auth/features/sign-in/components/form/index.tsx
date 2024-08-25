'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { setCookies } from '@/lib/action';

import Input from '@/components/inputs/Input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

import {
  useGoogleSignInQuery,
  useSignIn,
} from '@/feature/auth/features/sign-in/components/form/hooks';
import { signInSchema } from '@/validator';

import { ERoles, TSignInCredentials } from '@/types';

const SignInForm = () => {
  const router = useRouter();
  const { mutateAsync: signIn, isPending, error } = useSignIn();
  const { mutateAsync, isPending: googleLoading } = useGoogleSignInQuery();
  const [loading, setLoading] = useState(false);
  const form = useForm<TSignInCredentials>({
    resolver: zodResolver(signInSchema),
  });
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const onSubmit = async (values: TSignInCredentials) => {
    const result = await signIn(values);
    const { token, refreshToken, user } = result;
    await setCookies('user', user);
    await setCookies('token', { token, refreshToken });
    const callBack = searchParams.get('callBack');
    if (callBack) {
      router.replace(callBack);
      return;
    }
    if (user.role.includes(ERoles.TEACHER)) {
      router.replace('/teacher');
      return;
    }
    router.replace(`/`);
  };

  const login = useGoogleLogin({
    onSuccess: (response) => {
      setLoading(false);
      mutateAsync(response.access_token);
    },
    onError: () => {
      setLoading(false);
      toast({ title: 'Something went wrong', variant: 'destructive' });
    },
  });

  const googleLogin = () => {
    setLoading(true);
    login();
  };

  useEffect(() => {
    if (error) {
      const errorMessage = error as unknown as TSignInCredentials;
      errorMessage.email &&
        form.setError('email', { message: errorMessage.email });
      errorMessage.password &&
        form.setError('password', { message: errorMessage.password });
    }
  }, [error, form]);

  return (
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
                  error={form.formState.errors.password}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='rememberMe'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>Remember me</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full text-center'
          isLoading={isPending}
          disabled={!form.formState.isDirty}
        >
          Sign in
        </Button>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='border-gray-200 border-opacity border-t w-full' />
          </div>
          <div className='leading-6 font-medium text-sm justify-center flex relative'>
            <span className='px-4 bg-background text-gray-400'>
              Or continue with
            </span>
          </div>
        </div>
        <Button
          type='button'
          variant='outline'
          className='w-full'
          onClick={googleLogin}
          isLoading={googleLoading || loading}
        >
          <div className='flex space-x-2 items-center w-full justify-center'>
            <img src='/images/google.svg' className='w-4 h-4' />{' '}
            <span>Sign in with google</span>
          </div>
        </Button>
        <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
          Don’t have an account yet?{' '}
          <Link
            href='/sign-up'
            className='font-medium text-primary-600 hover:underline dark:text-primary-500'
          >
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignInForm;
