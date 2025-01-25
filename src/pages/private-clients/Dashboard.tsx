import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Calendar, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Dashboard: React.FC = () => {
  return (
    <div className="bg-[#EBEBDA] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-[#777A55] mb-4">Welcome back, [Name]</h1>
          <p className="text-gray-600">Your next live session starts in 2 days.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <PlayCircle className="h-8 w-8 text-[#777A55] mb-4" />
            <h3 className="font-semibold text-[#777A55] mb-2">Latest Courses</h3>
            <p className="text-gray-600 text-sm mb-4">Access your spiritual healing courses</p>
            <Link to="/private-clients/courses">
              <Button variant="secondary" size="sm">View Courses</Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Calendar className="h-8 w-8 text-[#777A55] mb-4" />
            <h3 className="font-semibold text-[#777A55] mb-2">Live Sessions</h3>
            <p className="text-gray-600 text-sm mb-4">Join upcoming healing sessions</p>
            <Link to="/private-clients/live-sessions">
              <Button variant="secondary" size="sm">View Schedule</Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Users className="h-8 w-8 text-[#777A55] mb-4" />
            <h3 className="font-semibold text-[#777A55] mb-2">Community</h3>
            <p className="text-gray-600 text-sm mb-4">Connect with fellow members</p>
            <Link to="/private-clients/community">
              <Button variant="secondary" size="sm">Join Discussion</Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <BookOpen className="h-8 w-8 text-[#777A55] mb-4" />
            <h3 className="font-semibold text-[#777A55] mb-2">Resources</h3>
            <p className="text-gray-600 text-sm mb-4">Access healing materials</p>
            <Link to="/private-clients/resources">
              <Button variant="secondary" size="sm">View Resources</Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#777A55] mb-4">Upcoming Live Sessions</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-[#777A55]">Monthly Healing Circle</h3>
                <p className="text-sm text-gray-600">March 25, 2024 - 18:00</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-[#777A55]">Spiritual Guidance Q&A</h3>
                <p className="text-sm text-gray-600">March 28, 2024 - 19:00</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#777A55] mb-4">Recent Courses</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-[#777A55]">Introduction to Spiritual Healing</h3>
                <p className="text-sm text-gray-600">Progress: 60%</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-[#777A55]">Advanced Meditation Techniques</h3>
                <p className="text-sm text-gray-600">Progress: 30%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
