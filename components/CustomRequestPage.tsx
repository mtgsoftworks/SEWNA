
import React, { useState } from 'react';
import { generateDesignBriefFromImage, generateMockDesignBrief } from '../services/geminiService';
import { DesignBrief } from '../types';
import UploadIcon from './icons/UploadIcon';
import SpinnerIcon from './icons/SpinnerIcon';

interface CustomRequestPageProps {
  onBack: () => void;
}

type Step = 'upload' | 'preferences' | 'summary' | 'confirmation';

const CustomRequestPage: React.FC<CustomRequestPageProps> = ({ onBack }) => {
  const [step, setStep] = useState<Step>('upload');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [userNotes, setUserNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedBrief, setGeneratedBrief] = useState<DesignBrief | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stylePreferences, setStylePreferences] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setGeneratedBrief(null);
      setError(null);
    }
  };

  const handleGenerateBrief = async () => {
    if (!imageFile) {
      setError('Please upload an image first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedBrief(null);

    try {
      // Try to use the real API first, fall back to mock if API key is not available
      let brief: DesignBrief;
      try {
        brief = await generateDesignBriefFromImage(imageFile, userNotes);
      } catch (apiError) {
        // If API key is not configured, use mock function
        if (apiError instanceof Error && apiError.message.includes("API key")) {
          console.warn("Using mock data due to missing API key");
          brief = await generateMockDesignBrief(imageFile, userNotes);
        } else {
          throw apiError;
        }
      }
      
      setGeneratedBrief(brief);
      setStep('preferences');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStylePreferenceChange = (style: string) => {
    setStylePreferences(prev => 
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  const handleSubmitRequest = () => {
    // TODO: Implement tRPC procedure for request submission
    console.log({ generatedBrief, stylePreferences, userNotes });
    setStep('confirmation');
  };

  const renderStep = () => {
    switch (step) {
      case 'upload':
        return <UploadStep 
          onNext={handleGenerateBrief} 
          imageFile={imageFile} 
          imagePreview={imagePreview} 
          userNotes={userNotes} 
          setUserNotes={setUserNotes} 
          handleFileChange={handleFileChange} 
          isLoading={isLoading} 
          error={error} 
        />;
      case 'preferences':
        return <PreferencesStep 
          onNext={() => setStep('summary')} 
          onBack={() => setStep('upload')} 
          generatedBrief={generatedBrief} 
          stylePreferences={stylePreferences} 
          onStyleChange={handleStylePreferenceChange} 
        />;
      case 'summary':
        return <SummaryStep 
          onNext={handleSubmitRequest} 
          onBack={() => setStep('preferences')} 
          brief={generatedBrief} 
          preferences={stylePreferences} 
          imagePreview={imagePreview} 
          userNotes={userNotes} 
        />;
      case 'confirmation':
        return <ConfirmationStep onBack={onBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <button onClick={onBack} className="text-[#00b67f] font-semibold mb-8">&larr; Back to Home</button>
      {renderStep()}
    </div>
  );
};

// Step 1: Upload Image and Notes
const UploadStep = ({ onNext, imageFile, imagePreview, userNotes, setUserNotes, handleFileChange, isLoading, error }) => (
  <div className="animate-fade-in">
    <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Create a Custom Request (Step 1/3)</h1>
    <p className="text-gray-600 text-center mb-10">Upload an inspiration image and add your notes.</p>
    <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">1. Upload Your Inspiration</h2>
      <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200">
        {imagePreview ? 
          <div className="relative w-full h-full">
            <img src={imagePreview} alt="Preview" className="object-contain h-full w-full rounded-lg" />
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
              Click to change
            </div>
          </div> : 
          <div className="text-center text-gray-500">
            <UploadIcon />
            <p className="mt-2">Click to upload or drag and drop</p>
            <p className="text-xs mt-1">PNG, JPG or WEBP (max. 10MB)</p>
          </div>
        }
      </label>
      <input id="image-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
      
      <h2 className="text-xl font-semibold mt-6 mb-4">2. Add Your Notes</h2>
      <textarea 
        value={userNotes} 
        onChange={e => setUserNotes(e.target.value)} 
        placeholder="e.g., 'I love the neckline but want it in a deep blue silk.'" 
        className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-[#00b67f] focus:border-transparent transition-all duration-200" 
      />
      
      {error && <div className="text-red-500 mt-4 p-3 bg-red-50 rounded-lg border border-red-200">{error}</div>}
      
      <button 
        onClick={onNext} 
        disabled={!imageFile || isLoading} 
        className="w-full bg-[#00b67f] text-white font-semibold py-3 mt-6 rounded-full text-lg flex items-center justify-center disabled:bg-gray-400 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:scale-100 disabled:shadow-none"
      >
        {isLoading ? <SpinnerIcon /> : 'Generate & Continue'}
      </button>
    </div>
  </div>
);

// Step 2: Style Preferences
const PreferencesStep = ({ onNext, onBack, generatedBrief, stylePreferences, onStyleChange }) => (
  <div className="animate-fade-in">
    <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Refine Your Brief (Step 2/3)</h1>
    <p className="text-gray-600 text-center mb-10">Our AI generated a brief. Select the features you like.</p>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">AI Generated Brief</h2>
        {generatedBrief && (
          <div className="space-y-4">
            <div className="pb-3 border-b border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Style</p>
              <p className="font-medium">{generatedBrief.style}</p>
            </div>
            <div className="pb-3 border-b border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Garment Type</p>
              <p className="font-medium">{generatedBrief.garmentType}</p>
            </div>
            <div className="pb-3 border-b border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Occasion</p>
              <p className="font-medium">{generatedBrief.occasion}</p>
            </div>
            <div className="pb-3 border-b border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Key Features</p>
              <ul className="list-disc list-inside space-y-1">
                {generatedBrief.keyFeatures.map(f => <li key={f} className="text-sm">{f}</li>)}
              </ul>
            </div>
            <div className="pb-3 border-b border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Suggested Fabrics</p>
              <div className="flex flex-wrap gap-2">
                {generatedBrief.suggestedFabrics.map(f => <span key={f} className="bg-gray-200 px-2 py-1 rounded-full text-xs">{f}</span>)}
              </div>
            </div>
            <div className="pt-2">
              <p className="text-sm text-gray-500 mb-1">AI Summary</p>
              <p className="italic text-sm">{generatedBrief.summary}</p>
            </div>
          </div>
        )}
      </div>
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Select Your Preferences</h2>
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {generatedBrief && [...generatedBrief.keyFeatures, ...generatedBrief.suggestedFabrics].map(item => (
            <label key={item} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
              <input 
                type="checkbox" 
                checked={stylePreferences.includes(item)} 
                onChange={() => onStyleChange(item)} 
                className="h-5 w-5 text-[#00b67f] rounded focus:ring-[#00b67f]" 
              />
              <span className="text-sm">{item}</span>
            </label>
          ))}
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-700">
            <strong>Tip:</strong> Select at least 3 features to help designers understand your preferences better.
          </p>
        </div>
      </div>
    </div>
    <div className="flex justify-between mt-8">
      <button 
        onClick={onBack} 
        className="bg-gray-200 text-black font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-gray-300 hover:shadow-md"
      >
        Back
      </button>
      <button 
        onClick={onNext} 
        className="bg-[#00b67f] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
      >
        Review & Submit
      </button>
    </div>
  </div>
);

// Step 3: Summary and Submission
const SummaryStep = ({ onNext, onBack, brief, preferences, imagePreview, userNotes }) => (
  <div className="animate-fade-in">
    <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">Final Review (Step 3/3)</h1>
    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Your Custom Request</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h3 className="font-semibold mb-2 text-sm text-gray-500 uppercase">Inspiration</h3>
          <div className="relative group">
            <img src={imagePreview} alt="Inspiration" className="rounded-lg w-full" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
          </div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-500 text-sm uppercase mb-2">Your Notes</h3>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p>{userNotes || 'No notes provided.'}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-500 text-sm uppercase mb-2">Selected Features</h3>
            <div className="p-3 bg-gray-50 rounded-lg">
              <ul className="list-disc list-inside space-y-1">
                {preferences.length > 0 ? preferences.map(p => <li key={p} className="text-sm">{p}</li>) : <li className="text-sm text-gray-500">No features selected.</li>}
              </ul>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-500 text-sm uppercase mb-2">AI Summary</h3>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="italic text-sm">{brief?.summary}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-green-700">
          <strong>Next step:</strong> After submitting, your request will be shared with our community of designers who specialize in your preferred style.
        </p>
      </div>
    </div>
    <div className="flex justify-between mt-8">
      <button 
        onClick={onBack} 
        className="bg-gray-200 text-black font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-gray-300 hover:shadow-md"
      >
        Back
      </button>
      <button 
        onClick={onNext} 
        className="bg-[#00b67f] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
      >
        Submit Request
      </button>
    </div>
  </div>
);

// Step 4: Confirmation
const ConfirmationStep = ({ onBack }) => (
  <div className="text-center py-20 animate-fade-in">
    <div className="max-w-md mx-auto">
      <div className="mb-6 flex justify-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-[#00b67f] mb-4">Request Submitted!</h1>
      <p className="text-gray-600 mb-8">A designer will reach out to you soon. You can view the status of your request in your dashboard.</p>
      
      <div className="bg-gray-50 p-6 rounded-xl mb-8">
        <h3 className="font-semibold mb-3">What happens next?</h3>
        <div className="space-y-3 text-left">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-[#00b67f] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
            <p className="text-sm">Your request is reviewed by our design team</p>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-[#00b67f] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
            <p className="text-sm">We match you with designers who specialize in your style</p>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-[#00b67f] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
            <p className="text-sm">Designers submit their concepts for your review</p>
          </div>
        </div>
      </div>
      
      <button 
        onClick={onBack} 
        className="bg-[#00b67f] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
      >
        Back to Home
      </button>
    </div>
  </div>
);

export default CustomRequestPage;

