
import React, { useState } from 'react';

interface DesignerPortfolioUploadProps {
  onBack: () => void;
}

const DesignerPortfolioUpload: React.FC<DesignerPortfolioUploadProps> = ({ onBack }) => {
  const [portfolioImages, setPortfolioImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [designerName, setDesignerName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Apparel');
  const [bio, setBio] = useState('');
  const [bioCharCount, setBioCharCount] = useState(0);
  const [styleTags, setStyleTags] = useState<string[]>(['Sustainable', 'Minimalist']);
  const [newTag, setNewTag] = useState('');
  const [isUploadView, setIsUploadView] = useState(true);

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

  const addStyleTag = () => {
    if (newTag.trim() && !styleTags.includes(newTag.trim())) {
      setStyleTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeStyleTag = (tagToRemove: string) => {
    setStyleTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 500) {
      setBio(text);
      setBioCharCount(text.length);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement tRPC procedure for portfolio upload
    console.log({ designerName, specialty: selectedSpecialty, bio, styleTags, portfolioImages });
    alert('Portfolio submitted! (Feature in development)');
  };

  return (
    <div className="layout-container flex h-full grow flex-col">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-16 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col w-full max-w-7xl flex-1">
          <main className="flex flex-col flex-1 py-8 sm:py-12 px-4 sm:px-6">
            <div className="flex flex-wrap justify-between gap-4 mb-8">
              <div className="flex flex-col gap-2">
                <p className="text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">Create Your Designer Profile</p>
                <p className="text-base font-normal leading-normal text-text-light/70 dark:text-text-dark/70">Showcase your work and connect with fashion lovers.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
              {/* Left Column: Form */}
              <div className="lg:col-span-4 flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-bold">Designer Information</h3>

                  {/* Profile Picture */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20">
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold text-xl">
                        {designerName ? designerName.split(' ').map(n => n[0]).join('') : 'DP'}
                      </div>
                      <button className="absolute bottom-0 right-0 flex items-center justify-center w-7 h-7 bg-primary rounded-full text-white hover:bg-primary/90">
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>edit</span>
                      </button>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold">Profile Picture</p>
                      <p className="text-sm text-text-light/70 dark:text-text-dark/70">PNG or JPG. Min 200x200px.</p>
                    </div>
                  </div>

                  {/* Full Name */}
                  <label className="flex flex-col">
                    <p className="text-base font-medium leading-normal pb-2">Full Name</p>
                    <input
                      className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 h-12 placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
                      placeholder="Enter your full name"
                      value={designerName}
                      onChange={e => setDesignerName(e.target.value)}
                      required
                    />
                  </label>

                  {/* Specialty Selection */}
                  <div>
                    <p className="text-base font-medium leading-normal pb-2">Specialty</p>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => setSelectedSpecialty('Apparel')}
                        className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 ${
                          selectedSpecialty === 'Apparel'
                            ? 'bg-primary/20 dark:bg-primary/30 text-primary dark:text-primary/90'
                            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
                        }`}
                      >
                        <p className={`text-sm ${selectedSpecialty === 'Apparel' ? 'font-semibold' : 'font-medium'} leading-normal`}>Apparel</p>
                      </button>
                      <button
                        onClick={() => setSelectedSpecialty('Accessories')}
                        className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 ${
                          selectedSpecialty === 'Accessories'
                            ? 'bg-primary/20 dark:bg-primary/30 text-primary dark:text-primary/90'
                            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
                        }`}
                      >
                        <p className={`text-sm ${selectedSpecialty === 'Accessories' ? 'font-semibold' : 'font-medium'} leading-normal`}>Accessories</p>
                      </button>
                      <button
                        onClick={() => setSelectedSpecialty('Footwear')}
                        className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 ${
                          selectedSpecialty === 'Footwear'
                            ? 'bg-primary/20 dark:bg-primary/30 text-primary dark:text-primary/90'
                            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
                        }`}
                      >
                        <p className={`text-sm ${selectedSpecialty === 'Footwear' ? 'font-semibold' : 'font-medium'} leading-normal`}>Footwear</p>
                      </button>
                    </div>
                  </div>

                  {/* Bio */}
                  <label className="flex flex-col">
                    <div className="flex justify-between items-center pb-2">
                      <p className="text-base font-medium leading-normal">Bio</p>
                      <p className="text-sm text-text-light/50 dark:text-text-dark/50">{bioCharCount} / 500</p>
                    </div>
                    <textarea
                      className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 min-h-36 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal"
                      placeholder="Tell us about your design philosophy..."
                      value={bio}
                      onChange={handleBioChange}
                      required
                    />
                  </label>
                </div>

                {/* Style Tags */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-bold">Style Tags</h3>
                  <input
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 h-12 placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
                    placeholder="e.g., Streetwear, Sustainable, Avant-Garde"
                    value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addStyleTag();
                      }
                    }}
                  />
                  <div className="flex gap-2 flex-wrap">
                    {styleTags.map(tag => (
                      <button
                        key={tag}
                        className="flex h-8 items-center justify-center gap-x-1.5 rounded-full bg-gray-100 dark:bg-gray-800 pl-3 pr-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => removeStyleTag(tag)}
                      >
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{tag}</p>
                        <span className="material-symbols-outlined text-gray-600 dark:text-gray-400" style={{ fontSize: '16px' }}>close</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Portfolio */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Portfolio Upload</h3>
                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    <button
                      onClick={() => setIsUploadView(true)}
                      className={`px-3 py-1 text-sm font-semibold rounded-md ${
                        isUploadView ? 'bg-white dark:bg-gray-900 shadow-sm' : ''
                      }`}
                    >
                      Upload View
                    </button>
                    <button
                      onClick={() => setIsUploadView(false)}
                      className={`px-3 py-1 text-sm font-medium ${
                        !isUploadView ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      Live Preview
                    </button>
                  </div>
                </div>

                {isUploadView ? (
                  <>
                    <div className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/20 dark:bg-primary/30 mb-4">
                        <span className="material-symbols-outlined text-primary text-3xl">upload</span>
                      </div>
                      <p className="font-semibold mb-1 text-gray-900 dark:text-white">Drag & drop your images here</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">or <span className="font-semibold text-primary cursor-pointer">click to browse</span></p>
                      <label className="flex items-center justify-center rounded-lg h-10 px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-medium border border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <span className="truncate">Select File</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/png, image/jpeg, image/webp"
                          onChange={handleFileChange}
                          multiple
                        />
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Up to 10 images, max 5MB each</p>
                    </div>

                    {/* Image Preview Grid */}
                    {imagePreviews.length > 0 && (
                      <div className="grid grid-cols-2 @md:grid-cols-3 gap-4">
                        {imagePreviews.map((src, index) => (
                          <div key={index} className="group relative aspect-square rounded-lg overflow-hidden">
                            <img src={src} alt={`Portfolio image ${index + 1}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-start justify-end p-2">
                              <div className="flex gap-1">
                                <button className="w-8 h-8 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30">
                                  <span className="material-symbols-outlined">drag_indicator</span>
                                </button>
                                <button
                                  onClick={() => removeImage(index)}
                                  className="w-8 h-8 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30"
                                >
                                  <span className="material-symbols-outlined">delete</span>
                                </button>
                              </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-2">
                              <input
                                className="form-input text-sm w-full rounded-md border-none bg-black/30 backdrop-blur-sm text-white placeholder:text-white/70 focus:ring-2 focus:ring-primary"
                                placeholder="Add a description..."
                                defaultValue={`Look ${index + 1}: ${selectedSpecialty} Design`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">visibility</span>
                    <p className="text-gray-500">Live preview will show here when images are uploaded</p>
                  </div>
                )}

                {/* Submission Section */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto bg-white dark:bg-gray-900 -mx-8 px-8">
                  <div className="flex items-center gap-3">
                    <input className="h-5 w-5 rounded text-primary bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-primary focus:ring-2" id="terms" type="checkbox" />
                    <label className="text-sm text-gray-700 dark:text-gray-300" htmlFor="terms">I agree to the <a className="font-semibold text-primary underline" href="#">Terms and Conditions</a>.</label>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="flex w-full sm:w-auto items-center justify-center rounded-lg h-12 px-8 bg-primary text-white text-base font-bold leading-normal tracking-wide hover:bg-primary/90 transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
                  >
                    Submit Profile
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DesignerPortfolioUpload;
