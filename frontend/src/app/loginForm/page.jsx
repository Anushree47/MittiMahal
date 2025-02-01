'use client';
import { IconCheck, IconLoader3 } from '@tabler/icons-react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast  from 'react-hot-toast';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const router = useRouter();

  const loginForm = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      axios.post('http://localhost:5000/users/authenticate', values)
        .then((result) => {
          const token = result.data.token;
          if (token) {
            localStorage.setItem('token', token);
            toast.success('User logged in successfully');
            resetForm();
            router.push('/');
          } else {
            toast.error('Login failed, token not received.');
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || 'Something went wrong');
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/full-bg-clay.jpg')" }}>
      <div className="w-full max-w-md p-8 bg-[#F4EAE0] border border-[#E07A5F] rounded-lg shadow-lg backdrop-blur-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#5E3B1C]">Welcome to Mitti Mahal</h1>
          <p className="mt-2 text-sm text-[#8B5E3C]">
            Don't have an account? <a href="/signupForm" className="text-[#E07A5F] hover:underline font-medium">Sign up here</a>
          </p>
        </div>

        <div className="mt-5">
          <button
            type="button"
            className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-[#8B5E3C] bg-white text-[#5E3B1C] shadow-sm hover:bg-[#F4EAE0] focus:outline-none"
          >
            <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
            Sign in with Google
          </button>
          <div className="py-3 flex items-center text-xs text-[#8B5E3C] uppercase before:flex-1 before:border-t before:border-[#E07A5F] after:flex-1 after:border-t after:border-[#E07A5F]">
            Or
          </div>

          <form onSubmit={loginForm.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-[#5E3B1C] mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                onChange={loginForm.handleChange}
                value={loginForm.values.email}
                className="w-full py-3 px-4 border border-[#8B5E3C] rounded-lg text-sm bg-white focus:ring-[#E07A5F] focus:border-[#E07A5F]"
              />
              {loginForm.errors.email && loginForm.touched.email && (
                <p className="text-xs text-red-600 mt-1">{loginForm.errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-[#5E3B1C] mb-2">Password</label>
              <input
                type="password"
                id="password"
                onChange={loginForm.handleChange}
                value={loginForm.values.password}
                className="w-full py-3 px-4 border border-[#8B5E3C] rounded-lg text-sm bg-white focus:ring-[#E07A5F] focus:border-[#E07A5F]"
              />
              {loginForm.errors.password && loginForm.touched.password && (
                <p className="text-xs text-red-600 mt-1">{loginForm.errors.password}</p>
              )}
            </div>

            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="text-[#E07A5F]" />
              <label htmlFor="remember-me" className="ml-2 text-sm text-[#5E3B1C]">Remember me</label>
            </div>

            <button
              type="submit"
              disabled={loginForm.isSubmitting}
              className="w-full py-3 px-4 flex items-center justify-center gap-2 text-sm font-medium text-white bg-[#E07A5F] rounded-lg hover:bg-[#D86B50] disabled:opacity-50"
            >
              {loginForm.isSubmitting ? <IconLoader3 className="animate-spin" /> : <IconCheck />}
              {loginForm.isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="text-center mt-4">
              <a href="/" className="text-[#8B5E3C] hover:underline text-sm">← Back to Home</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
