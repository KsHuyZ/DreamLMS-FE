import React from 'react';

import { getCookies } from '@/lib/action';

import Layout from '@/app/(teacher)/teacher/layout';
import Footer from '@/layout/footer';
import Header from '@/layout/header';

import { TUser } from '@/types';

const LayoutUser = ({ children }: { children: React.ReactNode }) => {
  const user = getCookies('user') as TUser;

  return (
    <>
      <Header user={user} />
      <div className='min-h-screen'>
        <Layout>
          <div className='m-2 mt-24'>{children}</div>
        </Layout>
      </div>
      <Footer />
    </>
  );
};

export default LayoutUser;
