import React from "react";

type ProgressBarProps = {
  step: number; // current step (1–4)
  totalSteps?: number; // default to 4
};

const ProgressBar = ({ step, totalSteps = 3 }: ProgressBarProps) => {
  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="relative flex flex-col justify-center items-center ">
      {/* Progress Track */}
      <div className="relative w-full h-1 bg-gray-300 rounded-full">
        {/* Filled Progress */}
        <div
          className="absolute top-0 left-0 h-1 bg-green-900 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Markers */}
      <ul className="absolute top-[-14px] flex justify-between w-full">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1;
          const isCompleted = stepNumber < step;
          const isActive = stepNumber === step;

          return (
            <li
              key={stepNumber}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300
                ${isCompleted ? "bg-green-900 text-white" : ""}
                ${
                  isActive
                    ? "border-2 border-green-100 bg-white text-green-600"
                    : ""
                }
                ${
                  !isCompleted && !isActive
                    ? "bg-white border-2 border-gray-300 text-gray-400"
                    : ""
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
