'use client';
import React from 'react';

import ProfileCard from '@/app/(global)/profile/[id]/_components/profile-card';
import ProfileDescription from '@/app/(global)/profile/[id]/_components/profile-description';
import { useMe } from '@/app/(global)/profile/[id]/_hooks';

const Profile = () => {
  const { data: user, isLoading, refetch } = useMe();
  return (
    <div className='flex flex-col space-y-8  mx-4'>
      <ProfileCard user={user} refetch={refetch} />
      <ProfileDescription user={user} refetch={refetch} />
    </div>
  );
};

export default Profile;
