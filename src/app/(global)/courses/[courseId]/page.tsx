import { Metadata, ResolvingMetadata } from 'next';

import { getCourseById } from '@/api';
import CourseIdPage from '@/features/courses/features/course-detail';

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

export default CourseIdPage;
