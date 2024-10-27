'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import { useMe } from '@/app/(global)/profile/[id]/_hooks';
import { userSchema, UserUpdateCredentials } from '@/validator';

import { TUser } from '@/types';

interface IProfileCardProps {
  user: TUser;
}

const ProfileCard = ({ user }: IProfileCardProps) => {
  const { data } = useMe();
  const [edit, setEdit] = useState(false);
  const form = useForm<UserUpdateCredentials>({
    resolver: zodResolver(userSchema),
  });
  return (
    <Card className='rounded-md p-0 overflow-hidden'>
      <CardContent className='p-0'>
        <div className='bg-[url(/images/cover-image.jpg)] w-full h-48'></div>
        <div className='w-full h-10 relative'>
          <div className='absolute bottom-5 left-5'>
            <div className='flex items-center space-x-4'>
              <Image
                src={user?.photo ?? '/images/avatar.jpg'}
                width={120}
                height={120}
                alt='avatar'
                className='rounded-full cursor-pointer'
              />
              <div className='flex flex-col text-background'>
                <Label className='text-lg font-bold'>
                  {user.firstName} {user.lastName}
                </Label>
                <span className='text-gray-100 text-sm font-thin'>
                  {user.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // edit ? (
  //   <Card className='rounded-md'>
  //     <CardTitle className='mx-2'>
  //       <div className='flex justify-between items-center'>
  //         <Label className='text-xl font-bold' onClick={() => setEdit(false)}>
  //           Edit Profile
  //         </Label>
  //         <Button variant='ghost'>
  //           <X />
  //         </Button>
  //       </div>
  //     </CardTitle>
  //     <CardContent className='mt-4 flex flex-col space-y-8'>
  //       <div className='flex items-center space-x-8'>
  //         <div className='flex items-center space-x-4'>
  //           {!user?.avatar ? (
  //             <div
  //               style={{
  //                 backgroundColor: generateNameColor(
  //                   cn(user?.firstName, user?.lastName)
  //                 ),
  //               }}
  //               className='w-40 h-40 rounded-full flex justify-center items-center'
  //             >
  //               <span className='text-white text-2xl'>
  //                 {user?.firstName.charAt(0)}
  //               </span>
  //             </div>
  //           ) : (
  //             <Image src={user.avatar} width={160} height={160} alt='avatar' />
  //           )}
  //           <Button leftIcon={Camera} variant='ghost'>
  //             Add Image
  //           </Button>
  //         </div>
  //       </div>
  //       <div className='flex flex-col space-y-4'>
  //         <Label>General</Label>
  //       </div>
  //     </CardContent>
  //   </Card>
  // ) : (
  //   <Card className='rounded-md'>
  //     <CardContent className='flex justify-between my-4'>
  //       <div className='flex items-center space-x-8'>
  //         {!user?.avatar ? (
  //           <div
  //             style={{
  //               backgroundColor: generateNameColor(
  //                 cn(user?.firstName, user?.lastName)
  //               ),
  //             }}
  //             className='w-40 h-40 rounded-full flex justify-center items-center'
  //           >
  //             <span className='text-white text-2xl'>
  //               {user?.firstName.charAt(0)}
  //             </span>
  //           </div>
  //         ) : (
  //           <Image src={user.avatar} width={160} height={160} alt='avatar' />
  //         )}
  //         <div className='flex flex-col space-y-4'>
  //           <div className='flex flex-col space-y-2'>
  //             <Label className='font-bold text-lg'>
  //               {!data
  //                 ? `${user?.firstName} ${user?.lastName}`
  //                 : `${data?.firstName} ${data?.lastName}`}
  //             </Label>
  //             <span className='italic text-base'>
  //               {data ? data.email : user?.email}
  //             </span>
  //           </div>
  //           <div className='flex flex-col space-y-2'>
  //             <span className='text-sm'>Role</span>
  //             <Label>{data ? data.roles[0] : user?.roles[0]}</Label>
  //           </div>
  //         </div>
  //       </div>
  //       <Button leftIcon={Settings} onClick={() => setEdit(true)}>
  //         Edit Profile
  //       </Button>
  //     </CardContent>
  //   </Card>
  // );
};

export default ProfileCard;
