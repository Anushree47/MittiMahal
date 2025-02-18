// 'use client'
// import React from 'react'
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import AddressForm from '@/components/AddressForm';
// import { useParams } from 'next/navigation';

// const AddressPage = () => {
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
// const { id } = useParams();
//   useEffect(() => {
//     const fetchAddresses = async (e) => {
//       try {
//         const res = await axios.get(`http://localhost:5000/users/getbyid/${id}`); // Replace with actual user ID
//         setAddresses(res.data);
//       } catch (error) {
//         console.error('Failed to fetch addresses', error);
//       }
//     };
//     fetchAddresses();
//   }, []);

//   const handleAddAddress = async (address) => {
//     try {
//       const { data } = await axios.post('http://localhost:5000/address/add', { ...address, userId: {id} }); // Replace with actual user ID
//       setAddresses([...addresses, data]);
//     } catch (error) {
//       console.error('Failed to add address', error);
//     }
//   };

//   const handleEditAddress = async (address) => {
//     try {
//       const { data } = await axios.put('http://localhost:5000/address/update', address);
//       setAddresses(addresses.map((addr) => (addr._id === address._id ? data : addr)));
//     } catch (error) {
//       console.error('Failed to update address', error);
//     }
//   };

//   const handleDeleteAddress = async (id) => {
//     try {
//       await axios.delete('http://localhost:5000/address/delete', { data: { id } });
//       setAddresses(addresses.filter((address) => address._id !== id));
//     } catch (error) {
//       console.error('Failed to delete address', error);
//     }
//   };

//   return (
//     <div className="space-y-6 max-w-4xl mx-auto mt-12">
//       <h1 className="text-3xl font-bold text-center text-gray-900">Manage Your Addresses</h1>
//       <AddressForm onSubmit={handleAddAddress} existingAddress={selectedAddress} />

//       <h2 className="text-2xl font-semibold text-gray-800">Your Addresses</h2>

//       <div className="space-y-6">
//         {addresses.map((address) => (
//           <div key={address._id} className="p-6 bg-white shadow-lg rounded-lg">
//             <div>
//               <p className="font-semibold text-gray-800">{address.street}</p>
//               <p className="text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
//               <p className="text-gray-600">{address.country}</p>
//               <p className="text-gray-500">{address.isDefault ? 'Default Address' : 'Not Default'}</p>
//             </div>

//             <div className="mt-4 flex justify-between">
//               <button
//                 onClick={() => setSelectedAddress(address)}
//                 className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDeleteAddress(address._id)}
//                 className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AddressPage;

'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddressForm from '@/components/AddressForm';
import { useParams } from 'next/navigation';

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { id } = useParams(); // Get user ID from URL params

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/address/getbyid/${id}`, {
          headers: {
            'Authorization' : token
          }
        }); // Fetch user's addresses
        setAddresses(res.data);
      } catch (error) {
        console.error('Failed to fetch addresses', error);
      }
    };
    fetchAddresses();
  }, [id]);

  const handleAddAddress = async (address) => {
    try {
      const addressData = { ...address, userId: id }; // Include user ID
      const { data } = await axios.post('http://localhost:5000/address/add', addressData);
      setAddresses([...addresses, data]);
    } catch (error) {
      console.error('Failed to add address', error);
    }
  };

  const handleEditAddress = async (address) => {
    try {
      const { data } = await axios.put(`http://localhost:5000/address/update/${address._id}`, address);
      setAddresses(addresses.map((addr) => (addr._id === address._id ? data : addr)));
    } catch (error) {
      console.error('Failed to update address', error);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/address/delete/${id}`);
      setAddresses(addresses.filter((address) => address._id !== id));
    } catch (error) {
      console.error('Failed to delete address', error);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto mt-12">
      <h1 className="text-3xl font-bold text-center text-gray-900">Manage Your Addresses</h1>
      <AddressForm onSubmit={handleAddAddress} existingAddress={selectedAddress} />

      <h2 className="text-2xl font-semibold text-gray-800">Your Addresses</h2>

      <div className="space-y-6">
        {addresses.map((address) => (
          <div key={address._id} className="p-6 bg-white shadow-lg rounded-lg">
            <div>
              <p className="font-semibold text-gray-800">{address.street}</p>
              <p className="text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
              <p className="text-gray-600">{address.country}</p>
              <p className="text-gray-500">{address.isDefault ? 'Default Address' : 'Not Default'}</p>
            </div>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setSelectedAddress(address)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteAddress(address._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressPage;
