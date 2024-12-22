import { PaymentIntent } from '@stripe/stripe-js';

import api from '@/lib/api';

import {
  CourseCredentials,
  ECourseDuration,
  ECourseRate,
  ECourseSort,
  ECourseStatus,
  ELevel,
  EPayType,
  ICategory,
  Lesson,
  PaginationResponse,
  TAdditionCoursePayload,
  TCourse,
  TCourseProgress,
  TCourseQuery,
  TImage,
} from '@/types';

export const createCourses = (course: CourseCredentials): Promise<TCourse> => {
  const {
    name,
    categories,
    description,
    tags,
    image,
    level,
    price,
    shortDescription,
  } = course;
  const data = new FormData();
  data.append('name', name);
  data.append('categories', JSON.stringify(categories));
  data.append('description', description);
  data.append('tags', JSON.stringify(tags));
  data.append('image', image as File);
  data.append('level', level);
  data.append('price', price ? price.toString() : '0');
  data.append('shortDescription', shortDescription);

  return api.post('/courses', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateCourses = (course: CourseCredentials): Promise<TCourse> => {
  const {
    name,
    categories,
    description,
    tags,
    image,
    level,
    price,
    shortDescription,
    id,
  } = course;
  const data = new FormData();
  const file = (image as TImage).url ? JSON.stringify(image) : (image as File);
  data.append('name', name);
  data.append('categories', JSON.stringify(categories));
  data.append('description', description);
  data.append('tags', JSON.stringify(tags));
  data.append('image', file);
  data.append('level', level);
  data.append('price', price ? price.toString() : '0');
  data.append('shortDescription', shortDescription);

  return api.patch(`/courses/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const removeCourse = async (id: string): Promise<void> => {
  await api.delete(`/courses/${id}`);
};

export const changeStatus = async (id: string, status: ECourseStatus) => {
  await api.put(`/courses/${id}`, { status });
};

export const addAdditionData = async (
  id: string,
  payload: TAdditionCoursePayload
) => {
  const { related, video } = payload;
  const data = new FormData();
  data.append('related', JSON.stringify(related));
  data.append('video', video);
  await api.put(`/courses/addition/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getAdditionCourse = (
  ids: string[],
  name: string
): Promise<TCourse[]> => api.post(`/courses/except-ids`, { ids, name });

export const getCourses = (
  sort = ECourseSort.Newest,
  rate: ECourseRate,
  duration: ECourseDuration[],
  payType: EPayType[],
  level: ELevel,
  page = 0,
  name = ''
): Promise<PaginationResponse<TCourseQuery>> =>
  api.get('/courses', {
    params: {
      sort,
      page,
      filters: {
        rate,
        duration,
        payType,
        name,
        level,
      },
    },
  });

export const getTeacherCourses = ({
  status,
  name,
}: {
  status?: string;
  name?: string;
}): Promise<PaginationResponse<TCourse>> =>
  api.get(`/courses/teacher`, {
    params: {
      name,
      status,
    },
  });

export const getCoursesLesson = (id: string): Promise<Lesson[]> =>
  api.get(`/lesson/get-lessons?id=${id}`);

export const getAllCourseCategories = (): Promise<ICategory[]> =>
  api.get('/course/categories/get-all');

export const getCourseById = (id?: string): Promise<TCourse> =>
  api.get(`/courses/${id}`);

export const getCourseLearn = (id?: string): Promise<TCourseProgress> =>
  api.get(`/courses/learn/${id}`);

export const getCourseByGuest = (id?: string): Promise<TCourseQuery> =>
  api.get(`/courses/guest/${id}`);

export const deleteLessonById = (id: string) =>
  api.delete('/lesson/delete', {
    data: id,
  });

export const enrollCourse = (id: string) => api.get(`courses/enroll/${id}`);

export const payCourse = (id: string): Promise<PaymentIntent> =>
  api.get(`courses/payment/${id}`);
