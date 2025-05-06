'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import Spinner from '@/components/Spinner'; 

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/loginForm');
    }
  }, [user, loading, router]);

  if (loading) {
    return <Spinner />;
  }

  return children;
};

export default PrivateRoute;
