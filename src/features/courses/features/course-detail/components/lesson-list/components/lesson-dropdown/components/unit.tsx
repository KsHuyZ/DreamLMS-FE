import { PlayCircle, StickyNote } from 'lucide-react';
import React, { memo } from 'react';

import { Badge } from '@/components/ui/badge';

import { formatTime } from '@/utils';

import { EUnitType, TUnit } from '@/types';

interface UnitProps {
  unit: TUnit;
}

const Unit = ({ unit }: UnitProps) => {
  return (
    <div className='duration-150'>
      <div className='flex items-center gap-x-2 border rounded-md text-sm mb-1 shadow-md'>
        <div className='cursor-pointer w-full'>
          <div className='flex items-center m-3 justify-between'>
            <div className='flex flex-col'>
              <div className='text-muted-foreground font-bold flex items-center space-x-4'>
                {unit.unit === EUnitType.VIDEO ? (
                  <PlayCircle size={15} />
                ) : (
                  <StickyNote size={15} />
                )}{' '}
                <span>{unit.title}</span>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              {unit.unit === EUnitType.VIDEO ? (
                <>
                  <Badge>{formatTime(unit.video?.duration ?? 0)}</Badge>
                  <button className='px-2.5 py-0.5 bg-tertiary-800 text-white text-xs rounded-md'>
                    Preview
                  </button>
                </>
              ) : (
                <Badge>
                  {unit.questions?.length} question
                  {Number(unit.questions?.length) > 1 ? 's' : ''}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Unit);
