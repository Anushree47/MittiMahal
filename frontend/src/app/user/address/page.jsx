// // Description: Address page for user to manage their addresses.
// 'use client';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import AddressForm from '@/components/AddressForm';
// import { useParams } from 'next/navigation';

// const AddressPage = () => {
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     // Retrieve token and decode user ID
//     const token = localStorage.getItem('token');
//     const userId = localStorage.getItem("userId"); // Ensure userId is retrieved
//     console.log("Token in localStorage:", localStorage.getItem("token"));


// console.log("User ID:", userId); // Debugging
//     if (!token) {
//       console.error("No token found in localStorage");
//       return;
//     }

//     try {
//       const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
//       console.log("Decoded Token:", decoded);
//       setUserId(decoded._id);
//     } catch (error) {
//       console.error("Error decoding token:", error);
//     }
//   }, []);

//   useEffect(() => {
//     if (!userId) {
//       console.error("User ID is missing, cannot fetch addresses.");
//       return;
//     }

//     const fetchAddresses = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get(`http://localhost:5000/address/getbyid/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setAddresses(res.data);
//       } catch (error) {
//         console.error("Error fetching addresses:", error);
//       }
//     };

//     fetchAddresses();
//   }, [userId]);

//   const handleAddAddress = async (address) => {
//     try {
//       const token = localStorage.getItem('token');
//       const addressData = { ...address, userId };

//       const res = await axios.post('http://localhost:5000/address/add', addressData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setAddresses([...addresses, res.data]);
//     } catch (error) {
//       console.error("Failed to add address:", error);
//     }
//   };

//   const handleEditAddress = async (address) => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.put(`http://localhost:5000/address/update/${address._id}`, address, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setAddresses(addresses.map((addr) => (addr._id === address._id ? res.data : addr)));
//     } catch (error) {
//       console.error("Failed to update address:", error);
//     }
//   };

//   const handleDeleteAddress = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:5000/address/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setAddresses(addresses.filter((address) => address._id !== id));
//     } catch (error) {
//       console.error("Failed to delete address:", error);
//     }
//   };

//   return (
//     <div className="space-y-6 max-w-4xl mx-auto mt-12">
//       <h1 className="text-3xl font-bold text-center text-gray-900">Manage Your Addresses</h1>
//       <AddressForm onSubmit={handleAddAddress} existingAddress={selectedAddress} />

//       <h2 className="text-2xl font-semibold text-gray-800">Your Addresses</h2>

//       <div className="space-y-6">
//         {addresses.length > 0 ? (
//           addresses.map((address) => (
//             <div key={address._id} className="p-6 bg-white shadow-lg rounded-lg">
//               <div>
//                 <p className="font-semibold text-gray-800">{address.street}</p>
//                 <p className="text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
//                 <p className="text-gray-600">{address.country}</p>
//                 <p className="text-gray-500">{address.isDefault ? 'Default Address' : 'Not Default'}</p>
//               </div>

//               <div className="mt-4 flex justify-between">
//                 <button
//                   onClick={() => setSelectedAddress(address)}
//                   className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteAddress(address._id)}
//                   className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-600 text-center">No addresses found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddressPage;
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddressForm from '@/components/AddressForm';
import { useRouter } from 'next/navigation';

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [userId, setUserId] = useState(null);
  const router = useRouter(); // Use Next.js router for navigation

  useEffect(() => {
    // Retrieve token and decode user ID
    const token = localStorage.getItem('token');

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      setUserId(decoded._id);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      console.error("User ID is missing, cannot fetch addresses.");
      return;
    }

    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/address/getbyid/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAddresses(res.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [userId]);

  const handleAddAddress = async (address) => {
    try {
      const token = localStorage.getItem('token');
      const addressData = { ...address, userId };

      const res = await axios.post('http://localhost:5000/address/add', addressData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAddresses([...addresses, res.data]);
    } catch (error) {
      console.error("Failed to add address:", error);
    }
  };

  const handleEditAddress = async (address) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:5000/address/update/${address._id}`, address, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAddresses(addresses.map((addr) => (addr._id === address._id ? res.data : addr)));
    } catch (error) {
      console.error("Failed to update address:", error);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/address/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAddresses(addresses.filter((address) => address._id !== id));
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  const handleConfirmOrder = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address!");
      return;
    }

    // Save selected address in localStorage to pass it to the next page
    localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));

    // Navigate to the Order Confirmation page
    router.push("/user/order");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto mt-12">
      <h1 className="text-3xl font-bold text-center text-gray-900">Select Your Delivery Address</h1>

      <AddressForm onSubmit={handleAddAddress} existingAddress={selectedAddress} />

      <h2 className="text-2xl font-semibold text-gray-800">Your Addresses</h2>

      <div className="space-y-6">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div
              key={address._id}
              className={`p-6 bg-white shadow-lg rounded-lg cursor-pointer ${
                selectedAddress?._id === address._id ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => setSelectedAddress(address)}
            >
              <div>
                <p className="font-semibold text-gray-800">{address.street}</p>
                <p className="text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                <p className="text-gray-600">{address.country}</p>
                <p className="text-gray-500">{address.isDefault ? 'Default Address' : 'Not Default'}</p>
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAddress(address);
                  }}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAddress(address._id);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No addresses found.</p>
        )}
      </div>

      {/* 🚀 Order Confirm Button */}
      <button
        onClick={handleConfirmOrder}
        className="w-full mt-4 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700"
      >
        Order Confirm
      </button>
    </div>
  );
};

export default AddressPage;
