import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Forgot Password',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
