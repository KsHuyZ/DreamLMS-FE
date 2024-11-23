import { Plus, Trash } from 'lucide-react';
import React from 'react';
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';

import Input from '@/components/inputs/Input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { EQuizType, TQuestion, TQuizCredentials } from '@/types';

interface AnswerProps {
  questionIndex: number;
  control: Control<TQuizCredentials, unknown>;
  register: UseFormRegister<TQuizCredentials>;
  errors: FieldErrors<{
    questions: TQuestion[];
  }>;
  watch: UseFormWatch<TQuizCredentials>;
}

const Answers = ({
  questionIndex,
  control,
  register,
  errors,
  watch,
}: AnswerProps) => {
  const { fields, remove, append, update } = useFieldArray({
    control,
    name: `questions.${questionIndex}.answers`,
  });

  const questionType = watch(`questions.${questionIndex}.type`);

  const handleAddAnswer = () => {
    const additionalAnswer = {
      isCorrect: false,
      title: '',
    };
    append(additionalAnswer);
  };

  const handleChecked = (value: boolean, k: number) => {
    if (questionType === EQuizType.SingleChoice) {
      fields.forEach((_, index) => {
        update(index, { ...fields[index], isCorrect: false });
      });
      update(k, { ...fields[k], isCorrect: true });
    } else if (questionType === EQuizType.MultipleChoice) {
      update(k, { ...fields[k], isCorrect: value });
    }
  };

  return (
    <div className='flex flex-col space-y-1.5' key={Math.random()}>
      <Label htmlFor='name'>Answer</Label>
      <RadioGroup>
        {fields.map((answer, k) => (
          <div className='flex flex-col space-y-1.5' key={Math.random()}>
            <div className='flex items-center w-full space-x-2 space-y-2'>
              {questionType === EQuizType.MultipleChoice ? (
                <Checkbox
                  checked={answer.isCorrect}
                  onCheckedChange={(value: boolean) => handleChecked(value, k)}
                />
              ) : (
                <RadioGroupItem
                  onClick={() => handleChecked(true, k)}
                  checked={watch(
                    `questions.${questionIndex}.answers.${k}.isCorrect`
                  )}
                  value='true'
                />
              )}

              <Input
                id='name'
                placeholder='Eg: Javascript'
                className='w-full rounded-md'
                {...register(`questions.${questionIndex}.answers.${k}.title`, {
                  required: true,
                })}
              />
              <div
                className='cursor-pointer p-2 hover:bg-gray-300 rounded transition'
                onClick={() => remove(k)}
              >
                <Trash className='h-5 w-5 text-gray-500' />
              </div>
            </div>
            {errors.questions &&
              errors.questions[questionIndex] &&
              errors.questions[questionIndex]?.answers && (
                <span className='text-red-500'>
                  {
                    errors.questions[questionIndex]?.answers?.[k]?.title
                      ?.message
                  }
                </span>
              )}
          </div>
        ))}
      </RadioGroup>
      <div className='flex justify-center items-center'>
        <Button
          className='flex space-x-2 transition p-2 rounded cursor-pointer'
          onClick={handleAddAnswer}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
};

export default Answers;
