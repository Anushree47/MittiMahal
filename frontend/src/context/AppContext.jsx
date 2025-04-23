'use client'
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

 export const AppProvider = ({ children }) => {

   const token = localStorage.getItem("token");
   const [loggedIn, setLoggedIn] = useState(token ? true : false);
 const router = useRouter();

     const logout = () => {
         localStorage.removeItem("token");
        setLoggedIn(false);
        router.push("/login");
     };

     return (
         <AppContext.Provider value={{ loggedIn, setLoggedIn, logout }}>
             {children}
         </AppContext.Provider>
     );
};

 export default AppContext;

