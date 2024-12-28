import React from 'react';

import AvgCompleted from '@/features/student/dashboard/components/avg-completed';
import SpentCourseChart from '@/features/student/dashboard/components/spent-course-chart';

const StudentDashboard = () => {
  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-6 gap-6'>
        <SpentCourseChart />
        <AvgCompleted />
      </div>
    </div>
  );
};

export default StudentDashboard;
