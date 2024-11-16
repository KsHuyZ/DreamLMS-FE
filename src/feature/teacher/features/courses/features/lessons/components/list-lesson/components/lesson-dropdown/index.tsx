import { Draggable } from '@hello-pangea/dnd';
import { ChevronDown, EllipsisVertical, Grip, Pencil } from 'lucide-react';
import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { cn } from '@/lib/utils';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

import DeleteLesson from '@/feature/teacher/features/courses/features/lessons/components/list-lesson/components/delete-lesson';
import FormQuiz from '@/feature/teacher/features/courses/features/lessons/components/list-lesson/components/lesson-dropdown/components/form-quiz';
import FormVideo from '@/feature/teacher/features/courses/features/lessons/components/list-lesson/components/lesson-dropdown/components/form-video';
import Unit from '@/feature/teacher/features/courses/features/lessons/components/list-lesson/components/lesson-dropdown/components/unit';
import { useModificationLesson } from '@/feature/teacher/features/courses/hooks';

import { EUnitType, Lesson, TUnit } from '@/types';

interface LessonDropdownProps {
  lesson: Lesson;
  index: number;
  onSelectLesson: (lesson: Lesson) => void;
  currentLesson?: string;
  setCurrentLesson: Dispatch<SetStateAction<string | undefined>>;
  setSelectEdit: Dispatch<SetStateAction<TUnit | undefined>>;
  selectEdit?: TUnit;
  refetch: () => void;
}

const LessonDropdown = ({
  lesson,
  index,
  onSelectLesson,
  currentLesson,
  setCurrentLesson,
  setSelectEdit,
  selectEdit,
  refetch,
}: LessonDropdownProps) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: modificationLesson, isPending } = useModificationLesson(
    lesson.id
  );
  const { toast } = useToast();
  const units = useMemo(() => {
    const videos = lesson.videos.map((video) => ({
      ...video,
      unit: EUnitType.VIDEO,
    }));
    const quizzes = lesson.quizzes.map((quiz) => ({
      ...quiz,
      unit: EUnitType.QUIZ,
    }));
    return [...videos, ...quizzes].sort(
      (a, b) => Number(a.order) - Number(b.order)
    );
  }, [lesson.videos, lesson.quizzes]);

  const onApplicable = useCallback(
    async (value: boolean) => {
      await modificationLesson({ ...lesson, disabled: !value });
      refetch();
      toast({ title: 'Applicable lesson success', variant: 'success' });
    },
    [lesson, modificationLesson, refetch, toast]
  );

  return (
    <Draggable key={lesson.id} draggableId={lesson.id} index={index}>
      {(provided) => (
        <div className='mb-4 duration-150'>
          <div
            className='flex items-center gap-x-2 border rounded-md text-sm mb-1 shadow-md'
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div
              className={cn(
                'px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition',
                'border-r hover:bg-muted cursor-pointer'
              )}
              {...provided.dragHandleProps}
            >
              <Grip className='h-5 w-5' />
            </div>
            {lesson.name}
            <div className='ml-auto pr-2 flex items-center gap-x-2'>
              <div className='flex items-center space-x-2'>
                <Switch
                  checked={!lesson.disabled}
                  onCheckedChange={onApplicable}
                  disabled={isPending}
                />
              </div>
              <ChevronDown
                onClick={() =>
                  setCurrentLesson((prev) => {
                    if (prev) {
                      return undefined;
                    }
                    return lesson.id;
                  })
                }
                className={cn(
                  'w-4 h-4 cursor-pointer hover:opacity-75 transition text-primary-600 font-bold',
                  currentLesson === lesson.id ? 'rotate-180' : ''
                )}
              />

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
                      onClick={() => onSelectLesson(lesson)}
                    >
                      <Pencil className='w-4 h-4 cursor-pointer hover:opacity-75 transition' />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <DeleteLesson lesson={lesson} />
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className='flex flex-col align-middle justify-center mx-auto'>
            <div
              className={cn(
                'no-scrollbar duration-700',
                currentLesson === lesson.id
                  ? 'overflow-y-scroll max-h-[500px]'
                  : 'max-h-0 overflow-hidden'
              )}
            >
              {currentLesson === lesson.id ? (
                <div className='flex flex-col space-y-8'>
                  <div className='m-2'>
                    {units.map((unit, index) => (
                      <Unit
                        key={unit.id}
                        index={index}
                        unit={unit}
                        setSelectEdit={setSelectEdit}
                      />
                    ))}
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='grid grid-cols-2 gap-2'>
                      <FormVideo
                        lessonId={currentLesson}
                        unit={selectEdit}
                        setUnit={setSelectEdit}
                        refetch={refetch}
                      />
                      <FormQuiz lessonId={currentLesson} refetch={refetch} />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default memo(LessonDropdown);
