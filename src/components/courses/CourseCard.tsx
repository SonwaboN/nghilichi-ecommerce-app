import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Crown } from 'lucide-react';
import { Course } from '@/types/subscription';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link 
      to={`/private-clients/courses/${course.id}`}
      className="group block bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
    >
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="h-12 w-12 text-white" />
        </div>
        {course.level === 'premium' && (
          <div className="absolute top-2 right-2 bg-[#777A55] text-white px-2 py-1 rounded-full flex items-center text-sm">
            <Crown className="h-4 w-4 mr-1" />
            Premium
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-[#777A55] mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{course.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{course.duration}</span>
        </div>
      </div>
    </Link>
  );
};
