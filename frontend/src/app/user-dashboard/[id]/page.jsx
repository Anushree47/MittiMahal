// 'use client'

// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import React from "react";
// import toast from "react-hot-toast";

// const UserDashboard = () => {
//     const [userList, setUserList] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const router = useRouter();

//     const fetchUsers = async () => {
//         setLoading(true);
//         try {
//             const res = await axios.get(`http://localhost:5000/users/getallgetbyid/${id}`);
//             setUserList(res.data);
//         } catch (error) {
//             toast.error('Failed to fetch users');
//         }
//         setLoading(false);
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

// //   if (!user) return <p>Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-semibold mb-4">User Dashboard</h2>

//         {/* Tabs */}
//         <div className="flex space-x-4 border-b mb-4">
//           {["profile", "wishlist", "cart", "orders"].map((tab) => (
//             <button
//               key={tab}
//               className={"p-2 text-sm"}
//                 // activeTab === tab
//                 //   ? "border-b-2 border-indigo-600 font-semibold"
//                 //   : "text-gray-600"
              
//             //   onClick={() => setActiveTab(tab)}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Active Section */}
//         {/* {activeTab === "profile" />}
//         {activeTab === "wishlist"  />}
//         {activeTab === "cart" && <Cart />}
//         {activeTab === "orders"  />} */}
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;

'use client'

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                // Fetch logged-in user details (assuming the user ID is stored in localStorage/session or obtained from context)
                const userId = localStorage.getItem("userId"); // Replace this with your auth system
                console.log(userId);
                
                if (!userId) {
                    toast.error("User not found. Please log in.");
                    router.push("/loginForm");
                    return;
                }

                const res = await axios.get(`http://localhost:5000/users/${userId}`);
                setUser(res.data);
            } catch (error) {
                toast.error("Failed to fetch user details");
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>User not found.</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">User Dashboard</h2>

                {/* User Info */}
                <div className="mb-6">
                    <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
                    <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 border-b mb-4">
                    {["Profile", "Wishlist", "Cart", "Orders"].map((tab) => (
                        <button
                            key={tab}
                            className="p-2 text-sm text-gray-600 cursor-default"
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Dummy Sections */}
                <div className="p-4 bg-gray-50 rounded">
                    <p className="text-gray-500">Select a tab to view details (Functionality not added yet).</p>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;