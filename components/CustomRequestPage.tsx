import React, { useState } from 'react';
import { generateDesignBriefFromImage, generateMockDesignBrief } from '../services/geminiService';
import { DesignBrief } from '../types';
import ProgressBar from './ProgressBar';
import Breadcrumbs from './Breadcrumbs';

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
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      const file = files[0];
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
      let brief: DesignBrief;
      try {
        brief = await generateDesignBriefFromImage(imageFile, userNotes);
      } catch (apiError) {
        if (apiError instanceof Error && apiError.message.includes('API key')) {
          brief = await generateMockDesignBrief(imageFile, userNotes);
        } else {
          throw apiError;
        }
      }

      setGeneratedBrief(brief);
      setStylePreferences([
        ...brief.keyFeatures.slice(0, 2),
        ...brief.suggestedFabrics.slice(0, 1),
      ]);
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
    console.log({ generatedBrief, stylePreferences, userNotes });
    setStep('confirmation');
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setGeneratedBrief(null);
  };

  const getStepInfo = () => {
    switch (step) {
      case 'upload': return { stepNum: 1, stepName: 'Upload' };
      case 'preferences': return { stepNum: 2, stepName: 'Preferences' };
      case 'summary': return { stepNum: 3, stepName: 'Review' };
      case 'confirmation': return { stepNum: 4, stepName: 'Confirmation' };
      default: return { stepNum: 1, stepName: 'Upload' };
    }
  };

  const stepInfo = getStepInfo();

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <div className="layout-container flex h-full grow flex-col">
        <main className="px-4 flex flex-1 justify-center py-8 sm:py-12">
          <div className="layout-content-container flex flex-col w-full max-w-3xl flex-1 gap-8">
            <div className="flex flex-col gap-4">
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '#' },
                  { label: 'Requests', href: '#' },
                  { label: 'Create New', isActive: true }
                ]}
              />
              <div className="flex flex-wrap justify-between gap-3">
                <p className="text-[#0c1d18] dark:text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.03em] min-w-72">Create a Custom Request</p>
                <button onClick={onBack} className="rounded-full border border-black/10 px-4 py-2 text-sm hover:border-black/40">
                  Back to Home
                </button>
              </div>
            </div>

            {step !== 'confirmation' && (
              <ProgressBar currentStep={stepInfo.stepNum} totalSteps={4} stepName={stepInfo.stepName} />
            )}

            {renderStep()}
          </div>
        </main>
      </div>
    </div>
  );

  function renderStep() {
    switch (step) {
      case 'upload':
        return (
          <UploadStep
            onNext={handleGenerateBrief}
            imageFile={imageFile}
            imagePreview={imagePreview}
            userNotes={userNotes}
            setUserNotes={setUserNotes}
            handleFileChange={handleFileChange}
            isLoading={isLoading}
            error={error}
            onRemoveImage={removeImage}
          />
        );
      case 'preferences':
        return (
          <PreferencesStep
            onNext={() => setStep('summary')}
            onBack={() => setStep('upload')}
            generatedBrief={generatedBrief}
            stylePreferences={stylePreferences}
            onStyleChange={handleStylePreferenceChange}
          />
        );
      case 'summary':
        return (
          <SummaryStep
            onNext={handleSubmitRequest}
            onBack={() => setStep('preferences')}
            brief={generatedBrief}
            preferences={stylePreferences}
            imagePreview={imagePreview}
            userNotes={userNotes}
          />
        );
      case 'confirmation':
        return <ConfirmationStep onBack={onBack} />;
      default:
        return null;
    }
  }
};

const UploadStep = ({ onNext, imageFile, imagePreview, userNotes, setUserNotes, handleFileChange, isLoading, error, onRemoveImage }) => (
  <div className="flex flex-col gap-6 p-6 sm:p-8 border border-black/10 dark:border-white/10 rounded-xl bg-white/60 dark:bg-background-dark/60">
    <h2 className="text-[#0c1d18] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Upload Your Inspiration</h2>

    <div className="flex flex-col items-center justify-center border-2 border-dashed border-primary/50 dark:border-primary/40 rounded-xl p-8 text-center bg-primary/5 dark:bg-primary/10">
      <span className="material-symbols-outlined text-5xl text-primary mb-4">upload_file</span>
      <p className="font-bold text-lg text-[#0c1d18] dark:text-white">Drag & drop files here</p>
      <p className="text-sm text-black/60 dark:text-white/60 mb-4">or click to browse</p>
      <label className="flex items-center justify-center rounded-lg h-10 px-4 bg-white dark:bg-background-dark text-[#0c1d18] dark:text-white text-sm font-medium border border-black/20 dark:border-white/20 cursor-pointer">
        <span className="truncate">Select File</span>
        <input type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
      </label>
      <p className="text-xs text-black/50 dark:text-white/50 mt-4">Supports: JPG, PNG, WebP. Max size: 10MB</p>
    </div>

    {imagePreview && (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="relative group">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg" style={{ backgroundImage: `url(${imagePreview})` }} />
          <button onClick={onRemoveImage} className="absolute top-2 right-2 size-6 bg-black/50 rounded-full text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      </div>
    )}

    <div className="flex flex-col gap-2">
      <label className="text-base font-medium text-[#0c1d18] dark:text-white" htmlFor="notes">Notes for the Designer</label>
      <textarea
        className="w-full rounded-lg border border-black/20 dark:border-white/20 bg-transparent p-3 text-sm text-[#0c1d18] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:ring-2 focus:ring-primary/50 focus:border-primary"
        id="notes"
        name="notes"
        placeholder="Describe any specific details, modifications, or feelings you want the final piece to evoke..."
        rows={4}
        value={userNotes}
        onChange={e => setUserNotes(e.target.value)}
      />
    </div>

    {error && <div className="text-red-600 p-3 bg-red-50 rounded-lg border border-red-200">{error}</div>}

    <div className="flex justify-end mt-2">
      <button
        onClick={onNext}
        disabled={!imageFile || isLoading}
        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold tracking-[0.015em] disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <span className="material-symbols-outlined animate-spin mr-2">refresh</span>
            <span className="truncate">Processing...</span>
          </>
        ) : (
          <>
            <span className="truncate">Generate & Continue</span>
            <span className="material-symbols-outlined ml-2">arrow_forward</span>
          </>
        )}
      </button>
    </div>
  </div>
);

