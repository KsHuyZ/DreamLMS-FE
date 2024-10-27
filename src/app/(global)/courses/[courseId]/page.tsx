import { Award, Clock, GraduationCap, Signal } from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import React from 'react';

import Input from '@/components/inputs/Input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Ratings } from '@/components/ui/rating';
import { Separator } from '@/components/ui/separator';

import { getCourseById } from '@/api';
import AddCart from '@/app/(global)/courses/[courseId]/_components/add-cart';
import CourseList from '@/app/(global)/courses/[courseId]/_components/course-list';
import Enroll from '@/app/(global)/courses/[courseId]/_components/enroll';
import ModalPreview from '@/app/(global)/courses/[courseId]/_components/modal-preview';
import PayMent from '@/app/(global)/courses/[courseId]/_components/payment';
import { formatPrice, generateNameColor } from '@/utils';

type Props = {
  params: {
    courseId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const course = await getCourseById(params.courseId);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: course.name,
    openGraph: {
      images: previousImages,
    },
  };
}

const CourseIdPage = async ({ params: { courseId } }: Props) => {
  const course = await getCourseById(courseId);

  return (
    <div className='w-full h-full'>
      <div className='flex flex-col space-y-8'>
        <div className='bg-primary-600 px-10 py-5 rounded-md'>
          <div className='grid grid-cols-3 gap-2 items-center'>
            <div className='col-span-2'>
              <div className='flex flex-col space-y-4'>
                <h3 className='text-white'>{course.name}</h3>
                <div className='flex items-center space-x-4'>
                  <Ratings rating={4.5} totalStars={5} variant='yellow' />
                  <span className='underline text-white'>(400 ratings)</span>
                  <span className='text-white'>3000 students</span>
                </div>
                <div>
                  <p className='text-white'>{course.shortDescription}</p>
                </div>
                <div className='flex items-center space-x-2'>
                  {course.tags.map((tag) => (
                    <Badge
                      key={tag.id}
                      className='text-white'
                      variant='outline'
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <ModalPreview img={course.image.url} name={course.name} />
          </div>
        </div>
        <div className='grid grid-cols-3 gap-2 items-start'>
          <div className='flex flex-col space-y-8 col-span-2'>
            <div className='flex flex-col space-y-4'>
              <h3>Course content</h3>
              <CourseList id={courseId} />
            </div>
            <div className='flex flex-col space-y-4'>
              <h3>Description</h3>
              <span
                dangerouslySetInnerHTML={{ __html: course.description }}
              ></span>
            </div>
          </div>

          <Card className='sticky top-0'>
            <CardHeader>
              <CardTitle>
                {course.price === 0 ? 'Free' : `${formatPrice(course.price)}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col space-y-12'>
                <div className='flex flex-col space-y-8'>
                  {course.price === 0 ? (
                    <Enroll id={course.id} />
                  ) : (
                    <div className='flex flex-col space-y-4'>
                      <AddCart id={course.id} />
                      <PayMent amount={course.price} />
                    </div>
                  )}
                  <div className='flex flex-col space-y-4'>
                    <Label>This course includes:</Label>
                    <div className='flex flex-col space-y-2 text-gray-500'>
                      <div className='flex items-center space-x-2'>
                        <Signal className='w-4 h-4' />
                        <span>Intermediate</span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <GraduationCap className='w-4 h-4' />
                        <span>10 Total Enrolled</span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Clock className='w-4 h-4' />
                        <span>12 hours Duration</span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Award className='w-4 h-4' />
                        <span>Certificate of completion</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col space-y-2'>
                    <Label>Coupon code</Label>
                    <div className='grid grid-cols-3 gap-2 items-center'>
                      <div className='flex flex-col col-span-2 space-y-2'>
                        <Input placeholder='Enter your coupon code' />
                      </div>
                      <Button>Apply</Button>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col space-y-4'>
                  <Separator />
                  <div className='flex flex-col space-y-4'>
                    <Label>Author</Label>
                    <Link
                      href='/user/123'
                      className='flex space-x-4 cursor-pointer'
                    >
                      <div
                        className='flex h-8 w-8 items-center justify-center rounded-full text-white'
                        style={{
                          background: generateNameColor('Huy Phan Tien'),
                        }}
                      >
                        H
                      </div>
                      <span>
                        {course.createdBy.firstName} {course.createdBy.lastName}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
