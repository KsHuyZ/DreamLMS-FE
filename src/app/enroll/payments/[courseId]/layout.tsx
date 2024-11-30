import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Payment',
};

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return children;
};

export default Layout;
