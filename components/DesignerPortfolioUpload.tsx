
import React, { useState } from 'react';
import UploadIcon from './icons/UploadIcon';

interface DesignerPortfolioUploadProps {
  onBack: () => void;
}

const DesignerPortfolioUpload: React.FC<DesignerPortfolioUploadProps> = ({ onBack }) => {
  const [portfolioImages, setPortfolioImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [designerName, setDesignerName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [bio, setBio] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      // Check file size (max 5MB per file)
      const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024);
      if (validFiles.length !== files.length) {
        alert('Some files were too large. Maximum file size is 5MB.');
      }
      
      setPortfolioImages(prev => [...prev, ...validFiles]);
      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setPortfolioImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement tRPC procedure for portfolio upload
    console.log({ designerName, specialty, bio, portfolioImages });
    alert('Portfolio submitted! (Feature in development)');
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <button onClick={onBack} className="text-[#00b67f] font-semibold mb-8">&larr; Back to Home</button>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Create Your Designer Profile</h1>
      <p className="text-gray-600 text-center mb-10">Showcase your work and connect with clients seeking your unique style.</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Designer Profile Information */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Your Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="designerName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                id="designerName"
                value={designerName}
                onChange={e => setDesignerName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b67f] focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
              <input
                type="text"
                id="specialty"
                placeholder="e.g., Bridal Gowns, Streetwear"
                value={specialty}
                onChange={e => setSpecialty(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b67f] focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Short Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Tell clients a little about your design philosophy."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b67f] focus:border-transparent transition-all duration-200"
              rows={4}
              required
            />
            <p className="text-xs text-gray-500 mt-1">Minimum 50 characters</p>
          </div>
        </div>

        {/* Portfolio Image Upload */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Upload Your Portfolio</h2>
          <label
            htmlFor="portfolio-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
              <UploadIcon />
              <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs">PNG, JPG or WEBP (Select multiple images, max 5MB each)</p>
            </div>
          </label>
          <input id="portfolio-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} multiple />

          {/* Image Preview */}
          {imagePreviews.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Portfolio Preview</h3>
                <span className="text-sm text-gray-500">{imagePreviews.length} images</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                    <img src={src} alt={`Portfolio image ${index + 1}`} className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-105" />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                      title="Remove image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700">
                  <strong>Tip:</strong> Show your best work first. Include a variety of styles to showcase your versatility.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#00b67f] text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:scale-100 disabled:shadow-none"
          >
            Submit Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default DesignerPortfolioUpload;
