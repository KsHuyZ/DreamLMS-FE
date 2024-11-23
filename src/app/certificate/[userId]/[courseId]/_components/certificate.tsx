'use client';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';
import React from 'react';

// import { useCourseInfo } from '@/app/(teacher)/teacher/courses/(modification-course)/edit/info/[id]/hooks';
import { useCertificate } from '@/app/certificate/[userId]/[courseId]/_hooks';
import Loading from '@/app/loading';

const Certificate = ({ fullName }: { fullName: string }) => {
  const { userId, courseId } = useParams<{
    courseId: string;
    userId: string;
  }>();
  const {
    loading,
    error,
    data: certificate,
  } = useCertificate(userId, courseId);
  // const { data, isLoading } = useCourseInfo(courseId);
  const isLoading = false;
  return isLoading || loading ? (
    <Loading />
  ) : (
    <div className='p-3'>
      <div className='relative w-2/3 h-3/4 bg-primary-600 p-8 mx-auto text-gray-800 font-sans shadow-lg'>
        <div className='absolute inset-0 border-2 border-white w-[794px] h-[594px] m-auto'></div>
        <div className='absolute inset-0 border-2 border-white w-[730px] h-[530px] m-auto'></div>
        <div className='relative w-[720px] h-[520px] p-0 border border-gray-200 bg-white mx-auto'>
          <div className='w-[650px] h-[200px] relative top-[70px] mx-auto'>
            <div className='text-center mt-10'>
              <h2 className='cursive text-4xl'>
                Eduwise Certificate of Completion
              </h2>
            </div>
            <div className='text-center mt-6'>
              <span className='cursive block text-lg'>
                This certificate is proudly presented to
              </span>
            </div>
            <div className='text-center mt-6'>
              <span className='font-bold text-4xl'>{fullName}</span>
            </div>
            <div className='text-center mt-6'>
              <span className='cursive block text-lg'>
                has completed course
              </span>
            </div>
            <div className='text-center mt-8'>
              <div className='w-2/3 mx-auto underline'>
                <span className='font-bold text-lg'>
                  {
                    // data?.name
                  }
                </span>
              </div>
            </div>
            <div className='text-center mt-6'>
              <span className='cursive block text-lg'>Final Result</span>
              <span className='font-bold block text-base'>
                {certificate?.completedPoint}
              </span>
            </div>
          </div>
          <div className='w-[650px] h-[100px] mx-auto absolute bottom-0 left-1/2 transform -translate-x-1/2'>
            <div className='flex justify-end'>
              <div className='flex flex-col items-end'>
                <span className='block text-base'>Date Completed</span>
                <span className='pm-empty-space block underline'></span>
                <span className='font-bold block'>
                  {certificate?.timestamp &&
                    format(certificate.timestamp, 'dd/MM/yyyy')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
