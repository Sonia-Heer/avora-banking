import React from "react";

type ProgressBarProps = {
  step: number;
  totalSteps?: number;
};

const ProgressBar = ({ step, totalSteps = 3 }: ProgressBarProps) => {
  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="relative flex flex-col justify-center items-center ">
      <div className="relative w-full h-1 bg-foreground rounded-full">
        {/* Filled Progress */}
        <div
          className="absolute top-0 left-0 h-1 bg-foreground rounded-full transition-all duration-300"
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
                ${isCompleted ? "bg-foreground text-white" : ""}
                ${
                  isActive
                    ? "border-2 border-foreground bg-white text-foreground"
                    : ""
                }
                ${
                  !isCompleted && !isActive
                    ? "bg-white border-2 border-foreground text-foreground"
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
