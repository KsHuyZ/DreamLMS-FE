import React from 'react';

import Sidebar from '@/app/(global)/components/sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mt-[80px]'>
      <div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 mt-[70px]'>
        <Sidebar />
      </div>
      <div className='pl-56 min-h-[calc(100vh-70px)] h-screen'>{children}</div>
    </div>
  );
};

export default Layout;
