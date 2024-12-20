import { ShoppingCart } from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { FaCircleCheck } from 'react-icons/fa6';

import Input from '@/components/inputs/Input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Ratings } from '@/components/ui/rating';
import { Separator } from '@/components/ui/separator';

import { getCourseByGuest, getCourseById } from '@/api';
import AddCart from '@/app/(global)/courses/[courseId]/_components/add-cart';
import { Path } from '@/constant';
import Enroll from '@/features/courses/features/course-detail/components/enroll';
import LessonList from '@/features/courses/features/course-detail/components/lesson-list';
import ModalPreview from '@/features/courses/features/course-detail/components/modal-preview';
import PayMent from '@/features/courses/features/course-detail/components/payment';
import {
  formatPrice,
  formatTime,
  generateNameColor,
  levelCourseMap,
} from '@/utils';

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
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: course.name,
    openGraph: {
      images: [course.image.url],
    },
  };
}

const CourseIdPage = async ({ params: { courseId } }: Props) => {
  const course = await getCourseByGuest(courseId);
  const duration = course.duration;
  return (
    <div className='w-full h-full space-y-14 min-h-[calc(100vh-80px)]'>
      <div className='flex flex-col space-y-8'>
        <section className='bg-[url(/images/banner.png)] w-full py-20 pt-40 rounded-md'>
          <div className='grid grid-cols-3 gap-2 items-center px-5 xl:px-0 xl:container'>
            <div className='col-span-2'>
              <div className='flex flex-col space-y-4'>
                <h3 className='text-tertiary-800 font-bold text-3xl'>
                  {course.name}
                </h3>
                <div className='flex items-center space-x-4'>
                  <Ratings rating={4.5} totalStars={5} variant='yellow' />
                  <span className='text-tertiary-600'>(400 ratings)</span>
                </div>
                <span className='text-tertiary-600'>3000 students</span>
                <div>
                  <p className='text-tertiary-800'>{course.shortDescription}</p>
                </div>
                <div className='flex items-center space-x-2'>
                  {course.tags.map((tag) => (
                    <Badge key={tag.id} variant='secondary'>
                      {tag.name}
                    </Badge>
                  ))}
                </div>
                <div>
                  <Button
                    variant='secondary'
                    className='bg-white/50 text-tertiary-800 border-white border'
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
            <ModalPreview
              img={course.image.url}
              name={course.name}
              videoId={course.courseVideo?.video.id ?? ''}
            />
          </div>
        </section>
        <div className='grid grid-cols-3 gap-2 items-start px-5 xl:px-0 xl:container'>
          <div className='flex flex-col space-y-8 col-span-2 p-4'>
            <div className='flex flex-col space-y-4'>
              <h3>Course content</h3>
              <LessonList id={courseId} />
            </div>
            <div className='flex flex-col space-y-4'>
              <h3>Description</h3>
              <span
                dangerouslySetInnerHTML={{ __html: course.description }}
              ></span>
            </div>
          </div>

          <Card className='sticky top-0 border-primary-600 border-2 shadow-md'>
            <CardHeader>
              <CardTitle className='text-tertiary-800'>
                <div className='flex justify-end'>
                  {course.price === 0 ? 'Free' : `${formatPrice(course.price)}`}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col space-y-12'>
                <div className='flex flex-col space-y-8'>
                  {course.isEnrolled || course.alreadyCart ? (
                    course.isEnrolled ? (
                      <div className='flex flex-col space-y-4 items-center'>
                        <div className='flex items-center justify-center'>
                          <div className='absolute w-3 h-3 rounded-full bg-primary-600 opacity-50 animate-ripple z-10'></div>
                          <FaCircleCheck className='w-5 h-5 text-primary-600 z-30 rounded-full bg-white' />
                        </div>

                        <span className='text-center text-primary-600 font-bold'>
                          Course already enrolled
                        </span>
                        <Link href={Path.Learning(course.id)}>
                          <Button>Continue learning</Button>
                        </Link>
                      </div>
                    ) : (
                      <div className='flex flex-col space-y-4 items-center'>
                        <div className='flex items-center justify-center'>
                          <ShoppingCart className='w-5 h-5 text-primary-600 z-30' />
                        </div>

                        <span className='text-center text-primary-600 font-bold'>
                          Course already in cart
                        </span>
                      </div>
                    )
                  ) : course.price === 0 ? (
                    <Enroll id={course.id} />
                  ) : (
                    <div className='flex flex-col space-y-4'>
                      <AddCart id={course.id} />
                      <PayMent courseId={course.id} />
                    </div>
                  )}
                  <Separator />
                  <div className='flex flex-col space-y-4'>
                    <div className='flex flex-col space-y-2 text-gray-500'>
                      <div className='flex items-center justify-between'>
                        <Label className='text-black font-bold text-md'>
                          Level
                        </Label>
                        <Badge>{levelCourseMap.get(course.level)}</Badge>
                      </div>
                      <div className='flex items-center justify-between'>
                        <Label className='text-black font-bold text-md'>
                          Enrolled
                        </Label>
                        <Badge>10</Badge>
                      </div>
                      <div className='flex items-center justify-between'>
                        <Label className='text-black font-bold text-md'>
                          Duration
                        </Label>
                        <Badge>{formatTime(duration)}</Badge>
                      </div>
                    </div>
                  </div>
                  {!course.isEnrolled ||
                    (!course.alreadyCart && (
                      <>
                        <Separator />
                        <div className='flex flex-col space-y-2'>
                          <Label>Coupon code</Label>
                          <div className='grid grid-cols-3 gap-2 items-center'>
                            <div className='flex flex-col col-span-2 space-y-2'>
                              <Input placeholder='Enter your coupon code' />
                            </div>
                            <Button>Apply</Button>
                          </div>
                        </div>
                      </>
                    ))}
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
                          background: generateNameColor(
                            `${course.createdBy.firstName} ${course.createdBy.lastName}`
                          ),
                        }}
                      >
                        {course.createdBy.firstName.charAt(0)}
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
