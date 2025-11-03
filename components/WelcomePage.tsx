
import React, { useState } from 'react';
import { BriefcaseIcon, LightBulbIcon, SparklesIcon, QuoteIcon } from './icons/FeatureIcons';

interface WelcomePageProps {
  onSelectNeedDesigner: () => void;
  onSelectAmDesigner: () => void;
  onSelectDiscoverDesigners: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover-lift animate-slide-up">
    {icon}
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{children}</p>
  </div>
);

const TestimonialCard: React.FC<{ name: string; role: string; content: string; image: string }> = ({ name, role, content, image }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover-lift animate-scale-in">
    <QuoteIcon />
    <div className="flex items-center mb-4 mt-2">
      <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex items-center justify-center text-gray-500 font-semibold">
        {name.charAt(0)}
      </div>
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
    <p className="text-gray-600 italic">"{content}"</p>
  </div>
);

const WelcomePage: React.FC<WelcomePageProps> = ({ onSelectNeedDesigner, onSelectAmDesigner, onSelectDiscoverDesigners }) => {
  const [activeTab, setActiveTab] = useState<'customer' | 'designer'>('customer');

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in">
            Your Vision, <span className="text-[#00b67f]">Tailored.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Transform your fashion ideas into reality with AI-powered design briefs and connect with talented designers who bring your perfect garment to life.
          </p>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="bg-gray-100 p-1 rounded-full flex">
              <button
                onClick={() => setActiveTab('customer')}
                className={`py-2 px-6 rounded-full font-medium transition-all duration-300 ${activeTab === 'customer' ? 'bg-white text-black shadow-md tab-indicator active' : 'text-gray-600'}`}
              >
                I Need a Designer
              </button>
              <button
                onClick={() => setActiveTab('designer')}
                className={`py-2 px-6 rounded-full font-medium transition-all duration-300 ${activeTab === 'designer' ? 'bg-white text-black shadow-md tab-indicator active' : 'text-gray-600'}`}
              >
                I Am a Designer
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="overflow-hidden">
              <div className={`transition-all duration-500 ${activeTab === 'customer' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 absolute'}`}>
                {activeTab === 'customer' && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Find Your Perfect Designer</h3>
                    <p className="text-lg text-gray-600 mb-6">Upload inspiration images, get AI-generated design briefs, and connect with designers who understand your vision.</p>
                    <button
                      onClick={onSelectNeedDesigner}
                      className="bg-[#00b67f] text-white font-semibold py-4 px-10 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00b67f] animate-pulse-slow"
                    >
                      Start Your Design Journey
                    </button>
                  </div>
                )}
              </div>
              <div className={`transition-all duration-500 ${activeTab === 'designer' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 absolute'}`}>
                {activeTab === 'designer' && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Showcase Your Talent</h3>
                    <p className="text-lg text-gray-600 mb-6">Connect with clients looking for your unique style, receive detailed design briefs, and grow your fashion business.</p>
                    <button
                      onClick={onSelectAmDesigner}
                      className="bg-black text-white font-semibold py-4 px-10 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black animate-pulse-slow"
                    >
                      Create Your Designer Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">How SEWNA Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard icon={<LightBulbIcon />} title="Upload Your Inspiration">
              Have a photo of a dress you love? Upload it and let our AI analyze every detail to create your perfect design brief.
            </FeatureCard>
            <FeatureCard icon={<SparklesIcon />} title="Generate a Design Brief">
              Receive a comprehensive brief with style, fabric, and feature suggestions in seconds, tailored to your unique preferences.
            </FeatureCard>
            <FeatureCard icon={<BriefcaseIcon />} title="Connect with Designers">
              Share your brief with our community of skilled designers ready to create your vision and bring your ideas to life.
            </FeatureCard>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah Johnson"
              role="Customer"
              content="SEWNA helped me find the perfect designer for my wedding dress. The AI-generated brief captured exactly what I wanted!"
              image="sarah.jpg"
            />
            <TestimonialCard
              name="Michael Chen"
              role="Designer"
              content="As a designer, SEWNA has connected me with clients who appreciate my unique style. The detailed briefs save so much time."
              image="michael.jpg"
            />
            <TestimonialCard
              name="Emma Rodriguez"
              role="Customer"
              content="I had a vision but couldn't articulate it. SEWNA's AI analyzed my inspiration photos and created the perfect brief."
              image="emma.jpg"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#00b67f] py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Fashion Ideas?</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Join thousands of customers and designers who are already creating unique, personalized fashion through SEWNA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onSelectNeedDesigner}
              className="bg-white text-[#00b67f] font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Find Your Designer
            </button>
            <button
              onClick={onSelectAmDesigner}
              className="bg-transparent text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 border-2 border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Join as Designer
            </button>
            <button
              onClick={onSelectDiscoverDesigners}
              className="bg-black text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Discover Designers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
