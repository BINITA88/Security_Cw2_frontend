
import React, { useState, useEffect } from 'react';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Users,
  BookOpen,
  Sparkles,
  TrendingUp,
  Bell,
  Settings,
  ArrowRight,
} from 'lucide-react';

const Whyus = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="min-h-auto mt-9 bg-gradient-to-br from-teal-100 via-teal-50 to-cyan-100">
      {/* Status Notification */}
      <div
        className={`fixed top-4 right-4 z-50 transition-all duration-500 ${
          showNotification
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0'
        }`}
      >
        <div className="bg-teal-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">All systems operational</span>
        </div>
      </div>

    

      <section id="why-us" className="py-20 bg-white">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-teal-900 mb-4">
        Why Choose Our Platform?
      </h2>
      <p className="text-lg text-teal-700 max-w-3xl mx-auto">
        Designed with you in mind, our platform prioritizes ease of use, transparency, and meaningful engagement to elevate your reading and writing experience.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <div className="flex flex-col items-center text-center">
        <Users className="w-12 h-12 text-teal-600 mb-4" />
        <h3 className="text-xl font-semibold text-teal-900 mb-2">Intuitive Navigation</h3>
        <p className="text-teal-700 max-w-sm">
          Easily find what you need with clear menus, consistent layouts, and responsive design that adapts to your device.
        </p>
      </div>

      <div className="flex flex-col items-center text-center">
        <Bell className="w-12 h-12 text-teal-600 mb-4" />
        <h3 className="text-xl font-semibold text-teal-900 mb-2">Instant Feedback</h3>
        <p className="text-teal-700 max-w-sm">
          Receive real-time notifications and confirmations so you’re always aware of your interactions and updates.
        </p>
      </div>

      <div className="flex flex-col items-center text-center">
        <Settings className="w-12 h-12 text-teal-600 mb-4" />
        <h3 className="text-xl font-semibold text-teal-900 mb-2">Full Control</h3>
        <p className="text-teal-700 max-w-sm">
          Customize your experience with personal settings and privacy controls that put you in charge.
        </p>
      </div>
    </div>
  </div>
</section>


    </div>
  );
};

export default Whyus;
