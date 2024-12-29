import { Star } from 'lucide-react';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormItem } from '@/components/ui/form';
import { FormField } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { durationOptions, levelOptions, paymentOptions } from '@/constant';

import { TCourseFilter } from '@/types';

interface CoursesFilterProps {
  form: UseFormReturn<TCourseFilter, any, undefined>;
}

const CoursesFilter = ({ form }: CoursesFilterProps) => {
  return (
    <Form {...form}>
      <form className='flex flex-col space-y-4'>
        <Accordion
          type='multiple'
          className='w-full'
          defaultValue={['rate', 'duration', 'level', 'payment']}
        >
          <AccordionItem value='rate'>
            <AccordionTrigger className='text-tertiary-800'>
              Rate
            </AccordionTrigger>
            <AccordionContent>
              <div className='flex flex-col space-y-8'>
                <FormField
                  control={form.control}
                  name='rate'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='4' id='r4' />
                            <Label htmlFor='r4' className='cursor-pointer'>
                              <div className='flex items-center space-x-1'>
                                {Array.from({ length: 4 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className='text-yellow-300 w-4 h-4'
                                    fill='#fde047'
                                  />
                                ))}
                                <Star className='text-yellow-300 w-4 h-4' />
                              </div>
                            </Label>
                            <p className='text-muted-foreground'>4 & up</p>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='3' id='r3' />
                            <Label htmlFor='r3' className='cursor-pointer'>
                              <div className='flex items-center space-x-1'>
                                {Array.from({ length: 3 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className='text-yellow-300 w-4 h-4'
                                    fill='#fde047'
                                  />
                                ))}
                                <Star className='text-yellow-300 w-4 h-4' />
                                <Star className='text-yellow-300 w-4 h-4' />
                              </div>
                            </Label>
                            <p className='text-muted-foreground'>3 & up</p>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='2' id='r2' />
                            <Label htmlFor='r2' className='cursor-pointer'>
                              <div className='flex items-center space-x-1'>
                                {Array.from({ length: 2 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className='text-yellow-300 w-4 h-4'
                                    fill='#fde047'
                                  />
                                ))}
                                <Star className='text-yellow-300 w-4 h-4' />
                                <Star className='text-yellow-300 w-4 h-4' />
                                <Star className='text-yellow-300 w-4 h-4' />
                              </div>
                            </Label>
                            <p className='text-muted-foreground'>2 & up</p>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='1' id='r1' />
                            <Label htmlFor='r1' className='cursor-pointer'>
                              <div className='flex items-center space-x-1'>
                                {Array.from({ length: 1 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className='text-yellow-300 w-4 h-4'
                                    fill='#fde047'
                                  />
                                ))}
                                <Star className='text-yellow-300 w-4 h-4' />
                                <Star className='text-yellow-300 w-4 h-4' />
                                <Star className='text-yellow-300 w-4 h-4' />
                                <Star className='text-yellow-300 w-4 h-4' />
                              </div>
                            </Label>
                            <p className='text-muted-foreground'>1 & up</p>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='duration'>
            <AccordionTrigger className='text-tertiary-800'>
              Duration
            </AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name='rate'
                render={() => (
                  <FormItem>
                    <div className='flex flex-col space-y-4'>
                      {durationOptions.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name='duration'
                          render={({ field }) => {
                            return (
                              <FormItem key={option.id}>
                                <FormControl>
                                  <div className='flex items-center space-x-2'>
                                    <Checkbox
                                      id={`${option.id}`}
                                      checked={field.value?.includes(option.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              option.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== option.id
                                              )
                                            );
                                      }}
                                    />
                                    <Label
                                      htmlFor={`${option.id}`}
                                      className='text-sm font-medium leading-none cursor-pointer'
                                    >
                                      {option.value}
                                    </Label>
                                  </div>
                                </FormControl>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='payment'>
            <AccordionTrigger className='text-tertiary-800'>
              Payment
            </AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name='payment'
                render={() => (
                  <FormItem>
                    <div className='flex flex-col space-y-4'>
                      {paymentOptions.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name='payment'
                          render={({ field }) => {
                            return (
                              <FormItem key={option.id}>
                                <FormControl>
                                  <div className='flex items-center space-x-2'>
                                    <Checkbox
                                      id={option.id}
                                      checked={field.value?.includes(option.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              option.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== option.id
                                              )
                                            );
                                      }}
                                    />
                                    <Label
                                      htmlFor={option.id}
                                      className='text-sm font-medium leading-none cursor-pointer'
                                    >
                                      {option.value}
                                    </Label>
                                  </div>
                                </FormControl>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='level'>
            <AccordionTrigger className='text-tertiary-800'>
              Level
            </AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name='level'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='flex flex-col space-y-2'
                      >
                        {levelOptions.map((level) => (
                          <div
                            className='flex items-center space-x-2'
                            key={level.id}
                          >
                            <RadioGroupItem value={level.id} id={level.id} />
                            <Label
                              htmlFor={level.id}
                              className='text-sm font-medium leading-none cursor-pointer'
                            >
                              {level.value}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button type='button' onClick={() => form.reset()}>
          Clear
        </Button>
      </form>
    </Form>
  );
};

export default CoursesFilter;
