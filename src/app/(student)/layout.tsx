import React from 'react';

import { getCookies } from '@/lib/action';

import Footer from '@/layout/footer';
import Header from '@/layout/header';

import { TUser } from '@/types';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = getCookies('user') as TUser;

  return (
    <>
      <Header user={user} />
      <div className='min-h-screen'>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
