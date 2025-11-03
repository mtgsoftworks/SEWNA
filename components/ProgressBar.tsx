import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepName: string;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, stepName, className = '' }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex gap-6 justify-between">
        <p className="text-[#0c1d18] dark:text-white text-base font-medium leading-normal">
          Step {currentStep} of {totalSteps}: {stepName}
        </p>
      </div>
      <div className="rounded-full bg-primary/20 dark:bg-primary/30 h-2">
        <div
          className="h-2 rounded-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;