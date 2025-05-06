'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toastShowref = useRef(false);

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      router.push('/admin');
    }
    //pop up
    const showWelcomeMessage = searchParams.get('adminWelcome');
    if (showWelcomeMessage) {
      toast.success('Welcome to Admin Dashboard! Login to get access.');
    }
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, credentials);
      if (res.status === 200) {
        localStorage.setItem('adminToken', res.data.token);
        toast.success('Login successful');
        router.push('/admin');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold text-gray-800 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={credentials.email}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={credentials.password}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button type="submit" className="w-full py-2 text-white bg-gray-900 rounded-md hover:bg-gray-700">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
