import React from 'react';
import { CourseCard } from '@/components/courses/CourseCard';
import { courses } from '@/data/courses';
import { useAuthStore } from '@/store/auth';

export const CourseList: React.FC = () => {
  const { user } = useAuthStore();
  const userLevel = user?.subscriptionLevel || 'basic';

  const filteredCourses = courses.filter(course => {
    if (userLevel === 'premium') return true;
    return course.level === 'basic';
  });

  return (
    <div className="bg-[#EBEBDA] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#777A55] mb-8">Spiritual Healing Courses</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};
