'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const BackButton = () => {
  const router = useRouter();
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    // Check if the current path is the home page
    setIsHomePage(window.location.pathname === '/');
  }, []);

  if (isHomePage) {
    return null; // Don't render the Back button on the home page
  }

  return (
    <div className="text-center mt-4">
      <a
        onClick={() => router.back()}
        className="font-bold cursor-pointer text-gray-800 hover:text-gray-600 flex items-center justify-center"
      >
        <span className="mr-2">←</span> Back
      </a>
    </div>
  );
};

export default BackButton;