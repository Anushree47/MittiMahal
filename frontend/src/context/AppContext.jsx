
// 'use client';
// import { createContext, useContext, useEffect, useState } from 'react';

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (userData) => {
//     localStorage.setItem('user', JSON.stringify(userData));
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     localStorage.removeItem('admin-token');
//     console.log('🔓 User logged out. Tokens removed from localStorage.');
//     setUser(null);
//   };

//   return (
//     <AppContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);
// export default useAppContext;


'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));

          // ✅ Log user details clearly in console
          console.log("🎯 User Logged In:");
          console.log("Name:", response.data.name);
          console.log("User ID:", response.data._id);
          console.log("Token:", token);
          
        } catch (error) {
          console.error('Failed to fetch user:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);

    console.log("🎯 User Logged In:");
    console.log("Name:", userData.name);
    console.log("User ID:", userData._id);
    console.log("Token:", localStorage.getItem('token'));
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('admin-token');
    console.log('🔓 User logged out. Tokens removed from localStorage.');
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export default useAppContext;