const PreferencesStep = ({ onNext, onBack, generatedBrief, stylePreferences, onStyleChange }) => (
  <div className="flex flex-col gap-6 p-6 sm:p-8 border border-black/10 dark:border-white/10 rounded-xl bg-white/60 dark:bg-background-dark/60">
    <h2 className="text-[#0c1d18] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Refine Your Design Brief</h2>
    <p className="text-gray-700 dark:text-gray-400">Our AI generated this brief. Select the features you'd like to include in your request.</p>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">AI Generated Brief</h3>
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
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Select Your Preferences</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {generatedBrief && [...generatedBrief.keyFeatures, ...generatedBrief.suggestedFabrics].map(item => (
            <label key={item} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
              <input
                type="checkbox"
                checked={stylePreferences.includes(item)}
                onChange={() => onStyleChange(item)}
                className="h-5 w-5 text-primary rounded focus:ring-primary"
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
      <button onClick={onBack} className="bg-gray-200 text-black font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-gray-300 hover:shadow-md">Back</button>
      <button onClick={onNext} className="bg-primary text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">Continue to Review</button>
    </div>
  </div>
);

const SummaryStep = ({ onNext, onBack, brief, preferences, imagePreview, userNotes }) => (
  <div className="flex flex-col gap-6 p-6 sm:p-8 border border-black/10 dark:border-white/10 rounded-xl bg-white/60 dark:bg-background-dark/60">
    <h2 className="text-[#0c1d18] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Final Review</h2>
    <p className="text-gray-700 dark:text-gray-400">Review your request details before submitting.</p>

    <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
      <h3 className="text-2xl font-semibold mb-6">Your Custom Request</h3>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h4 className="font-semibold mb-2 text-sm text-gray-500 uppercase">Inspiration</h4>
          <div className="relative group">
            {imagePreview ? (
              <img src={imagePreview} alt="Inspiration" className="rounded-lg w-full" />
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 p-6 text-sm text-gray-500">No image uploaded.</div>
            )}
          </div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div>
            <h4 className="font-semibold text-gray-500 text-sm uppercase mb-2">Your Notes</h4>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p>{userNotes || 'No notes provided.'}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-500 text-sm uppercase mb-2">Selected Features</h4>
            <div className="p-3 bg-gray-50 rounded-lg">
              <ul className="list-disc list-inside space-y-1">
                {preferences.length > 0 ? preferences.map(p => <li key={p} className="text-sm">{p}</li>) : <li className="text-sm text-gray-500">No features selected.</li>}
              </ul>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-500 text-sm uppercase mb-2">AI Summary</h4>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="italic text-sm">{brief?.summary || 'No summary yet.'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-green-700">
          <strong>Next step:</strong> After submitting, your request will be shared with designers who match your style.
        </p>
      </div>
    </div>

    <div className="flex justify-between mt-8">
      <button onClick={onBack} className="bg-gray-200 text-black font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-gray-300 hover:shadow-md">Back</button>
      <button onClick={onNext} className="bg-primary text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">Submit Request</button>
    </div>
  </div>
);

const ConfirmationStep = ({ onBack }) => (
  <div className="text-center py-20">
    <div className="max-w-md mx-auto">
      <div className="mb-6 flex justify-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-green-600">check_circle</span>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-primary mb-4">Request Submitted!</h1>
      <p className="text-gray-700 mb-8">A designer will reach out to you soon. You can view the status of your request in your dashboard.</p>

      <button onClick={onBack} className="bg-primary text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">Back to Home</button>
    </div>
  </div>
);

export default CustomRequestPage;
