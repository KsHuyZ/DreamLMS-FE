import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaCircleCheck } from 'react-icons/fa6';

import { getCookies } from '@/lib/action';
import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Ratings } from '@/components/ui/rating';
import { Separator } from '@/components/ui/separator';

import { getCourseByGuest, getReviewsByCourseId } from '@/api';
import AddCart from '@/app/(global)/courses/[courseId]/_components/add-cart';
import { Path } from '@/constant';
import Description from '@/features/courses/features/course-detail/components/description';
import Enroll from '@/features/courses/features/course-detail/components/enroll';
import LessonList from '@/features/courses/features/course-detail/components/lesson-list';
import ModalPreview from '@/features/courses/features/course-detail/components/modal-preview';
import PayMent from '@/features/courses/features/course-detail/components/payment';
import Related from '@/features/courses/features/course-detail/components/related';
import Reviews from '@/features/courses/features/course-detail/components/reviews';
import { formatPrice, formatTime, levelCourseMap } from '@/utils';

import { TUser } from '@/types';

type Props = {
  params: {
    courseId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

const CourseIdPage = async ({ params: { courseId } }: Props) => {
  const course = await getCourseByGuest(courseId);
  const duration = course.duration;
  const isEnrolled = course.isEnrolled;
  const reviewPagination = await getReviewsByCourseId(courseId);
  const user = getCookies('user') as TUser | undefined;
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
              <Description description={course.description} />
            </div>
          </div>

          <Card className='sticky top-0 border-primary-600 border-2 shadow-md'>
            <CardHeader>
              <CardTitle className='text-tertiary-800'>
                <div
                  className={cn(
                    'flex items-center',
                    course?.ethPrice ? 'justify-between' : 'justify-end'
                  )}
                >
                  <p>
                    {course.price === 0
                      ? 'Free'
                      : `${formatPrice(course.price)}`}
                  </p>
                  {course?.ethPrice && (
                    <div className='flex items-center'>
                      <Image
                        src='/images/solidity.png'
                        width={20}
                        height={20}
                        className='w-4 h-4'
                        alt='solidity'
                      />
                      <p>{course?.ethPrice}</p>
                    </div>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col space-y-12'>
                <div className='flex flex-col space-y-8'>
                  {user ? (
                    course.isEnrolled || course.alreadyCart ? (
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
                        <PayMent
                          userId={user?.id}
                          ethPrice={course.ethPrice}
                          courseId={course.id}
                          recipient={course.createdBy.walletAddress}
                        />
                      </div>
                    )
                  ) : (
                    <div className='flex flex-col space-y-4 items-center'>
                      <span className='text-center text-primary-600 font-bold'>
                        Please login first
                      </span>
                      <Link href={Path.SIGNIN}>
                        <Button>Login</Button>
                      </Link>
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
                </div>
                <div className='flex flex-col space-y-4'>
                  <Separator />
                  <div className='flex flex-col space-y-4'>
                    <Label>Author</Label>
                    <Link
                      href={`/profile/${course.createdBy.id}`}
                      className='flex items-center space-x-4 cursor-pointer'
                    >
                      <Image
                        src={
                          course.createdBy.photo?.url || '/images/avatar.jpg'
                        }
                        width={40}
                        height={40}
                        alt='Author img'
                        className='rounded-full'
                      />
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

        <Reviews
          reviewPagination={reviewPagination}
          courseId={courseId}
          isEnrolled={isEnrolled}
        />
        <Related courseId={courseId} />
      </div>
    </div>
  );
};

export default CourseIdPage;
