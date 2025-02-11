// import Link from "next/link";

// export default function AdminLayout({ children }) {
//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div className="w-1/4 min-h-screen bg-gradient-to-r from-[#7F5539] to-[#E6CCB2] text-black p-4">
//         <h2 className="text-3xl font-bold mb-4">Admin Panel</h2>
//         <ul className="space-y-2 text-lg ">
//           <li className="hover:underline"><Link href="/admin/add-product">Add Product</Link></li>
//           <li className="hover:underline"><Link href="/admin/manage-products">Manage Products</Link></li>
//           <li className="hover:underline"><Link href="/admin/manage-orders">Manage Orders</Link></li>
//           <li className="hover:underline"><Link href="/admin/admin-profile">Profile</Link></li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="w-3/4 p-6">
//         {children}
//       </div>
//     </div>
//   );
// }

"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  // const [adminData, setAdminData] = useState(null);
  // const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   const fetchAdminData = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.get("http://localhost:5000/users/get", {
  //         headers: { "x-auth-token": token },
  //       });
  //       if (response.data.role !== "admin") {
  //         toast.error("Unauthorized Access");
  //         router.push("/");
  //       } else {
  //         setAdminData(response.data);
  //       }
  //     } catch (error) {
  //       toast.error("Failed to fetch admin data");
  //       router.push("/loginForm");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAdminData();
  // }, [router]);

  // if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="flex w-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5 flex flex-col gap-6 h-screen">
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

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default Layout;
