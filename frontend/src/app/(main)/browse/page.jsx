'use client';

import { Suspense } from 'react';
import Card from '@/components/Card';
import SearchFilterComponent from './SearchFilterComponent';
import { useProducts } from '@/hooks/useProducts';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-900"></div>
    </div>
  );
}

export default function BrowsePage() {
  const { products, isLoading } = useProducts();

  return (
    <div className='min-h-screen p-8 bg-gray-100'>
      <h1 className='text-3xl font-bold text-center text-[#5a3e2b] mb-8'>
        Our Exclusive Clay Products
      </h1>

      <Suspense fallback={<LoadingSpinner />}>
        <SearchFilterComponent />
      </Suspense>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8'>
          {products.map((product) => (
            <Card
              key={product._id}
              id={product._id}
              title={product.title}
              price={product.price}
              images={product.images[0]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
