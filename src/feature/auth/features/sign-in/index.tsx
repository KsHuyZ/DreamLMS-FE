import React from 'react';

import SignInForm from './components/form';

const SignIn = () => {
  return (
    <div className='p-6 pt-0 space-y-4 md:space-y-6 sm:p-8'>
      <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
        Sign in to your account
      </h1>
      <SignInForm />
    </div>
  );
};

export default SignIn;
