'use client';
import React, { useState } from 'react';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Hardcoded admin credentials
  const hardcodedAdminCredentials = {
    username: 'admin',
    password: 'admin123'
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if entered credentials match the hardcoded values
    if (username === hardcodedAdminCredentials.username && password === hardcodedAdminCredentials.password) {
      // Redirect to admin dashboard
      window.location.href = '/admin-dashboard';
    } else {
      // Display error message if credentials are incorrect
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </div>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;