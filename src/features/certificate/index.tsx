'use server';
import { format } from 'date-fns';
import React from 'react';
import QRCode from 'react-qr-code';

import NextImage from '@/components/NextImage';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import { getCertificateByUserIdAndCourseId } from '@/api';

interface Props {
  params: {
    userId: string;
    courseId: string;
  };
}

const Certificate = async ({ params }: Props) => {
  const { userId, courseId } = params;
  const currentUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/certificate/${userId}/${courseId};`;
  const certificate = await getCertificateByUserIdAndCourseId(courseId, userId);

  console.log({ certificate });

  return (
    <section className='bg-[url(/images/banner.png)] w-full h-screen bg-cover bg-no-repeat bg-center'>
      <div className='flex w-full justify-center items-center h-full'>
        <Card>
          <CardContent className='space-y-4 w-[800px]'>
            <div className='flex justify-center items-center p-4'>
              <NextImage
                src='/images/logo.svg'
                width={150}
                height={150}
                alt='logo'
                layout='none'
              />
            </div>
            {!certificate ? (
              <h1 className='text-center'>We not found this certificate!</h1>
            ) : (
              <>
                <div className='text-center'>
                  <Label className='text-muted-foreground font-bold'>
                    COMPLETED CERTIFICATION
                  </Label>
                </div>
                <div className='w-full text-center'>
                  <h1 className='py-4 font-bold'>{certificate.course.name}</h1>
                </div>
                <div className='py-4 text-center'>
                  <Label className='text-muted-foreground font-bold text-lg'>
                    ISSUE TO
                  </Label>
                </div>
                <div className='text-center'>
                  <h5 className='font-bold'>
                    {certificate.user.firstName} {certificate.user.lastName}
                  </h5>
                </div>
                <div className='pt-10 py-2'>
                  <div className='flex justify-between items-end'>
                    <NextImage
                      src='/images/signature.png'
                      width={200}
                      height={200}
                      alt='signature'
                    />
                    <div className='flex flex-col items-end'>
                      <QRCode value={currentUrl} size={40} />
                      <span>
                        Issued: {format(certificate.timestamp, 'MMM dd yyyy')}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Certificate;
