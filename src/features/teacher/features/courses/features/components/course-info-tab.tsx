'use client';
import { useParams } from 'next/navigation';
import React, { SetStateAction, useMemo, useState } from 'react';

import { useDebounce } from '@/hooks';

import Input from '@/components/inputs/Input';
import Spinner from '@/components/loading/spinner';
import { Checkbox } from '@/components/ui/checkbox';
import Dropzone from '@/components/ui/drop-zone';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import MinimalTiptapEditor from '@/components/ui/minimal-tiptap';
import { MultiSelect } from '@/components/ui/multi-select';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { levelOptions } from '@/constant';
import { useFormCourseContext } from '@/features/teacher/features/courses/components/tab-form';
import {
  useCategory,
  useTags,
} from '@/features/teacher/features/courses/hooks';

const CourseInfoTab = () => {
  const [inputTagValue, setInputTagValue] = useState('');
  const [inputCategoryValue, setInputCategoryValue] = useState('');
  const debouncedTag = useDebounce(inputTagValue);
  const debouncedCategory = useDebounce(inputCategoryValue);
  const { data: tags, isLoading: tagLoading } = useTags(debouncedTag);
  const { data: categories, isLoading: categoryLoading } =
    useCategory(debouncedCategory);
  const { id } = useParams();
  const { formInfo, isLoading, onSubmit, selectedCategories, selectedTags } =
    useFormCourseContext();
  const [isPay, setIsPay] = useState(formInfo.getValues('price') > 0);
  const tagsOptions = useMemo(
    () =>
      inputTagValue.length
        ? [
            {
              label: inputTagValue,
              value: inputTagValue,
            },
            ...(tags?.map((tag) => ({
              label: tag.name,
              value: tag.id,
            })) ?? []),
            ...selectedTags,
          ]
        : selectedTags,
    [inputTagValue, tags, selectedTags]
  );

  const categoriesOptions = useMemo(
    () =>
      inputCategoryValue.length
        ? [
            {
              label: inputCategoryValue,
              value: inputCategoryValue,
            },
            ...(categories?.map((tag) => ({
              label: tag.name,
              value: tag.id,
            })) ?? []),
            ...selectedCategories,
          ]
        : selectedCategories,
    [inputCategoryValue, categories, selectedCategories]
  );

  return !!id && isLoading ? (
    <div className='w-full h-full flex justify-center items-center'>
      <Spinner />
    </div>
  ) : (
    <Form {...formInfo}>
      <form
        className='py-3 space-y-4'
        onSubmit={formInfo.handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-1 space-y-2 gap-1 lg:grid-cols-2 lg:gap-3 lg:space-y-0'>
          <FormField
            control={formInfo.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Course Title <span className='text-red-600'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. 'Advanced web development"
                    disabled={isLoading}
                    className='rounded-md'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formInfo.control}
            name='level'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Level <span className='text-red-600'>*</span>
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select level' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Level</SelectLabel>
                        {levelOptions.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.value}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='grid grid-cols-1 space-y-2 gap-1 lg:grid-cols-2 lg:gap-3 lg:space-y-0'>
          <FormField
            control={formInfo.control}
            name='tags'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tags <span className='text-red-600'>*</span>
                </FormLabel>
                <FormControl>
                  <MultiSelect
                    {...field}
                    options={tagsOptions}
                    onTextValueChange={(value: SetStateAction<string>) =>
                      setInputTagValue(value)
                    }
                    defaultValue={selectedTags.map((tag) => tag.value)}
                    onValueChange={(value) => formInfo.setValue('tags', value)}
                    placeholder='Eg: React, Nextjs,...'
                    isLoading={tagLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formInfo.control}
            name='categories'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Categories <span className='text-red-600'>*</span>
                </FormLabel>
                <FormControl>
                  <MultiSelect
                    {...field}
                    options={categoriesOptions}
                    defaultValue={selectedCategories.map(
                      (category) => category.value
                    )}
                    onTextValueChange={(value: React.SetStateAction<string>) =>
                      setInputCategoryValue(value)
                    }
                    onValueChange={(value) =>
                      formInfo.setValue('categories', value)
                    }
                    placeholder='Eg: Frontend, Backend,...'
                    isLoading={categoryLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col space-y-4'>
          <Label>
            Course price <span className='text-red-600'>*</span>
          </Label>
          <div className='flex space-x-3'>
            <div className='flex space-x-3'>
              <Checkbox
                id='free'
                checked={!isPay}
                onClick={() => {
                  setIsPay(!isPay);
                  formInfo.setValue('price', 0);
                }}
              />
              <Label>Free</Label>
            </div>
            <div className='flex space-x-3'>
              <Checkbox
                id='paid'
                checked={isPay}
                onClick={() => setIsPay(!isPay)}
              />
              <Label>Paid</Label>
            </div>
          </div>
        </div>
        {isPay ? (
          <div className='grid grid-cols-2 gap-3'>
            <FormField
              control={formInfo.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Price <span className='text-red-600'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='9đ'
                      type='number'
                      {...field}
                      onChange={(e) =>
                        formInfo.setValue('price', Number(e.target.value))
                      }
                      className='rounded-md'
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ) : (
          <></>
        )}

        <FormField
          control={formInfo.control}
          name='shortDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Short description'
                  {...field}
                  disabled={isLoading}
                  maxLength={1000}
                />
              </FormControl>
              <div className='text-end w-full'>
                <span className='text-muted-foreground'>
                  {field.value?.length ?? 0}/1000
                </span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='w-full'>
          <FormField
            control={formInfo.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  About course <span className='text-red-600'>*</span>
                </FormLabel>
                <FormControl>
                  <MinimalTiptapEditor
                    {...field}
                    immediatelyRender={false}
                    className='w-full'
                    editorContentClassName='p-5'
                    output='html'
                    placeholder='Type your description here...'
                    autofocus={true}
                    editable={true}
                    editorClassName='focus:outline-none'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={formInfo.control}
          name='image'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>
                Image <span className='text-red-600'>*</span>
              </FormLabel>
              <FormControl>
                <Dropzone
                  showFilesList
                  isSingleFile
                  onFileChange={(images) => {
                    if (!images || !images?.length) {
                      formInfo.resetField('image');
                    } else {
                      formInfo.setValue('image', images[0]);
                    }
                  }}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CourseInfoTab;
