import React from "react";

type ProgressBarProps = {
  step: number;
  totalSteps?: number;
};

const ProgressBar = ({ step, totalSteps = 3 }: ProgressBarProps) => {
  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Background line */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 rounded-full -translate-y-1/2">
        {/* Progress line */}
        <div
          className="h-1 bg-foreground rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps */}
      <ul className="relative flex justify-between w-full">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1;
          const isCompleted = stepNumber < step;
          const isActive = stepNumber === step;

          return (
            <li
              key={stepNumber}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium z-10 transition-all duration-300
                ${
                  isCompleted
                    ? "bg-foreground text-white border border-foreground"
                    : isActive
                    ? "bg-white border-2 border-foreground text-foreground"
                    : "bg-white border-2 border-gray-300 text-gray-400"
                }
              `}
            >
              {stepNumber}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProgressBar;
