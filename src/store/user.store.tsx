'use client';
import { createContext, useContext } from 'react';

import { useMe } from '@/app/(global)/profile/[id]/_hooks';

import { TUser } from '@/types';

type AuthContextProps = {
  user?: TUser;
  refetch: () => void;
};

const AuthContext = createContext<AuthContextProps | null>(null);

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a <Auth />');
  }

  return context;
}

interface Props {
  children: React.ReactNode;
  userJSON?: TUser;
}

const AuthProvider: React.FC<Props> = ({ children, userJSON }) => {
  const { data: user, refetch } = useMe(!!userJSON);
  return (
    <AuthContext.Provider value={{ user, refetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
