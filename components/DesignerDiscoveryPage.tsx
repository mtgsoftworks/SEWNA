import React, { useState, useMemo } from 'react';
import StarRating from './StarRating';

interface Designer {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  rating: number;
  projectsCompleted: number;
  avatar?: string;
  tags: string[];
  image?: string;
}

interface DesignerDiscoveryPageProps {
  onBack: () => void;
}

const DesignerDiscoveryPage: React.FC<DesignerDiscoveryPageProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedStyle, setSelectedStyle] = useState('Any Style');
  const [selectedRating, setSelectedRating] = useState('Any Rating');
  const [location, setLocation] = useState('');
  const [selectedDesigner, setSelectedDesigner] = useState<Designer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data for designers
  const designers: Designer[] = [
    {
      id: '1',
      name: 'Jane Doe',
      specialty: 'Knitwear',
      bio: 'Crafting timeless knitwear with a focus on sustainable materials and modern silhouettes.',
      rating: 4.8,
      projectsCompleted: 12,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_-x5AaVGIYBpB1_DSI9gjbCS8k0JGTW3cg8xXai02fc1mCI3ixqrS0d1mqefXvw-fkIcj9Q6KzfOiABQFik0BO5TX4eVQ3MV4opnDb21LausCL_7lAuYxQDMepu4XWUE3k-V1x__8XlWL2MtUSPrbtaZS5fyf7GLTsKZiawN3EzGn5frQjKXunBNwla9cTfKxZERlo7cx_Jw-6BfM6VIznR7tJCOKfJbuye5iBlIU8cBg5hvpfJebGDt5JsViSrZrkYriygyc910',
      tags: ['Minimalist', 'Sustainable']
    },
    {
      id: '2',
      name: 'John Smith',
      specialty: 'Streetwear',
      bio: 'Bold, graphic-driven streetwear that pushes the boundaries of urban fashion culture.',
      rating: 5.0,
      projectsCompleted: 25,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsLVib_NZg63LoBpCbEHwrKCnRKF-ix--BRUznA-ymzDuqUo785_-E0oPW8Btys0EfEVJxP0Rg9Z0UaC0Mnz7rDDcSwAjuu6jWyrjueItXKT5hnAXMGunofisdKiKT_CIgVTE6PACwt3VA0EF7OxJoHVma7Q96lCovig3hs2alAhsBL_tlZrCmsLBCiguCev_gJbVnRtnMbDveSynkoN6N4dfo_-qG7oUE7jjuHsBRLtOuJVnwNgu8mYPrn1XDwn6_FL46KBcKz3o',
      tags: ['Urban', 'Graphic']
    },
    {
      id: '3',
      name: 'Maria Garcia',
      specialty: 'Bridal',
      bio: 'Elegant and romantic bridal gowns designed to make every bride feel exceptional.',
      rating: 5.0,
      projectsCompleted: 18,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHLSmoXcvgHfDBV3A72q9VkBx33CswlX5x9aNmucP8J2-k0A1qJSYKn-dF1zUWCqUCyXkwblNdFEr3feSXZq85592QDuGaH-oiJltiqvUMaCOKefjtMU2xwUg8UIXeL4sBeCoryOyBZfrd9PYIvsF1fhQP0NdLyN1OaK3Kt3ShIzZ8-R-Gq4A1vstLzkJifsqcLe5xMXRJ3yihvnqs_qMh9zUjNTw4QzRr59pUnefkN-9RX6KFzzlc7WqxyxufWSZnYvJJG_tqYrw',
      tags: ['Elegant', 'Romantic']
    },
    {
      id: '4',
      name: 'Chen Wei',
      specialty: 'Haute Couture',
      bio: 'Exquisite, one-of-a-kind creations that blend traditional craftsmanship with avant-garde design.',
      rating: 4.5,
      projectsCompleted: 31,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgOMn8ahjbyzNkZiGWWXBnU-2WvmInVaJKZ9_1qts_LtAC4JMNa6s9v-ZTWUQUtOHI06573IbN-xjF3Iu1K15hhfOEgd6uXjGzuQTajEhG6ZjW9AfINCDH_D3zhTNj6LumGCRJcgsIhlPsJM64yKsxWjSExnHd9Ni5c2KOuVRfauqlJUNk49Pd7H3_CRWMFPXrOts3y76EjvwILSEqovH1kOLOCfVOzAZKfPLu7Hu3FptDiFKAtE_JwxLRrY-gUXBlZqY3Ix8I-YI',
      tags: ['Avant-Garde', 'Luxury']
    }
  ];

  const specialties = ['All Specialties', 'Knitwear', 'Haute Couture', 'Streetwear', 'Bridal'];
  const styles = ['Any Style', 'Minimalist', 'Bohemian', 'Vintage', 'Sustainable'];
  const ratings = ['Any Rating', '4 Stars & Up', '3 Stars & Up', '2 Stars & Up'];

  const filteredDesigners = useMemo(() => {
    return designers.filter(designer => {
      const matchesSearch = designer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          designer.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          designer.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesSpecialty = selectedSpecialty === 'All Specialties' || designer.specialty === selectedSpecialty;
      const matchesStyle = selectedStyle === 'Any Style' || designer.tags.includes(selectedStyle);

      let matchesRating = true;
      if (selectedRating === '4 Stars & Up') matchesRating = designer.rating >= 4;
      else if (selectedRating === '3 Stars & Up') matchesRating = designer.rating >= 3;
      else if (selectedRating === '2 Stars & Up') matchesRating = designer.rating >= 2;

      return matchesSearch && matchesSpecialty && matchesStyle && matchesRating;
    });
  }, [designers, searchTerm, selectedSpecialty, selectedStyle, selectedRating]);

  const DesignerCard = ({ designer }: { designer: Designer }) => (
    <div
      className="bg-white dark:bg-[#0c1d18] rounded-xl overflow-hidden border border-[#e6f4f0] dark:border-[#1a2e29] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      onClick={() => setSelectedDesigner(designer)}
    >
      <div
        className="bg-center bg-no-repeat aspect-[4/3] bg-cover"
        style={{ backgroundImage: designer.image ? `url(${designer.image})` : undefined }}
      >
        {!designer.image && (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500 text-2xl font-bold">
              {designer.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-bold text-[#0c1d18] dark:text-white">{designer.name}</h3>
          <p className="text-primary dark:text-[#66d1b2] font-medium">{designer.specialty}</p>
        </div>
        <StarRating rating={designer.rating} reviewCount={designer.projectsCompleted} />
        <p className="text-[#45a185] dark:text-[#94c2b3] text-sm leading-relaxed">{designer.bio}</p>
        <div className="flex flex-wrap gap-2">
          {designer.tags.map(tag => (
            <span key={tag} className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 dark:bg-primary/30 text-[#0c1d18] dark:text-white">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3 pt-2">
          <button
            className="flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              // Handle view profile
            }}
          >
            View Profile
          </button>
          <button
            className="flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/20 dark:bg-primary/30 text-[#0c1d18] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/30 dark:hover:bg-primary/40 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Handle contact
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );

  const DesignerModal = ({ designer }: { designer: Designer }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-[#0c1d18] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              {designer.image ? (
                <div
                  className="w-20 h-20 rounded-full bg-center bg-no-repeat bg-cover"
                  style={{ backgroundImage: `url(${designer.image})` }}
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-2xl">
                  {designer.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-[#0c1d18] dark:text-white">{designer.name}</h2>
                <p className="text-primary dark:text-[#66d1b2] font-medium">{designer.specialty}</p>
                <StarRating rating={designer.rating} reviewCount={designer.projectsCompleted} />
                <p className="text-sm text-gray-500 dark:text-gray-400">{designer.projectsCompleted} projects completed</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedDesigner(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-[#0c1d18] dark:text-white">About</h3>
            <p className="text-gray-600 dark:text-gray-400">{designer.bio}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-[#0c1d18] dark:text-white">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {designer.tags.map(tag => (
                <span key={tag} className="bg-primary/20 dark:bg-primary/30 px-3 py-1 rounded-full text-sm text-[#0c1d18] dark:text-white">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="flex-1 bg-primary text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105">
              Contact Designer
            </button>
            <button className="flex-1 bg-gray-200 dark:bg-gray-700 text-[#0c1d18] dark:text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-600">
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-12">
      <span className="material-symbols-outlined text-6xl text-gray-400">search_off</span>
      <p className="text-gray-500 mt-4">No designers found matching your criteria</p>
    </div>
  );

  const ErrorMessage = ({ message }: { message: string }) => (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
      {message}
    </div>
  );

  const SkeletonCard = () => (
    <div className="bg-white dark:bg-[#0c1d18] rounded-xl overflow-hidden border border-[#e6f4f0] dark:border-[#1a2e29] animate-pulse">
      <div className="bg-gray-200 dark:bg-gray-700 aspect-[4/3]"></div>
      <div className="p-6 flex flex-col gap-4">
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
        </div>
        <div className="flex gap-3 pt-2">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Search and Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Panel */}
            <aside className="lg:col-span-1">
              <div className="bg-white dark:bg-[#0c1d18] rounded-xl p-6 space-y-6 border border-[#e6f4f0] dark:border-[#1a2e29]">
                {error && <ErrorMessage message={error} />}
                {/* SearchBar */}
                <div className="w-full">
                  <label className="flex flex-col min-w-40 h-12 w-full">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                      <div className="text-[#45a185] flex bg-primary/20 dark:bg-primary/30 items-center justify-center pl-4 rounded-l-lg">
                        <span className="material-symbols-outlined">search</span>
                      </div>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-[#0c1d18] dark:text-white focus:outline-0 focus:ring-0 border-none bg-primary/20 dark:bg-primary/30 h-full placeholder:text-[#45a185] dark:placeholder:text-[#94c2b3] pl-2 text-base font-normal leading-normal"
                        placeholder="Search designers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </label>
                </div>

                {/* SectionHeader */}
                <h3 className="text-[#0c1d18] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pt-2">Filters</h3>

                {/* Filters */}
                <div className="space-y-4">
                  <label className="flex flex-col w-full">
                    <p className="text-[#0c1d18] dark:text-white text-sm font-medium leading-normal pb-2">Specialty</p>
                    <select
                      className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0c1d18] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cdeae1] dark:border-[#2a4a40] bg-[#f8fcfb] dark:bg-[#1a2e29] h-12 px-3 text-base font-normal leading-normal"
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                    >
                      {specialties.map(specialty => (
                        <option key={specialty} value={specialty}>{specialty}</option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col w-full">
                    <p className="text-[#0c1d18] dark:text-white text-sm font-medium leading-normal pb-2">Style Tags</p>
                    <select
                      className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0c1d18] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cdeae1] dark:border-[#2a4a40] bg-[#f8fcfb] dark:bg-[#1a2e29] h-12 px-3 text-base font-normal leading-normal"
                      value={selectedStyle}
                      onChange={(e) => setSelectedStyle(e.target.value)}
                    >
                      {styles.map(style => (
                        <option key={style} value={style}>{style}</option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col w-full">
                    <p className="text-[#0c1d18] dark:text-white text-sm font-medium leading-normal pb-2">Rating</p>
                    <select
                      className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0c1d18] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cdeae1] dark:border-[#2a4a40] bg-[#f8fcfb] dark:bg-[#1a2e29] h-12 px-3 text-base font-normal leading-normal"
                      value={selectedRating}
                      onChange={(e) => setSelectedRating(e.target.value)}
                    >
                      {ratings.map(rating => (
                        <option key={rating} value={rating}>{rating}</option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col w-full">
                    <p className="text-[#0c1d18] dark:text-white text-sm font-medium leading-normal pb-2">Location</p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0c1d18] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cdeae1] dark:border-[#2a4a40] bg-[#f8fcfb] dark:bg-[#1a2e29] h-12 placeholder:text-[#45a185] dark:placeholder:text-[#94c2b3] px-3 text-base font-normal leading-normal"
                      placeholder="e.g., Paris, France"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-3 pt-4">
                  <button className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity">
                    Apply Filters
                  </button>
                  <button className="w-full text-center text-primary dark:text-[#66d1b2] text-sm font-medium hover:underline">
                    Clear All
                  </button>
                </div>
              </div>
            </aside>

            {/* Designer Cards Grid */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              ) : filteredDesigners.length === 0 ? (
                <EmptyState />
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredDesigners.map(designer => (
                      <DesignerCard designer={designer} />
                    ))}
                  </div>

                  {/* Pagination */}
                  <nav className="flex items-center justify-center gap-4 mt-12 text-[#0c1d18] dark:text-white">
                    <button className="p-2 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors disabled:opacity-50" disabled>
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <a className="h-10 w-10 flex items-center justify-center text-sm font-bold rounded-lg bg-primary text-white" href="#">1</a>
                    <a className="h-10 w-10 flex items-center justify-center text-sm font-medium rounded-lg hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors" href="#">2</a>
                    <a className="h-10 w-10 flex items-center justify-center text-sm font-medium rounded-lg hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors" href="#">3</a>
                    <span className="text-sm">...</span>
                    <a className="h-10 w-10 flex items-center justify-center text-sm font-medium rounded-lg hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors" href="#">10</a>
                    <button className="p-2 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </nav>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Designer Modal */}
      {selectedDesigner && (
        <DesignerModal designer={selectedDesigner} />
      )}
    </div>
  );
};

export default DesignerDiscoveryPage;
