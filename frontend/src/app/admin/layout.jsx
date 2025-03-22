
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  
  const router = useRouter();
  const pathname = usePathname();

  

  return (
    <div className="flex w-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5 flex flex-col gap-6 h-full fixed top-0 left-0">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/admin" className={`flex items-center gap-2 p-2 rounded ${pathname === "/admin" ? "bg-gray-700" : "hover:bg-gray-700"}`}>
            🏠 Dashboard
          </Link>
          <Link href="/admin/user-data" className={`flex items-center gap-2 p-2 rounded ${pathname === "/admin/user-data" ? "bg-gray-700" : "hover:bg-gray-700"}`}>
            👥 Manage Users
          </Link>
          <Link href="/admin/manage-product" className={`flex items-center gap-2 p-2 rounded ${pathname === "/admin/manage-order" ? "bg-gray-700" : "hover:bg-gray-700"}`}>
            📦 Manage Products
          </Link>
          <Link href="/admin/manage-order" className={`flex items-center gap-2 p-2 rounded ${pathname === "/admin/manage-order" ? "bg-gray-700" : "hover:bg-gray-700"}`}>
            📦 Manage Orders
          </Link>
          <button 
            onClick={() => { 
              localStorage.removeItem("token"); 
              router.push("/loginForm"); 
            }} 
            className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded text-red-400"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main Content (scrollable) */}
      <main className="flex-1 p-6 ml-64 overflow-auto h-screen">{children}</main>
    </div>
  );
};

export default Layout;
