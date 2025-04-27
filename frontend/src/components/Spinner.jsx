'use client';
import React from 'react';

const Spinner = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="relative">
        <div className="w-20 h-20 border-8 border-yellow-500 border-t-transparent rounded-full animate-spin" style={{ animationDuration: '1s' }}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-yellow-900 font-bold text-base">..</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
