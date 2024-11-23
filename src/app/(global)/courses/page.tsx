import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import CoursesPage from '@/features/courses';

type Props = {
  searchParams: { name?: string };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  if (!searchParams.name) {
    redirect('/');
  }
  return {
    title: `Result for ${searchParams.name}`,
  };
}

export default CoursesPage;
