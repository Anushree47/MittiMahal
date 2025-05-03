





"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // for toggle icon
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminAuthProvider } from "@/context/AdminAuthContext";

const Layout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/admin-login");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/loginForm");
  };

  // if (loading) {
  //   return <div className="p-10 text-center">Checking authentication...</div>;
  // }

  return (
    <AdminAuthProvider>
      <div className="flex w-screen h-screen overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-gray-900 text-white p-5 flex flex-col gap-6 fixed top-0 left-0 h-full w-64 z-50 transform ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:flex`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <button
              onClick={() => setShowSidebar(false)}
              className="md:hidden text-white"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col gap-4">
            <Link
              href="/admin"
              className={`flex items-center gap-2 p-2 rounded ${
                pathname === "/admin"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              🏠 Dashboard
            </Link>
            <Link
              href="/admin/user-data"
              className={`flex items-center gap-2 p-2 rounded ${
                pathname === "/admin/user-data"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              👥 Manage Users
            </Link>
            <Link
              href="/admin/manage-product"
              className={`flex items-center gap-2 p-2 rounded ${
                pathname === "/admin/manage-product"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              📦 Manage Products
            </Link>
            <Link
              href="/admin/add-product"
              className={`flex items-center gap-2 p-2 rounded ${
                pathname === "/admin/add-product"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              ➕ Add Products
            </Link>
            <Link
              href="/admin/manage-order"
              className={`flex items-center gap-2 p-2 rounded ${
                pathname === "/admin/manage-order"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              📦 Manage Orders
            </Link>
            <Link
              href="/admin/contact-msg"
              className={`flex items-center gap-2 p-2 rounded ${
                pathname === "/admin/contact-msg"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              📬 Contact Requests
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded text-red-400"
            >
              🚪 Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-auto h-full">
          {/* Mobile Menu Button */}
          <div className="md:hidden p-4 flex items-center justify-between bg-gray-900 text-white">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <button
              onClick={() => setShowSidebar(true)}
              className="text-white"
            >
              <Menu size={26} />
            </button>
          </div>

          <main className="p-6">{children}</main>
        </div>
      </div>
    </AdminAuthProvider>
  );
};

export default Layout;
