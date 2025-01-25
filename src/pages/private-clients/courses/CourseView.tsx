import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Crown, BookOpen, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { courses } from '@/data/courses';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';

export const CourseView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-[#777A55]">Course not found</h2>
        <Button onClick={() => navigate('/private-clients/courses')} className="mt-4">
          Back to Courses
        </Button>
      </div>
    );
  }

  const canAccessCourse = user?.subscriptionLevel === 'premium' || course.level === 'basic';

  if (!canAccessCourse) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Crown className="h-16 w-16 text-[#777A55] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#777A55] mb-4">Premium Content</h2>
        <p className="text-gray-600 mb-8">
          This course is only available to premium members. Upgrade your subscription to access this content.
        </p>
        <Button onClick={() => navigate('/private-clients')} className="mt-4">
          Upgrade to Premium
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#EBEBDA] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-w-16 aspect-h-9">
            <ReactPlayer
              url={course.videoUrl}
              width="100%"
              height="100%"
              controls
              playing
              onError={() => toast.error('Error loading video')}
            />
          </div>
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-[#777A55] mb-2">{course.title}</h1>
                <p className="text-gray-600">{course.description}</p>
              </div>
              {course.level === 'premium' && (
                <span className="bg-[#777A55] text-white px-3 py-1 rounded-full flex items-center">
                  <Crown className="h-4 w-4 mr-1" />
                  Premium
                </span>
              )}
            </div>

            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-[#777A55]" />
                {course.duration}
              </div>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-[#777A55]" />
                Course Material
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
