import React from 'react';

import Sidebar from '@/app/(global)/components/sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mt-[100px]'>
      <div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 mt-[80px]'>
        <Sidebar />
      </div>
      <div className='pl-56 h-full'>{children}</div>
    </div>
  );
};

export default Layout;
