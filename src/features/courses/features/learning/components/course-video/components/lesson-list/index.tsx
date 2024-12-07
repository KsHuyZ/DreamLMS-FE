import { ethers } from 'ethers';
import { ChevronDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { memo, useCallback, useState } from 'react';

import { cn } from '@/lib/utils';

import { CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import { TUnitParent } from '@/features/courses/features/learning/components/course-video';
import LessonDropdown from '@/features/courses/features/learning/components/course-video/components/lesson-list/components/lesson-dropdown';

import { LessonProgress, TUnit } from '@/types';

interface IListLessonsProps {
  isLoading: boolean;
  lessons: LessonProgress[];
  selectLessons: string[];
  onSelectLessons: (id: string) => void;
  selectUnit?: TUnit;
  id: string;
  onSelectUnit: (unit: TUnitParent) => void;
  progress: number;
}

const ListLessons = ({
  isLoading,
  lessons,
  selectLessons,
  onSelectLessons,
  selectUnit,
  id,
  onSelectUnit,
  progress,
}: IListLessonsProps) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const [currentUnit, setCurrentUnit] = useState<string | undefined>(undefined);
  const [defaultAccount, setDefaultAccount] = useState<null | string>(null);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      replace(`${pathName}?${searchParams.toString()}`);
    },
    [searchParams, replace, pathName]
  );

  const accountChangedHandler = async (newAccount: ethers.JsonRpcSigner) => {
    const address = await newAccount.getAddress();
    setDefaultAccount(address);
  };

  // async function transferTokens(to: string, amount: number) {
  //   const provider = new ethers.BrowserProvider(window.ethereum);
  //   const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  // }

  const onConnect = async () => {
    if (!window.ethereum) {
      location.replace('https://metamask.io/download/');
    }
    await window.ethereum.enable();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    await provider.send('eth_requestAccounts', []);
    await accountChangedHandler(signer);
    if (currentUnit) {
      createQueryString('unitId', currentUnit);
    }
    setCurrentUnit(undefined);
  };

  return (
    <div className='flex col-span-2 h-full'>
      <Separator orientation='vertical' />
      <div className='flex flex-col space-y-8 w-full'>
        <CardHeader>
          <Label>Course Content</Label>
        </CardHeader>
        <CardContent className='p-2 space-y-2 overflow-scroll no-scrollbar'>
          <div className='flex flex-col space-y-4 w-full'>
            <Progress value={progress} className='h-2 w-full' />
          </div>
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className='shadow-md overflow-hidden'>
                  <div
                    className={cn(
                      'flex items-center gap-x-2 border-slate-200 border text-slate-700 p-4 text-sm mb-1 cursor-pointer',
                      ' text-primary-700'
                    )}
                  >
                    <span className='font-bold '>
                      <Skeleton className='w-40 h-4' />
                    </span>
                    <div className='ml-auto pr-2 flex items-center gap-x-2'>
                      <div className='flex flex-col space-y-2'></div>
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 cursor-pointer hover:opacity-75 transition'
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))
            : lessons.map((lesson) => (
                <LessonDropdown
                  key={lesson.id}
                  lesson={lesson}
                  selectLessons={selectLessons}
                  onSelectLessons={onSelectLessons}
                  unitId={selectUnit?.id}
                  onSelectUnit={onSelectUnit}
                />
              ))}
        </CardContent>
      </div>
    </div>
  );
};

export default memo(ListLessons);
