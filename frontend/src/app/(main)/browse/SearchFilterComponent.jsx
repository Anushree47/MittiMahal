'use client';

import { IconSearch } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

const categories = [
  'All',
  'Home Decor',
  'Kitchen and Dining',
  'Garden Essentials',
  'Toy and Miniature',
  'Custom and Personalized Item',
  'Art and Craft Supplies'
];

export default function SearchFilterComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const [searchTerm, setSearchTerm] = useState(searchParams?.get('search') || '');
  const currentCategory = searchParams?.get('category') || 'All';

  const handleSearch = (e) => {
    e.preventDefault();
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm) {
        params.set('search', searchTerm);
      } else {
        params.delete('search');
      }
      router.push(`/browse?${params.toString()}`);
    });
  };

  const handleCategoryChange = (category) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (category !== 'All') {
        params.set('category', category);
      } else {
        params.delete('category');
      }
      if (searchTerm) params.set('search', searchTerm);
      router.push(`/browse?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="relative w-full max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pr-16 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-600"
        />
        <button 
          type="submit"
          disabled={isPending}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-900 text-white px-5 py-2 rounded-full flex items-center gap-1 hover:bg-yellow-600 disabled:opacity-50"
        >
          <IconSearch /> Search
        </button>
      </form>

      <div className="flex justify-center">
        <select
          value={currentCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          disabled={isPending}
          className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 bg-white text-gray-700 disabled:opacity-50"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}