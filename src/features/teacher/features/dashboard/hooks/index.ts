import { useQueries } from '@tanstack/react-query';

import { getTotalReceived } from '@/api';
import {
  getTeacherAnalyzingActiveCourse,
  getTeacherAnalyzingEnroll,
  getTeacherCompletedCourse,
  getTeacherTotalCourse,
} from '@/api/teacher';
import { QueryKey } from '@/constant';

export const useAnalyzingTeacher = () => {
  const queries = useQueries({
    queries: [
      {
        queryKey: [QueryKey.TeacherEnroll],
        queryFn: () => getTeacherAnalyzingEnroll(),
      },
      {
        queryKey: [QueryKey.TeacherActiveCourse],
        queryFn: () => getTeacherAnalyzingActiveCourse(),
      },
      {
        queryKey: [QueryKey.TeacherCompletedCourse],
        queryFn: () => getTeacherCompletedCourse(),
      },
      {
        queryKey: [QueryKey.TeacherTotalCourse],
        queryFn: () => getTeacherTotalCourse(),
      },
      {
        queryKey: [QueryKey.TotalReceived],
        queryFn: () => getTotalReceived(),
      },
    ],
  });
  const [enroll, activeCourses, completedCourses, totalCourses, totalReceived] =
    queries;
  return {
    enroll: enroll.data,
    activeCourses: activeCourses.data,
    completedCourses: completedCourses.data,
    totalCourses: totalCourses.data,
    totalReceived: totalReceived.data,
    isLoading:
      enroll.isLoading ||
      activeCourses.isLoading ||
      completedCourses.isLoading ||
      totalCourses.isLoading ||
      totalReceived.isLoading,
    isError:
      enroll.isError ||
      activeCourses.isError ||
      completedCourses.isError ||
      totalCourses.isError ||
      totalReceived.isError,
  };
};
