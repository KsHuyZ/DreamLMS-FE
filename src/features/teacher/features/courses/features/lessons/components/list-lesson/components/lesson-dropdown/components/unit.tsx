import {
  EllipsisVertical,
  Grip,
  Pencil,
  PlayCircle,
  StickyNote,
  Trash,
} from 'lucide-react';
import React, {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useState,
} from 'react';

import { cn } from '@/lib/utils';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useDeleteUnit } from '@/features/teacher/features/courses/features/lessons/components/list-lesson/components/lesson-dropdown/hooks';
import { convertSeconds } from '@/utils';

import { EUnitType, TUnit } from '@/types';

interface UnitProps {
  index: number;
  unit: TUnit;
  setSelectEdit: Dispatch<SetStateAction<TUnit | undefined>>;
  refetch: () => void;
}

const Unit = ({ index, unit, setSelectEdit, refetch }: UnitProps) => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { mutateAsync, isPending } = useDeleteUnit();

  const onDelete = useCallback(
    async (id: string, unit: EUnitType) => {
      await mutateAsync({ id, unit });
      refetch();
    },
    [mutateAsync, refetch]
  );

  return (
    <div className='duration-150'>
      <AlertDialog open={openModal} onOpenChange={setOpenModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely delete this{' '}
              {unit.unit === EUnitType.VIDEO ? 'video' : 'quiz'}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              isLoading={isPending}
              onClick={() => onDelete(unit.id, unit.unit)}
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className='flex items-center gap-x-2 border rounded-md text-sm mb-1 shadow-md'>
        <div
          className={cn(
            'px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition',
            'border-r hover:bg-muted cursor-pointer'
          )}
        >
          <Grip className='h-5 w-5' />
        </div>
        <div className='cursor-pointer w-full'>
          <div className='flex items-center mx-3 justify-between'>
            <div className='flex flex-col'>
              <span className='text-muted-foreground font-bold'>
                {index + 1} {unit.title}
              </span>
              <div className='flex items-center text-xs'>
                {unit.unit === EUnitType.VIDEO ? (
                  <>
                    <PlayCircle size={15} />
                    <span className='ml-2'>
                      {convertSeconds(unit.video?.duration ?? 0)}
                    </span>
                  </>
                ) : (
                  <StickyNote size={15} />
                )}
              </div>
            </div>
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger onClick={() => setOpen(true)}>
                <EllipsisVertical className='w-5 h-5 cursor-pointer' />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Option</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className='flex items-center space-x-4 text-muted-foreground'
                    onClick={() => setSelectEdit(unit)}
                  >
                    <Pencil className='w-4 h-4 cursor-pointer hover:opacity-75 transition' />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className='flex items-center space-x-4 text-error'
                    onClick={() => setOpenModal(true)}
                  >
                    <Trash className='w-4 h-4 cursor-pointer hover:opacity-75 transition' />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Unit);
