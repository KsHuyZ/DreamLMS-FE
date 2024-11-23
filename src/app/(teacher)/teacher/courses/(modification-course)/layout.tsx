import { Metadata } from 'next';
import React from 'react';

import TabForm from '@/features/teacher/features/courses/components/tab-form';

export const metadata: Metadata = {
  title: 'Teacher Courses',
  description: 'Courses page',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='m-4'>
      <TabForm>{children}</TabForm>
    </div>
  );
};

export default Layout;
