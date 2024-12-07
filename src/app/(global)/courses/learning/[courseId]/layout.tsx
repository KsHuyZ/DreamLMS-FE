import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <div className='mt-24'>{children}</div>;
};

export default Layout;
