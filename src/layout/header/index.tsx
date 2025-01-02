'use client';
import { LogOutIcon, Menu, Search, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { deleteCookie } from '@/lib/action';
import { cn } from '@/lib/utils';
import { useDebounce, useHeader } from '@/hooks';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';

import Cart from '@/app/(global)/components/navbar/components/cart';
import { useGetPreviewCourse } from '@/layout/header/hooks';

import { ERoles, TUser } from '@/types';

const headerRoutes = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About Us',
    href: '/about-us',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
];

const summaryName = (name: string) =>
  name
    .split(' ')
    .map((word) => word[0])
    .join('');

interface HeaderProps {
  user?: TUser;
}

const Header = ({ user }: HeaderProps) => {
  const { scroll } = useHeader();
  const router = useRouter();
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get('name') ?? '');
  const [focus, setFocus] = useState(false);
  const debounceValue = useDebounce(value);

  const { data: courses, isLoading } = useGetPreviewCourse(debounceValue);

  useEffect(() => {
    const searchName = searchParams.get('name') ?? '';
    setValue(searchName);
  }, [searchParams]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const signOut = async () => {
    ('use  server');
    await deleteCookie('user');
    await deleteCookie('token');
    router.replace('/sign-in');
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/courses?name=${value}`);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side='left'>
          <SheetHeader>
            <SheetTitle>
              <Image
                src='/images/logo.svg'
                alt='logo'
                width={144}
                height={144}
                priority
              />
            </SheetTitle>
          </SheetHeader>
          <div className='grid grid-cols-1 gap-1 mt-10'>
            {headerRoutes.map((route) => (
              <p
                key={route.href}
                onClick={() => {
                  setOpen(false);
                  router.push(route.href);
                }}
                className={cn(
                  'text-center hover:text-primary-800 font-semibold text-tertiary-800 duration-150 text-lg p-2 rounded-md cursor-pointer',
                  pathName === route.href ? 'text-primary-600' : ''
                )}
              >
                {route.label}
              </p>
            ))}
          </div>
          <Separator className='my-4' />
          <div className='flex flex-col space-y-4'>
            <Button
              onClick={() => {
                setOpen(false);
                router.push('/sign-in');
              }}
            >
              Login
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                router.push('/sign-up');
              }}
              variant='outline'
            >
              Register
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <div className='relative w-full flex justify-center z-10'>
        <div
          className={cn(
            'h-20 w-full flex items-center',
            scroll || pathName !== '/'
              ? 'fixed bg-white shadow-md backdrop-blur-sm bg-white/90'
              : 'absolute'
          )}
        >
          <div className='grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-1 px-5 lg:px-0 items-center w-full'>
            <Menu
              className='text-primary-600 lg:hidden cursor-pointer'
              onClick={() => setOpen(true)}
            />
            <div className='lg:container flex items-center justify-center lg:justify-between w-full'>
              <div className='flex items-center space-x-8'>
                <Link href='/'>
                  <Image
                    src='/images/logo.svg'
                    alt='logo'
                    width={150}
                    height={150}
                    priority
                  />
                </Link>
              </div>
              <div className='flex items-center space-x-4'>
                {pathName !== '/' && (
                  <form
                    className={cn(
                      'relative duration-500',
                      focus || value ? 'w-[500px]' : 'w-12'
                    )}
                    onFocus={() => setFocus(true)}
                    onSubmit={onSubmit}
                  >
                    <Search className='text-primary-600 w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3' />
                    <input
                      placeholder='Search School, Online educational centers, etc...'
                      className={cn(
                        'bg-gray-50 p-3 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full transition-colors pl-10 rounded-full',
                        focus || value ? '' : 'cursor-pointer'
                      )}
                      onChange={onChange}
                      value={value}
                      onFocus={() => setFocus(true)}
                      onBlur={() => setTimeout(() => setFocus(false), 500)}
                    />
                    {focus && value && (
                      <div className='absolute translate-y-4 duration-150 w-[500px] no-scrollbar left-0 max-h-[300px] overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800'>
                        <div className='py-2'>
                          <div className='px-4 py-2'>
                            <div className='flex  flex-col space-y-2'>
                              {isLoading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                  <div
                                    className='space-y-4 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700'
                                    key={index}
                                  >
                                    <div className='flex space-x-2 items-center'>
                                      <Skeleton className='w-32 h-14' />
                                      <div>
                                        <Skeleton className='w-12 h-4' />
                                        <Skeleton className='w-10 h-2' />
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : !courses || courses?.length === 0 ? (
                                <Link
                                  className='flex p-2 rounded-md space-x-2 items-center hover:bg-gray-100 dark:hover:bg-gray-700'
                                  href={`/courses?name=${debounceValue}`}
                                >
                                  <Search /> <p>{debounceValue}</p>
                                </Link>
                              ) : (
                                courses?.map((course) => (
                                  <Link
                                    className='p-2 rounded-md space-y-4 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    href={`/courses/${course.id}`}
                                    key={course.id}
                                  >
                                    <div className='flex space-x-2 items-center px-2 cursor-pointer'>
                                      <Image
                                        src={course.image.url}
                                        alt='course'
                                        width={100}
                                        height={100}
                                        className='rounded-md'
                                      />
                                      <div>
                                        <p className='font-medium text-lg line-clamp-1 w-full'>
                                          {course.name}
                                        </p>
                                        <p className='text-sm text-muted-foreground truncate'>
                                          {course.createdBy.firstName}{' '}
                                          {course.createdBy.lastName}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                ))
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </form>
                )}
                {user && user.role === ERoles.STUDENT && <Cart />}
                {user ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Avatar className='cursor-pointer'>
                          <AvatarImage
                            src={user.photo?.url ?? '/images/avatar.jpg'}
                          />
                          <AvatarFallback>
                            {summaryName(`${user.firstName} ${user.lastName}`)}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>
                          <div className='flex flex-col'>
                            <Label className='text-md'>
                              {user.firstName} {user.lastName}
                            </Label>
                            <span className='text-gray-400'>{user.email}</span>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => router.push(`/profile/${user.id}`)}
                        >
                          <div className='gap-x-2 flex items-center'>
                            <User size={15} />
                            <span>Profile</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={signOut}>
                          <div className='gap-x-2 flex items-center text-red-400'>
                            <LogOutIcon size={15} />
                            <span>Logout</span>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <div className='hidden lg:grid grid-cols-2 items-center gap-2'>
                    <Button onClick={() => router.push('/sign-in')}>
                      Login
                    </Button>
                    <Button
                      variant='outline'
                      onClick={() => router.push('/sign-up')}
                    >
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
