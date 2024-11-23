import { zodResolver } from '@hookform/resolvers/zod';
import { startOfDay } from 'date-fns';
import { Plus, Trash } from 'lucide-react';
import Image from 'next/image';
import React, { memo, useCallback, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import Input from '@/components/inputs/Input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { TimePickerDuration } from '@/components/ui/time-picker-duration';

import { useCreateQuiz } from '@/app/(teacher)/teacher/courses/_hooks';
import { initialQuestions, initialQuiz } from '@/constant';
import Answers from '@/features/teacher/features/courses/features/lessons/components/list-lesson/components/lesson-dropdown/components/form-quiz/components/answers';
import { quizGroupSchema } from '@/validator';

import { EQuizType, TQuizCredentials } from '@/types';

interface FormQuizProps {
  lessonId?: string;
  refetch: () => void;
}

const FormQuiz = ({ lessonId, refetch }: FormQuizProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<TQuizCredentials>({
    resolver: zodResolver(quizGroupSchema),
    defaultValues: initialQuiz,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'questions',
    rules: {
      required: true,
    },
  });
  const { mutateAsync: createQuiz, isPending } = useCreateQuiz();

  const onSubmit = useCallback(async () => {
    const values = form.getValues();
    const { questions, title, description, time: currentTime } = values;
    const now = new Date();
    const startOfToday = startOfDay(now);
    const timeRemain = Number(currentTime) - Number(startOfToday);
    const time = timeRemain / 60000;
    if (lessonId) {
      await createQuiz({ title, description, time, questions, lessonId });
      refetch();
      setOpen(false);
      form.reset();
    }
  }, [createQuiz, form, lessonId, refetch]);

  return (
    <>
      <Button leftIcon={Plus} variant='outline' onClick={() => setOpen(true)}>
        Quiz
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side='top' className='h-screen'>
          <SheetHeader>
            <Image
              src='/images/logo.svg'
              alt='logo'
              width={144}
              height={144}
              priority
            />
          </SheetHeader>
          <div className='mt-10'>
            <SheetTitle>Create Quiz</SheetTitle>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <Form {...form}>
              <form className='space-y-4'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          error={form.formState.errors.title}
                          placeholder='Eg: First test...'
                          className='rounded-md'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <MinimalTiptapEditor
                          {...field}
                          immediatelyRender={false}
                          className='w-full min-h-8'
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
                <FormField
                  control={form.control}
                  name='time'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time duration</FormLabel>
                      <FormControl>
                        <TimePickerDuration
                          date={field.value as unknown as Date}
                          setDate={(date) => {
                            form.setValue(
                              'time',
                              new Date(date as Date) as unknown as number
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>

              <div className='w-full flex flex-col space-y-6 h-[400px] overflow-y-scroll no-scrollbar'>
                {fields.map((question, index) => (
                  <Card key={question.id} className='w-full shadow-md'>
                    <CardHeader className='py-4'>
                      <CardTitle className='flex justify-between align-middle border-b border-gray-300'>
                        <span>Question {index + 1}</span>
                        <div className='flex space-x-2'>
                          <div
                            className='cursor-pointer p-2 hover:bg-gray-300 rounded transition'
                            onClick={() => remove(index)}
                          >
                            <Trash className='h-5 w-5 text-gray-500' />
                          </div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='grid w-full items-center gap-4'>
                        <div className='flex flex-col space-y-6'>
                          <div className='flex flex-col space-y-1.5'>
                            <FormField
                              control={form.control}
                              name={`questions.${index}.title`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Question</FormLabel>
                                  <FormControl>
                                    <Input
                                      id='title'
                                      placeholder="Eg: 'What is programming language console.log('Hello World')?"
                                      className='rounded-md'
                                      error={
                                        form.formState.errors.questions &&
                                        form.formState.errors.questions[index]
                                          ?.title
                                      }
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            name={`questions.${index}.type`}
                            control={form.control}
                            render={({ field }) => (
                              <RadioGroup
                                defaultValue={
                                  field.value ?? EQuizType.SingleChoice
                                }
                                className='flex space-x-2'
                                onValueChange={(value) => {
                                  form.setValue(
                                    `questions.${index}.type`,
                                    value as EQuizType
                                  );
                                }}
                                value={field.value}
                              >
                                <div className='flex items-center space-x-2'>
                                  <RadioGroupItem
                                    value={EQuizType.SingleChoice}
                                    id={EQuizType.SingleChoice}
                                  />
                                  <Label htmlFor={EQuizType.SingleChoice}>
                                    Single Choice
                                  </Label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                  <RadioGroupItem
                                    value={EQuizType.MultipleChoice}
                                    id={EQuizType.MultipleChoice}
                                  />
                                  <Label htmlFor={EQuizType.MultipleChoice}>
                                    Multiple Choice
                                  </Label>
                                </div>
                              </RadioGroup>
                            )}
                          />

                          <Answers
                            questionIndex={index}
                            control={form.control}
                            register={form.register}
                            errors={form.formState.errors}
                            watch={form.watch}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button
                  onClick={() => append(initialQuestions)}
                  leftIcon={Plus}
                  className='rounded-md'
                >
                  Add new question
                </Button>
              </div>
            </Form>
          </div>
          <SheetFooter>
            <Button
              type='submit'
              isLoading={isPending}
              onClick={onSubmit}
              className='rounded-md mt-3'
            >
              Submit
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default memo(FormQuiz);
