'use client';
import { LogOutIcon, Menu, Search, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { deleteCookie } from '@/lib/action';
import { cn } from '@/lib/utils';
import { useHeader } from '@/hooks';

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
import { useToast } from '@/components/ui/use-toast';

import { TUser } from '@/types';

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
  const { toast } = useToast();
  const [value, setValue] = useState(searchParams.get('name') ?? '');
  const [focus, setFocus] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const disabled = value.length <= 3;
    !disabled && router.push(`/courses/?name=${value}`);
  };

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
                    onSubmit={onSubmit}
                    onFocus={() => setFocus(true)}
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
                      onBlur={() => setFocus(false)}
                    />
                  </form>
                )}
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar className='cursor-pointer'>
                        <AvatarImage src={user.photo ?? '/images/avatar.jpg'} />
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
                        onClick={() =>
                          toast({
                            title: 'This function is not available',
                            variant: 'default',
                          })
                        }
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
