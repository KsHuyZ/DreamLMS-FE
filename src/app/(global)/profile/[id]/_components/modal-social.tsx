import { Pen } from 'lucide-react';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import Input from '@/components/inputs/Input';
import { Button } from '@/components/ui/button';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useSocial } from '@/app/(global)/profile/[id]/_hooks';

const socialDefaultValues = {
  type: 'facebook',
  value: '',
};

interface Props {
  refetch: () => void;
}

const ModalSocial: React.FC<Props> = ({ refetch }) => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      social: [socialDefaultValues],
    },
  });
  const { control } = form;
  const { fields, append } = useFieldArray({
    control,
    name: 'social',
  });

  const { mutateAsync: updateSocial, isPending } = useSocial();

  const onSubmit = async () => {
    const values = form.getValues();
    const result = values.social.reduce((acc: any, curr) => {
      if (!Object.keys(acc).length) return acc;
      acc[curr.type] = curr.value;
      return acc;
    }, {} as {
      x?: string;
      facebook?: string;
      instagram?: string;
    });
    await updateSocial(result);
    refetch();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div
        className='p-2 rounded-full hover:bg-gray-300 cursor-pointer'
        onClick={() => setOpen(true)}
      >
        <Pen className='text-muted-foreground' size={15} />
      </div>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Update social</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          {fields.map((field, index) => (
            <div
              className='grid-cols-6 grid gap-6 w-full items-end'
              key={field.id}
            >
              <FormField
                control={control}
                name={`social.${index}.value`}
                render={({ field }) => (
                  <FormItem className='col-span-4'>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='User name'
                        className='rounded-md'
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`social.${index}.type`}
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel />
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select social profile' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Social</SelectLabel>
                            <SelectItem value='facebook'>Facebook</SelectItem>
                            <SelectItem value='x'>X</SelectItem>
                            <SelectItem value='instagram'>Instagram</SelectItem>
                            <SelectItem value='github'>Github</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <Button
            type='button'
            variant='outline'
            className='rounded-md'
            onClick={() => append(socialDefaultValues)}
          >
            Add social
          </Button>
        </Form>
        <DialogFooter>
          <Button
            className='rounded-md'
            onClick={onSubmit}
            isLoading={isPending}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSocial;
