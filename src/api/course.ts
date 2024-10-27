import api from '@/lib/api';

import {
  CourseCredentials,
  ECourseStatus,
  ICategory,
  Lesson,
  LessonCredentials,
  PaginationResponse,
  TCourse,
  TImage,
  TVideoCredentials,
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

export const getCourses = (
  sort: string | null,
  priceMin = 0,
  priceMax = 1000000000,
  keyword: string | null
): Promise<PaginationResponse<TCourse>> =>
  api.get('/course/get-all', {
    params: {
      sort,
      priceMin: 0,
      priceMax: 10000000000,
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

export const createLesson = (lesson: LessonCredentials): Promise<Lesson> =>
  api.post('/lesson/create', lesson);

export const updateLesson = (lesson: LessonCredentials): Promise<Lesson> =>
  api.put(`/lesson/update/${lesson.id}`, {
    title: lesson.title,
    content: lesson.content,
  });

export const getAllCourseCategories = (): Promise<ICategory[]> =>
  api.get('/course/categories/get-all');

export const getLessonByCourseId = (id: string): Promise<Lesson[]> =>
  api.get(`/lesson/get-lessons?id=${id}`);
export const getCourseById = (id?: string): Promise<TCourse> =>
  api.get(`/courses/${id}`);

export const deleteLessonById = (id: string) =>
  api.delete('/lesson/delete', {
    data: id,
  });

export const createVideo = (video: TVideoCredentials) => {
  const data = new FormData();
  data.append('title', video.title);
  data.append('file', video.file as Blob);
  data.append('idLesson', video.idLesson);
  data.append('description', video.description);

  return api.post('/video/create', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getMyCourse = (): Promise<TCourse[]> =>
  api.get('/course/get-by-user');

export const changeCourseStatus = (id: string, status: ECourseStatus) =>
  api.post(`/course/update-status-by-teacher?id=${id}&status=${status}`);
