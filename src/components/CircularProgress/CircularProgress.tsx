import React from 'react';

interface CircularProgressProps {
  percentage: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
  return (
    <div className="relative w-16 h-16">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          className="text-gray-300"
          strokeWidth="3.8"
          fill="none"
          strokeDasharray="100, 100"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="text-blue-500"
          strokeWidth="3.8"
          fill="none"
          strokeDasharray={`${percentage}, 100`} 
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-gray-700 font-semibold text-sm">{percentage.toFixed(0)}%</span>
    </div>
  );
};

export default CircularProgress;