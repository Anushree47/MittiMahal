'use client';
import React from 'react';

const Spinner = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-900"></div>
    </div>
  );
};

export default Spinner;
