"use client";
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { id } = useParams();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios.get("http://localhost:5000/users/authenticate", { headers: { Authorization: `Bearer ${token}` } })
      .then(response => setUser(response.data))
      .catch(() => localStorage.removeItem("token"));
  }, []);

  // const login = async (email, password) => {
  //     const { data } = await axios.post("http://localhost:5000/users/login", { email, password });
  //     localStorage.setItem("token", data.token);
  //     setUser(data.user);
  //     router.push(`user/dashboard/${id}`);
  // };
  const login = async (email, password) => {
    try {
      const { data } = await axios.post("http://localhost:5000/users/getall", { email, password });
      console.log("User Logged In:", data);

      localStorage.setItem("token", data.token);
      setUser(data.user);

      router.push('/dashboard'); // Fix redirection
    } catch (error) {
      console.error("Auth Login Error:", error);
      toast.error("Login failed");
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default useAuth;