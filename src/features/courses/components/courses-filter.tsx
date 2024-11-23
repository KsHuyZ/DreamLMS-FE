import { Star } from 'lucide-react';
import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const CoursesFilter = () => {
  return (
    <div className='flex flex-col space-y-4'>
      <Accordion
        type='multiple'
        className='w-full'
        defaultValue={['rate', 'duration', 'level']}
      >
        <AccordionItem value='rate'>
          <AccordionTrigger className='text-tertiary-800'>
            Rate
          </AccordionTrigger>
          <AccordionContent>
            <div className='flex flex-col space-y-8'>
              <RadioGroup defaultValue='comfortable'>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='default' id='r1' />
                  <Label htmlFor='r1' className='cursor-pointer'>
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
                  <p className='text-muted-foreground'>4 & up (200)</p>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='comfortable' id='r2' />
                  <Label htmlFor='r2' className='cursor-pointer'>
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
                  <p className='text-muted-foreground'>3 & up (200)</p>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='comfortableê' id='r3' />
                  <Label htmlFor='r3' className='cursor-pointer'>
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
                  <p className='text-muted-foreground'>2 & up (200)</p>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='comfortableê44' id='r4' />
                  <Label htmlFor='r4' className='cursor-pointer'>
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
                  <p className='text-muted-foreground'>1 & up (200)</p>
                </div>
              </RadioGroup>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='duration'>
          <AccordionTrigger className='text-tertiary-800'>
            Duration
          </AccordionTrigger>
          <AccordionContent>
            <div className='flex flex-col space-y-4'>
              <div className='flex items-center space-x-2'>
                <Checkbox id='terms2' />
                <Label
                  htmlFor='terms2'
                  className='text-sm font-medium leading-none cursor-pointer'
                >
                  0-1 Hour{' '}
                  <span className='text-muted-foreground'>
                    ({new Intl.NumberFormat().format(2000)})
                  </span>
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='terms3' />
                <Label
                  htmlFor='terms3'
                  className='text-sm font-medium leading-none cursor-pointer'
                >
                  1-3 Hours{' '}
                  <span className='text-muted-foreground'>
                    ({new Intl.NumberFormat().format(2000)})
                  </span>
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='terms4' />
                <Label
                  htmlFor='terms4'
                  className='text-sm font-medium leading-none cursor-pointer'
                >
                  3-6 Hours{' '}
                  <span className='text-muted-foreground'>
                    ({new Intl.NumberFormat().format(2000)})
                  </span>
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='terms5' />
                <Label
                  htmlFor='terms5'
                  className='text-sm font-medium leading-none cursor-pointer'
                >
                  6-17 Hours{' '}
                  <span className='text-muted-foreground'>
                    ({new Intl.NumberFormat().format(2000)})
                  </span>
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='terms6' />
                <Label
                  htmlFor='terms6'
                  className='text-sm font-medium leading-none cursor-pointer'
                >
                  17 Hours{' '}
                  <span className='text-muted-foreground'>
                    ({new Intl.NumberFormat().format(200)})
                  </span>
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='level'>
          <AccordionTrigger className='text-tertiary-800'>
            Level
          </AccordionTrigger>
          <AccordionContent>
            <div className='flex flex-col space-y-4'>
              <div className='flex items-center space-x-2'>
                <Checkbox id='terms2' />
                <Label
                  htmlFor='terms2'
                  className='text-sm font-medium leading-none cursor-pointer'
                >
                  Paid{' '}
                  <span className='text-muted-foreground'>
                    ({new Intl.NumberFormat().format(2000)})
                  </span>
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='terms3' />
                <Label
                  htmlFor='terms3'
                  className='text-sm font-medium leading-none cursor-pointer'
                >
                  Free{' '}
                  <span className='text-muted-foreground'>
                    ({new Intl.NumberFormat().format(2000)})
                  </span>
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button>Clear</Button>
    </div>
  );
};

export default CoursesFilter;
