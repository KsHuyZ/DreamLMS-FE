import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { zodResolver } from '@hookform/resolvers/zod';
import { startOfDay } from 'date-fns';
import { Plus, Trash } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import Input from '@/components/inputs/Input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { TimePickerDuration } from '@/components/ui/time-picker-duration';
import { useToast } from '@/components/ui/use-toast';

import Answers from '@/app/(global)/teacher/courses/__components/form-quiz/components/answers';
import { useCreateQuiz } from '@/app/(global)/teacher/courses/_hooks';
import { initialQuestions } from '@/constant';
import { formSchema, quizGroupSchema } from '@/validator';
interface FormQuizProps {
  lessonId?: string;
}

const CustomEditor = dynamic(
  () => {
    return import('@/components/inputs/CustomEditor');
  },
  { ssr: false }
);

const FormQuiz = ({ lessonId }: FormQuizProps) => {
  const [open, setOpen] = useState(false);
  const {
    control,
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { questions: initialQuestions },
    mode: 'onChange',
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
    rules: {
      required: true,
    },
  });
  const formQuestionGroup = useForm<z.infer<typeof quizGroupSchema>>({
    resolver: zodResolver(quizGroupSchema),
  });
  const { toast } = useToast();
  const { mutateAsync: createQuiz, isPending } = useCreateQuiz();

  const onSubmit = async () => {
    const isValid = await trigger();
    const isFormGroupValid = await formQuestionGroup.trigger();
    if (!isValid && !isFormGroupValid) {
      toast({
        variant: 'destructive',
        title: 'Please enter valid form value',
        description: 'You are enter wrong value',
      });
      return;
    }
    const { questions } = getValues();
    const quizValues = formQuestionGroup.getValues();
    const currentTime = quizValues.time;
    const now = new Date();
    const startOfToday = startOfDay(now);
    const timeRemain = Number(currentTime) - Number(startOfToday);
    const time = timeRemain / 60000;
    if (lessonId) {
      await createQuiz({ ...quizValues, time, questions, lessonId });
    }
  };

  const onEditorChange = (_: unknown, editor: ClassicEditor) => {
    formQuestionGroup.setValue('description', editor.getData());
  };

  return (
    <>
      <Button leftIcon={Plus} variant='outline' onClick={() => setOpen(true)}>
        Quiz
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className='min-w-[1000px]'
          onInteractOutside={(e) => {
            if (isPending) {
              e.preventDefault();
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>Create Quiz</DialogTitle>
          </DialogHeader>
          <div className='grid grid-cols-2 gap-3'>
            <Form {...formQuestionGroup}>
              <form className='space-y-8'>
                <FormField
                  control={formQuestionGroup.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          error={formQuestionGroup.formState.errors.title}
                          placeholder='Eg: First test...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formQuestionGroup.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <CustomEditor
                          value={field.value}
                          onChange={onEditorChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formQuestionGroup.control}
                  name='time'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time duration</FormLabel>
                      <FormControl>
                        <TimePickerDuration
                          date={field.value}
                          setDate={(date) => {
                            formQuestionGroup.setValue(
                              'time',
                              new Date(date as Date)
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formQuestionGroup.control}
                  name='isFinalExam'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className='space-y-1 leading-none'>
                        <FormLabel>Is Final Example?</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </form>
            </Form>

            <div className='w-full flex flex-col space-y-6 h-[400px] overflow-y-scroll no-scrollbar'>
              {fields.map((question, index) => (
                <Card key={question.id} className='w-full shadow-md'>
                  <CardHeader>
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
                    <form>
                      <div className='grid w-full items-center gap-4'>
                        <div className='flex flex-col space-y-6'>
                          <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor='content'>Question</Label>
                            <Input
                              id='content'
                              placeholder="Eg: 'What is programing language console.log('Hello World')?"
                              error={
                                errors.questions &&
                                errors.questions[index]?.content
                              }
                              {...register(`questions.${index}.content`)}
                            />
                            {errors.questions
                              ? errors.questions[index]?.content?.message && (
                                  <span className='text-red-500'>
                                    {errors.questions[index]?.content?.message}
                                  </span>
                                )
                              : null}
                          </div>
                          <Answers
                            questionIndex={index}
                            control={control}
                            register={register}
                            errors={errors}
                          />
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              ))}
              <Card className='p-2 shadow-md'>
                <div className='flex justify-center items-center'>
                  <div
                    className='flex space-x-2 hover:bg-gray-400 transition p-2 rounded cursor-pointer'
                    onClick={() => append(initialQuestions)}
                  >
                    <Plus /> <span>Add Question</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <DialogFooter>
            <Button type='submit' onClick={onSubmit} isLoading={isPending}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormQuiz;
