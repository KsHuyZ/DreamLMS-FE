'use client';

import { getCookie, setCookie } from 'cookies-next';
import { LogIn, LogOutIcon, Settings } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { deleteCookie } from '@/lib/action';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import Cart from '@/app/(global)/components/navbar/components/cart';
import SettingTheme from '@/app/(global)/components/navbar/components/setting-theme';

import { ERoles, TUser } from '@/types';

const NavbarRoutes = ({ user }: { user?: TUser }) => {
  const [locale, setLocale] = useState(getCookie('NEXT_LOCALE') ?? 'en');
  const router = useRouter();
  const pathName = usePathname();
  const t = useTranslations('head');
  const handleSignOut = async () => {
    await deleteCookie('user');
    await deleteCookie('token');
  };

  const onChangeLanguage = (lang: string) => {
    setCookie('NEXT_LOCALE', lang);
    setLocale(lang);
    router.refresh();
  };

  return (
    <div className='ml-auto flex gap-x-2'>
      <div className='flex items-center space-x-4'>
        <Select value={locale} onValueChange={onChangeLanguage}>
          <SelectTrigger>
            <SelectValue placeholder='Select a language' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t('language')}</SelectLabel>
              <SelectItem value='vi'>
                <div className='flex items-center space-x-2'>
                  <Image
                    src='/images/vn.png'
                    width={20}
                    height={20}
                    alt='vie'
                  />
                  <span>{t('vietnam')}</span>
                </div>
              </SelectItem>
              <SelectItem value='en'>
                <div className='flex items-center space-x-2'>
                  <Image
                    src='/images/uk.png'
                    width={20}
                    height={20}
                    alt='vie'
                  />
                  <span>English</span>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {user?.role.includes(ERoles.STUDENT) && <Cart />}
        <SettingTheme />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className='w-12 h-12'>
                <Image
                  src={!user?.photo ? '/images/avatar.jpg' : user.photo}
                  width={50}
                  height={50}
                  alt='avatar'
                  className='rounded-full border p-1'
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className='flex flex-col space-y-2 px-2'>
                <Label className='font-bold leading-5'>
                  {cn(user.firstName, user.lastName)}
                </Label>
                <span className='text-sm'>{user.email}</span>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push(`/profile/${user.id}`)}
              >
                <div className='gap-x-2 flex items-center'>
                  <Settings size={15} />
                  <span>Setting</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleSignOut();
                  router.push(`/sign-in?callBack=${pathName}`);
                }}
              >
                <div className='gap-x-2 flex items-center text-red-600'>
                  <LogOutIcon size={15} />
                  <span>Log out</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant='outline' onClick={() => router.push('/sign-in')}>
            <div className='flex items-center space-x-2'>
              <LogIn />
              <span>Login</span>
            </div>
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavbarRoutes;
