'use client';
import Image from 'next/image';
import React, { memo, useMemo } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import ModalDescription from '@/app/(global)/profile/[id]/_components/modal-description';
import ModalSocial from '@/app/(global)/profile/[id]/_components/modal-social';
import { Facebook, Instagram, X } from '@/icons';

import { TUser } from '@/types';

type Props = {
  user?: TUser;
  refetch: () => void;
};

const ProfileDescription: React.FC<Props> = ({ user, refetch }) => {
  const isEmpty = useMemo(() => {
    return (
      !user?.facebook &&
      !user?.github &&
      !user?.instagram &&
      !user?.x &&
      !user?.walletAddress
    );
  }, [
    user?.facebook,
    user?.github,
    user?.instagram,
    user?.walletAddress,
    user?.x,
  ]);

  return (
    <div className='grid grid-cols-6 gap-6 w-full'>
      <div className='col-span-2'>
        <Card className='shadow-md'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-lg'>Social</CardTitle>
              <ModalSocial refetch={refetch} />
            </div>
          </CardHeader>
          <CardContent>
            {isEmpty ? (
              <div className='flex flex-col space-y-4 items-center'>
                <Image
                  src='/images/empty.svg'
                  width={150}
                  height={150}
                  alt='empty'
                />
                <Label className='text-center'>
                  It's look like this user don't have social profile
                </Label>
              </div>
            ) : (
              <div className='flex flex-col space-y-2'>
                {user?.walletAddress && (
                  <div className='flex space-x-2'>
                    <Image
                      src='/images/metamask.png'
                      width={20}
                      height={20}
                      alt='metamask'
                    />
                    <p className='w-full truncate'>{user.walletAddress}</p>
                  </div>
                )}
                {user?.facebook && (
                  <a target='_blank' href='#'>
                    <div className='flex items-center space-x-2'>
                      <Facebook width={20} height={20} />
                      <p className=''>{user.facebook}</p>
                    </div>
                  </a>
                )}
                {user?.instagram && (
                  <a target='_blank' href='#'>
                    <div className='flex items-center space-x-2'>
                      <Instagram width={20} height={20} />
                      <p className=''>{user.instagram}</p>
                    </div>
                  </a>
                )}
                {user?.github && (
                  <a target='_blank' href='#'>
                    <div className='flex items-center space-x-2'>
                      <Image
                        src='/images/github.svg'
                        width={20}
                        height={20}
                        alt='github'
                      />
                      <p className=''>{user.github}</p>
                    </div>
                  </a>
                )}
                {user?.x && (
                  <a target='_blank' href='#'>
                    <div className='flex items-center space-x-2'>
                      <X width={20} height={20} />
                      <p className=''>{user.x}</p>
                    </div>
                  </a>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className='col-span-4'>
        <Card className='shadow-md'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-lg'>Description</CardTitle>
              <ModalDescription user={user} refetch={refetch} />
            </div>
          </CardHeader>
          <CardContent>
            {user?.description ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: user?.description,
                }}
              />
            ) : (
              <div className='flex flex-col space-y-4 items-center'>
                <Image
                  src='/images/empty.svg'
                  width={150}
                  height={150}
                  alt='empty'
                />
                <Label>
                  It's look like this user don't have social profile
                </Label>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default memo(ProfileDescription);
