'use client';
import { ApexOptions } from 'apexcharts';
import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import { cn } from '@/lib/utils';

import { useDurationPaid } from '@/features/student/dashboard/components/spent-course-chart/hooks';

import { Duration } from '@/types';

const months = Array.from({ length: 31 }).map((_, index) => index + 1);

const weeks = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const days = [
  '12:00 AM',
  '1:00 AM',
  '2:00 AM',
  '3:00 AM',
  '4:00 AM',
  '5:00 AM',
  '6:00 AM',
  '7:00 AM',
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
  '10:00 PM',
  '11:00 PM',
];

interface SpentCourseChartState {
  series: {
    name: string;
    data: number[];
  }[];
}

const SpentCourseChart: React.FC = () => {
  const [state, setState] = useState<SpentCourseChartState>({
    series: [
      {
        name: 'Course Paid',
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  });

  const [duration, setDuration] = useState(Duration.Week);

  const { data } = useDurationPaid(duration);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      series: [{ name: 'Course Paid', data: data || [] }],
    }));
  }, [data]);

  const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#ff6575'],
    chart: {
      fontFamily: 'Nunito, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#ff6575',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'smooth',
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      colors: '#fff',
      strokeColors: ['#ff6575', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: 1,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories:
        duration === Duration.Day
          ? days
          : duration === Duration.Week
          ? weeks
          : months,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        style: {
          colors: '#000000',
        },
        formatter: function (value, index) {
          if ((index || 0) % 2 && duration === Duration.Month) {
            return '';
          }
          return value;
        },
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
    },
  };

  const durationTime = useMemo(() => {
    const now = new Date();
    if (duration === Duration.Day) {
      return `${format(now, 'dd-MM-yyyy')}`;
    }
    if (duration === Duration.Week) {
      return `${format(
        startOfWeek(now, { weekStartsOn: 1 }),
        'dd-MM-yyyy'
      )} - ${format(endOfWeek(now, { weekStartsOn: 1 }), 'dd-MM-yyyy')}`;
    }
    return `${format(startOfMonth(now), 'dd-MM-yyyy')} - ${format(
      endOfMonth(now),
      'dd-MM-yyyy'
    )}`;
  }, [duration]);

  return (
    <div className='border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4 rounded-md'>
      <div className='flex flex-wrap mt-4 items-start justify-between gap-3 sm:flex-nowrap'>
        <div className='flex w-full flex-wrap gap-3 sm:gap-5'>
          <div className='flex min-w-48'>
            <span className='mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary-600'>
              <span className='block h-2.5 w-full max-w-2.5 rounded-full bg-primary-600'></span>
            </span>
            <div className='w-full'>
              <p className='font-semibold text-primary-600'>Total Spending</p>
              <p className='text-sm font-medium'>{durationTime}</p>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-9 gap-9 bg-muted p-1 rounded-md'>
          <button
            className={cn(
              'rounded-md col-span-3 p-2',
              duration === Duration.Day ? 'bg-white shadow-md' : ''
            )}
            onClick={() => setDuration(Duration.Day)}
          >
            Day
          </button>
          <button
            className={cn(
              'rounded-md col-span-3 p-2',
              duration === Duration.Week ? 'bg-white shadow-md' : ''
            )}
            onClick={() => setDuration(Duration.Week)}
          >
            Week
          </button>
          <button
            className={cn(
              'rounded-md col-span-3 p-2',
              duration === Duration.Month ? 'bg-white shadow-md' : ''
            )}
            onClick={() => setDuration(Duration.Month)}
          >
            Month
          </button>
        </div>
      </div>

      <div>
        <div id='chartOne' className='-ml-5'>
          <ReactApexChart
            options={options}
            series={state.series}
            type='area'
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default SpentCourseChart;
