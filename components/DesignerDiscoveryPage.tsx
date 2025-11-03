import React, { useState, useMemo } from 'react';
import { BriefcaseIcon, LightBulbIcon, SparklesIcon } from './icons/FeatureIcons';

interface Designer {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  rating: number;
  projectsCompleted: number;
  avatar: string;
  tags: string[];
}

interface DesignerDiscoveryPageProps {
  onBack: () => void;
}

const DesignerDiscoveryPage: React.FC<DesignerDiscoveryPageProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'projects' | 'name'>('rating');
  const [selectedDesigner, setSelectedDesigner] = useState<Designer | null>(null);

  // Mock data for designers
  const designers: Designer[] = [
    {
      id: '1',
      name: 'Elena Rodriguez',
      specialty: 'Bridal Wear',
      bio: 'Specializing in elegant bridal gowns with modern touches. Every dress tells a unique love story.',
      rating: 4.9,
      projectsCompleted: 47,
      avatar: 'ER',
      tags: ['Bridal', 'Formal', 'Elegant']
    },
    {
      id: '2',
      name: 'Marcus Chen',
      specialty: 'Streetwear',
      bio: 'Urban fashion with a sustainable twist. Creating bold statements that respect our planet.',
      rating: 4.7,
      projectsCompleted: 62,
      avatar: 'MC',
      tags: ['Streetwear', 'Sustainable', 'Urban']
    },
    {
      id: '3',
      name: 'Sophia Laurent',
      specialty: 'Evening Wear',
      bio: 'Red carpet glamour meets everyday comfort. Luxury fashion for the modern woman.',
      rating: 4.8,
      projectsCompleted: 35,
      avatar: 'SL',
      tags: ['Evening', 'Luxury', 'Modern']
    },
    {
      id: '4',
      name: 'James Wilson',
      specialty: 'Casual Wear',
      bio: 'Comfortable, practical, and stylish. Everyday fashion that feels like you.',
      rating: 4.6,
      projectsCompleted: 58,
      avatar: 'JW',
      tags: ['Casual', 'Comfortable', 'Practical']
    },
    {
      id: '5',
      name: 'Aisha Patel',
      specialty: 'Traditional Fusion',
      bio: 'Blending traditional craftsmanship with contemporary design. Cultural heritage in modern form.',
      rating: 4.9,
      projectsCompleted: 29,
      avatar: 'AP',
      tags: ['Traditional', 'Fusion', 'Cultural']
    },
    {
      id: '6',
      name: 'David Kim',
      specialty: 'Business Attire',
      bio: 'Professional wear that makes a statement. Power dressing for the modern workplace.',
      rating: 4.5,
      projectsCompleted: 41,
      avatar: 'DK',
      tags: ['Business', 'Professional', 'Modern']
    }
  ];

  const specialties = useMemo(() => {
    const uniqueSpecialties = [...new Set(designers.map(d => d.specialty))];
    return ['all', ...uniqueSpecialties];
  }, []);

  const filteredAndSortedDesigners = useMemo(() => {
    let filtered = designers.filter(designer => {
      const matchesSearch = designer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          designer.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          designer.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSpecialty = selectedSpecialty === 'all' || designer.specialty === selectedSpecialty;
      
      return matchesSearch && matchesSpecialty;
    });

    // Sort designers
    return [...filtered].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'projects') return b.projectsCompleted - a.projectsCompleted;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [designers, searchTerm, selectedSpecialty, sortBy]);

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l2.8-2.034a1 1 0 011.09 0l2.8 2.034c.784.57 1.838-.197 1.538-1.118l-1.07-3.292a1 1 0 00-.364-1.118L18.46 6.91c.783-.57.384-1.81-.588-1.81h-3.462a1 1 0 01-.95-.69L10.95 2.927z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  const DesignerCard = ({ designer }: { designer: Designer }) => (
    <div 
      className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => setSelectedDesigner(designer)}
    >
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xl">
          {designer.avatar}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{designer.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{designer.specialty}</p>
          <StarRating rating={designer.rating} />
          <p className="text-xs text-gray-500 mt-1">{designer.projectsCompleted} projects completed</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-4 line-clamp-2">{designer.bio}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {designer.tags.map(tag => (
          <span key={tag} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  const DesignerModal = ({ designer }: { designer: Designer }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-2xl">
                {designer.avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{designer.name}</h2>
                <p className="text-gray-500">{designer.specialty}</p>
                <StarRating rating={designer.rating} />
                <p className="text-sm text-gray-500">{designer.projectsCompleted} projects completed</p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedDesigner(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-gray-600">{designer.bio}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {designer.tags.map(tag => (
                <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button className="flex-1 bg-[#00b67f] text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105">
              Contact Designer
            </button>
            <button className="flex-1 bg-gray-200 text-black font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:bg-gray-300">
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <button onClick={onBack} className="text-[#00b67f] font-semibold mb-8">&larr; Back to Home</button>
      
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Designers</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find the perfect designer for your project. Browse through our curated selection of talented fashion professionals.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, specialty, or style..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b67f] focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
            <select
              id="specialty"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b67f] focus:border-transparent"
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>
                  {specialty === 'all' ? 'All Specialties' : specialty}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'projects' | 'name')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b67f] focus:border-transparent"
            >
              <option value="rating">Highest Rated</option>
              <option value="projects">Most Projects</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          Showing {filteredAndSortedDesigners.length} of {designers.length} designers
        </div>
      </div>

      {/* Designer Grid */}
      {filteredAndSortedDesigners.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedDesigners.map(designer => (
            <DesignerCard key={designer.id} designer={designer} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">No designers found</h3>
          <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}

      {/* Designer Modal */}
      {selectedDesigner && (
        <DesignerModal designer={selectedDesigner} />
      )}
    </div>
  );
};

export default DesignerDiscoveryPage;
