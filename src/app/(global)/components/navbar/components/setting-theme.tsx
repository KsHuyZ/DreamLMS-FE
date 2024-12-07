import { Maximize, Minimize, Moon, Settings, Sun } from 'lucide-react';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import { useThemeStore } from '@/hooks';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { presetColors } from '@/constant';

const SettingTheme = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { toggleTheme, theme: themeColor } = useThemeStore();
  const onSelectThemeColor = (color: string): void => {
    toggleTheme(color);
  };
  const toggleFullScreen = async (): Promise<void> => {
    const element = document.body;
    const isFullScreen = document.fullscreenElement;
    if (isFullScreen === null) {
      await element?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullScreen(false);
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <Settings className='animate-spin-slow cursor-pointer text-gray-500' />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className='border-b pb-6 border-dashed'>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <div className='flex flex-col space-y-8 items-center my-6'>
          <div className='flex flex-col space-y-4 w-full'>
            <Label>Mode</Label>
            <div className='flex items-center justify-between '>
              <div className='group p-8 px-14 border border-dashed rounded cursor-pointer hover:border-primary-600 hover:bg-primary-100 hover:text-primary-600 duration-300 border-primary-600 bg-primary-100 text-primary-600'>
                <Sun className='transition ease-in-out group-hover:-translate-y-1 group-hover:scale-110 duration-300 group-hover:text-primary-600' />
              </div>
              <div
                className={cn(
                  'group p-8 px-14 border border-dashed rounded cursor-pointer hover:border-primary-600 hover:bg-primary-100 duration-300'
                )}
              >
                <Moon className='transition ease-in-out group-hover:-translate-y-1 group-hover:scale-110 duration-300 group-hover:text-primary-600' />
              </div>
            </div>
          </div>
          <div className='flex flex-col space-y-4 w-full'>
            <Label>Theme</Label>
            <div className='grid grid-cols-3 gap-3'>
              {presetColors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => onSelectThemeColor(color.label)}
                  className={cn(
                    'cursor-pointer p-2 px-1 border rounded-sm flex justify-center items-center group hover: hover:scale-110 duration-300',
                    `hover:border-[${color.primary}]`,
                    themeColor === color.label
                      ? `border-[${color.primary}] bg-slate-100 `
                      : ''
                  )}
                >
                  <div
                    style={{ backgroundColor: color.primary }}
                    className={cn(
                      'w-4 h-4 m-2 rounded-full group-hover:scale-110 duration-300'
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button
          className='absolute mx-8 my-4 inset-x-0 bottom-0 outline-none'
          variant='outline'
          type='submit'
          onClick={toggleFullScreen}
        >
          <div className='flex space-x-2 items-center justify-center'>
            {!isFullScreen ? <Maximize /> : <Minimize />}
            <span>Full Screen</span>
          </div>
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default SettingTheme;
