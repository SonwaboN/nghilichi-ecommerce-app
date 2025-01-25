import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, PlayCircle, Users, Calendar, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const PrivateClientsLanding: React.FC = () => {
  return (
    <div className="bg-[#EBEBDA]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#777A55] mb-6">
              Transform Your Spiritual Journey
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our exclusive private client program for personalized spiritual guidance,
              healing sessions, and premium content curated by experienced healers.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/private-clients/plans">
                <Button size="lg">
                  Get Started
                </Button>
              </Link>
              <Link to="/private-clients/login">
                <Button variant="secondary" size="lg">
                  Member Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#777A55] mb-4">
              Why Join Our Private Client Program?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the benefits of personalized spiritual guidance and healing
              through our comprehensive program.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <PlayCircle className="h-12 w-12 text-[#777A55] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#777A55] mb-2">
                Exclusive Content
              </h3>
              <p className="text-gray-600">
                Access premium spiritual healing courses and materials curated by experts.
              </p>
            </div>
            <div className="text-center p-6">
              <Calendar className="h-12 w-12 text-[#777A55] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#777A55] mb-2">
                Live Sessions
              </h3>
              <p className="text-gray-600">
                Participate in regular live healing sessions and Q&A with our healers.
              </p>
            </div>
            <div className="text-center p-6">
              <Users className="h-12 w-12 text-[#777A55] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#777A55] mb-2">
                Community Support
              </h3>
              <p className="text-gray-600">
                Connect with like-minded individuals on their spiritual journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Preview */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#777A55] mb-4">
              Choose Your Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the plan that best suits your spiritual needs and goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#777A55] mb-2">Basic Plan</h3>
                <div className="text-4xl font-bold text-[#777A55] mb-4">
                  R222
                  <span className="text-base font-normal text-gray-600">/month</span>
                </div>
                <Button className="w-full" size="lg">
                  Start Basic
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-[#777A55]">
              <div className="text-center">
                <Crown className="h-8 w-8 text-[#777A55] mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-[#777A55] mb-2">Premium Plan</h3>
                <div className="text-4xl font-bold text-[#777A55] mb-4">
                  R999
                  <span className="text-base font-normal text-gray-600">/month</span>
                </div>
                <Button className="w-full" size="lg">
                  Go Premium
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#777A55] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Begin Your Spiritual Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of spiritual seekers and start your transformation today.
          </p>
          <Link to="/private-clients/register">
            <Button size="lg" className="bg-white text-[#777A55] hover:bg-gray-100">
              Join Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
