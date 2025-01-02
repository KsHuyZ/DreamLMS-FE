'use client';
import { DollarSign } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { SetStateAction, useEffect, useMemo, useState } from 'react';

import { useDebounce } from '@/hooks';

import ImageUploader from '@/components/inputs/ImageUpload';
import Input from '@/components/inputs/Input';
import Spinner from '@/components/loading/spinner';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { useAuth } from '@/store/user.store';

import { levelOptions } from '@/constant';
import { useFormCourseContext } from '@/features/teacher/features/courses/components/tab-form';
import {
  useCategory,
  useTags,
} from '@/features/teacher/features/courses/hooks';

const CourseInfoTab = () => {
  const [inputTagValue, setInputTagValue] = useState('');
  const [inputCategoryValue, setInputCategoryValue] = useState('');
  const { user } = useAuth();
  const debouncedTag = useDebounce(inputTagValue);
  const debouncedCategory = useDebounce(inputCategoryValue);

  const { data: tags, isLoading: tagLoading } = useTags(debouncedTag);
  const { data: categories, isLoading: categoryLoading } =
    useCategory(debouncedCategory);

  const { id } = useParams();
  const { formInfo, isLoading, onSubmit, selectedCategories, selectedTags } =
    useFormCourseContext();

  const [isPay, setIsPay] = useState(false);
  const { watch } = formInfo;

  useEffect(() => {
    setIsPay(watch('price') > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('price')]);

  const tagsOptions = useMemo(
    () =>
      inputTagValue.length
        ? [
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
            ...(categories?.map((tag) => ({
              label: tag.name,
              value: tag.id,
            })) ?? []),
            ...selectedCategories,
          ]
        : selectedCategories,
    [inputCategoryValue, categories, selectedCategories]
  );
  const selectedTagIds = useMemo(
    () => selectedTags.map((tag) => tag.value),
    [selectedTags]
  );

  const selectedCategoryIds = useMemo(
    () => selectedCategories.map((category) => category.value),
    [selectedCategories]
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
                <Select
                  onValueChange={(value) => value && field.onChange(value)}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      {field.value ? (
                        <SelectValue placeholder='Select level' />
                      ) : (
                        'Select level'
                      )}
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {levelOptions.map((level) => (
                      <SelectItem key={level.id} value={level.id}>
                        {level.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    defaultValue={selectedTagIds}
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
                    defaultValue={selectedCategoryIds}
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
          <div className='grid grid-cols-2 gap-3 items-start'>
            <FormField
              control={formInfo.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='9$'
                      {...field}
                      onChange={(e) =>
                        formInfo.setValue('price', Number(e.target.value))
                      }
                      onKeyPress={(evt) => {
                        const charCode = evt.which ? evt.which : evt.keyCode;
                        if (charCode > 31 && (charCode < 48 || charCode > 57))
                          return false;
                        return true;
                      }}
                      className='rounded-md'
                      disabled={isLoading}
                      rightIcon={DollarSign}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formInfo.control}
              name='ethPrice'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ETH Price</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        placeholder='0.05ETH'
                        {...field}
                        className='rounded-md'
                        disabled={isLoading || !user?.walletAddress}
                      />
                      <Image
                        src='/images/metamask.png'
                        width={50}
                        height={50}
                        alt='metamask'
                        className='w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-3'
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    {!user?.walletAddress
                      ? 'Please update your wallet address'
                      : ''}
                  </FormDescription>
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
                <ImageUploader
                  onChange={(event) => {
                    const image = event.target.files
                      ? event.target.files[0]
                      : null;
                    if (!image) {
                      formInfo.resetField('image');
                    } else {
                      formInfo.setValue('image', image);
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
