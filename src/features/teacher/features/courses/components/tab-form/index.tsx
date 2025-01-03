/* eslint-disable no-case-declarations */
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import { TeacherPath } from '@/constant';
import {
  useAddCourseAddition,
  useCourseInfo,
  useModificationCourse,
} from '@/features/teacher/features/courses/components/tab-form/hooks';
import { validateError } from '@/utils';
import {
  courseAdditionSchema,
  courseInfoSchema,
  CreateCourseForm,
} from '@/validator';

import Tabs from './components/tabs';

import { CourseAdditionForm, TCourse } from '@/types';

interface IOptions {
  label: string;
  value: string;
}

interface IFormContext {
  onSubmit: () => void;
  isLoading: boolean;
  formInfo: UseFormReturn<CreateCourseForm, unknown, undefined>;
  selectedTags: IOptions[];
  setSelectedTags: (tags: IOptions[]) => void;
  selectedCategories: IOptions[];
  setSelectedCategories: (categories: IOptions[]) => void;
  courseInfo?: TCourse;
  refetch: () => void;
  formAddition: UseFormReturn<CourseAdditionForm, unknown, undefined>;
  selectedCourse: TCourse[];
  setSelectedCourse: Dispatch<SetStateAction<TCourse[]>>;
  selectedCourseIds: string[];
}

const FormContext = createContext<IFormContext | undefined>(undefined);

const TabForm = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams<{ id: string }>();

  const pathName = usePathname();

  const { isPending: courseInfoLoading, mutateAsync: modificationCourse } =
    useModificationCourse(id);

  const { toast } = useToast();

  const router = useRouter();

  const formInfo = useForm<CreateCourseForm>({
    resolver: zodResolver(courseInfoSchema),
    mode: 'onChange',
  });

  const formAddition = useForm<CourseAdditionForm>({
    resolver: zodResolver(courseAdditionSchema),
  });

  const [selectedTags, setSelectedTags] = useState<IOptions[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<IOptions[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<TCourse[]>([]);

  const selectedCourseIds = useMemo(
    () => [...selectedCourse.map((course) => course.id), id as string],
    [id, selectedCourse]
  );

  console.log({ selectedTags });

  const {
    data: courseInfo,
    isLoading: infoQueryLoading,
    refetch,
  } = useCourseInfo(id, true);

  const { mutateAsync: addCourseAddition, isPending: courseAdditionLoading } =
    useAddCourseAddition(id as string);

  useEffect(() => {
    if (!courseInfo) return;
    const { tags, categories } = courseInfo;
    if (!tags) return;
    setSelectedTags(tags.map((tag) => ({ label: tag.name, value: tag.id })));
    if (!categories) return;
    setSelectedCategories(
      categories.map((category) => ({
        label: category.name,
        value: category.id,
      }))
    );
    if (courseInfo.related && courseInfo.related.length) {
      setSelectedCourse(courseInfo.related);
    }
  }, [courseInfo]);

  useEffect(() => {
    if (infoQueryLoading) return;
    switch (pathName) {
      case TeacherPath.UpdateInfoCourse(id):
        if (!courseInfo) return;
        const tags = courseInfo.tags.map((tag) => tag.id);
        const categories = courseInfo.categories.map((category) => category.id);
        formInfo.reset({ ...courseInfo, tags, categories });
    }
  }, [pathName, formInfo, id, infoQueryLoading, courseInfo]);

  const isLoading = useMemo(() => infoQueryLoading, [infoQueryLoading]);

  const onSubmitFormInfo = useCallback(
    async (values: CreateCourseForm) => {
      const validate = await formInfo.trigger();
      if (!validate) return;
      try {
        const result = await modificationCourse({ ...values, id });
        router.push(TeacherPath.UpdateLessonCourse(result.id));
        id && refetch();
        toast({
          title: `${id ? 'Update' : 'Create'} course success!`,
          variant: 'success',
        });
      } catch (error) {
        toast({ title: validateError(error), variant: 'destructive' });
      }
    },
    [formInfo, id, modificationCourse, router, toast, refetch]
  );

  const onSubmitAddition = useCallback(async () => {
    const values = formAddition.getValues();
    const result = await formAddition.trigger();
    const { video } = values;
    if (!result) return;
    await addCourseAddition({
      related: selectedCourseIds.filter((courseId) => courseId !== id),
      video,
    });
  }, [addCourseAddition, formAddition, id, selectedCourseIds]);

  const onSubmit = useCallback(() => {
    if (
      pathName === TeacherPath.UpdateInfoCourse(id) ||
      pathName === TeacherPath.CreateInfoCourse
    ) {
      const formValues = formInfo.getValues();
      return onSubmitFormInfo(formValues);
    }
    if (pathName === TeacherPath.UpdateAdditionCourse(id)) {
      return onSubmitAddition();
    }
  }, [formInfo, id, onSubmitFormInfo, pathName, onSubmitAddition]);

  const contextValues = useMemo(
    () => ({
      onSubmit,
      isLoading,
      formInfo,
      selectedCategories,
      selectedTags,
      setSelectedCategories,
      setSelectedTags,
      courseInfo,
      refetch,
      formAddition,
      selectedCourse,
      setSelectedCourse,
      selectedCourseIds,
    }),
    [
      onSubmit,
      isLoading,
      formInfo,
      selectedCategories,
      selectedTags,
      setSelectedCategories,
      setSelectedTags,
      courseInfo,
      refetch,
      formAddition,
      selectedCourse,
      setSelectedCourse,
      selectedCourseIds,
    ]
  );

  return (
    <FormContext.Provider value={contextValues}>
      <div className='flex flex-col space-y-4'>
        <div
          className={cn(
            'flex items-center',
            courseInfo ? 'justify-between' : 'justify-end'
          )}
        >
          {courseInfo && (
            <div className='flex items-center space-x-2'>
              <Image
                src={courseInfo?.image.url}
                width={100}
                height={100}
                className='object-cover rounded-md'
                alt='image'
              />
              <p className='text-lg font-bold text-tertiary-800'>
                {courseInfo?.name}
              </p>
            </div>
          )}
          <div className='flex space-x-2'>
            <Button
              isLoading={courseInfoLoading || courseAdditionLoading}
              disabled={
                // (!formInfo.formState.isDirty &&
                //   !formAddition.formState.isDirty) ||
                courseInfoLoading || courseAdditionLoading
              }
              onClick={onSubmit}
            >
              Save and update
            </Button>
          </div>
        </div>

        <Tabs />
        {children}
      </div>
    </FormContext.Provider>
  );
};

export const useFormCourseContext = (): IFormContext => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormCourse must be used within an FormCoursesProvider');
  }
  return context;
};

export default TabForm;
