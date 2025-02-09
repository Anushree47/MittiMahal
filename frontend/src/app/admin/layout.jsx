import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 min-h-screen bg-gradient-to-r from-[#7F5539] to-[#E6CCB2] text-black p-4">
        <h2 className="text-3xl font-bold mb-4">Admin Panel</h2>
        <ul className="space-y-2 text-lg ">
          <li className="hover:underline"><Link href="/admin/add-product">Add Product</Link></li>
          <li className="hover:underline"><Link href="/admin/manage-products">Manage Products</Link></li>
          <li className="hover:underline"><Link href="/admin/manage-orders">Manage Orders</Link></li>
          <li className="hover:underline"><Link href="/admin/admin-profile">Profile</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        {children}
      </div>
    </div>
  );
}

