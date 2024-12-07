import { Check, PlayCircle, StickyNote } from 'lucide-react';
import React, { memo } from 'react';

import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';

import { TUnitParent } from '@/features/courses/features/learning/components/course-video';
import { formatTime } from '@/utils';

import { EUnitType, TUnit } from '@/types';

interface UnitProps {
  unit: TUnitParent | TUnit;
  isLearning?: boolean;
  isFocus?: boolean;
  onSelectUnit?: (unit: TUnitParent) => void;
}

const Unit = ({ unit, isLearning, isFocus, onSelectUnit }: UnitProps) => {
  return (
    <div className='duration-150'>
      <div
        className={cn(
          'flex items-center gap-x-2 border rounded-md text-sm mb-1 shadow-md',
          isFocus ? 'bg-tertiary-800 text-white' : ''
        )}
      >
        <div
          className='cursor-pointer w-full'
          onClick={() => {
            onSelectUnit && onSelectUnit(unit as TUnitParent);
          }}
        >
          <div className='flex items-center m-3 justify-between'>
            <div className='flex flex-col'>
              <div className='text-muted-foreground font-bold flex items-center space-x-4'>
                {unit.unit === EUnitType.VIDEO ? (
                  <PlayCircle
                    size={15}
                    className={cn(isFocus && 'text-white')}
                  />
                ) : (
                  <StickyNote
                    size={15}
                    className={cn(isFocus && 'text-white')}
                  />
                )}{' '}
                <span className={cn(isFocus && 'text-white')}>
                  {unit.title}
                </span>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              {unit.unit === EUnitType.VIDEO ? (
                <>
                  <Badge>{formatTime(unit.video?.duration ?? 0)}</Badge>
                  {!isLearning && (
                    <button className='px-2.5 py-0.5 bg-tertiary-800 text-white text-xs rounded-md'>
                      Preview
                    </button>
                  )}
                </>
              ) : (
                <Badge>
                  {unit.questions?.length} question
                  {Number(unit.questions?.length) > 1 ? 's' : ''}
                </Badge>
              )}
              {unit.isCompleted && <Check className='text-green-600 w-3 h-3' />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Unit);
