
// 'use client'
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { useParams } from "next/navigation";

// const AddressPage = () => {
//   const [addresses, setAddresses] = useState([]);
//   const [user, setUser] = useState({ name: "", phone: "", email: "" });
//   const [form, setForm] = useState({
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     country: "India",
//   });

//   const { id } = useParams();

//   useEffect(() => {
//     fetchUser();
//     fetchAddresses();
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/users/getbyid/${id}`);
//       setUser(res.data);
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };

//   const fetchAddresses = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/Address/get/${id}`);
//       setAddresses(res.data);
//     } catch (error) {
//       console.error("Error fetching addresses:", error);
//     }
//   };

//   const handleDeleteAddress = async (addressId) => {
//     if (!confirm("Are you sure you want to delete this address?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/Address/delete/${addressId}`);
//       toast.success("Address deleted successfully");
//       fetchAddresses();
//     } catch (error) {
//       toast.error("Failed to delete address");
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/Address/add", { ...form, userId: id });
//       toast.success("Address added successfully");
//       setForm({ addressLine1: "", addressLine2: "", city: "", state: "", postalCode: "", country: "India" });
//       fetchAddresses();
//     } catch (error) {
//       toast.error("Failed to add address");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-semibold mb-4">Manage Addresses</h1>
//       <p><strong>Name:</strong> {user.name}</p>
//       <p><strong>Phone:</strong> {user.phone}</p>
//       <p><strong>Email:</strong> {user.email}</p>

//       {addresses.length > 0 ? (
//         <div className="space-y-4">
//           {addresses.map((address) => (
//             <div key={address._id} className={`border p-4 rounded-md ${address.isSelected ? "border-green-500" : "border-gray-300"}`}>
//               <p>{address.addressLine1}, {address.addressLine2}, {address.city}, {address.state}, {address.postalCode}, {address.country}</p>
//               <div className="mt-2 flex gap-4">
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleSelectAddress(address._id)}>Select</button>
//                 <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDeleteAddress(address._id)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No addresses saved. Add a new one below.</p>
//       )}
//       <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md mt-6">
//         <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
//         <input type="text" name="addressLine1" value={form.addressLine1} onChange={handleChange} placeholder="Address Line 1" className="border p-2 w-full rounded mb-2" required />
//         <input type="text" name="addressLine2" value={form.addressLine2} onChange={handleChange} placeholder="Address Line 2" className="border p-2 w-full rounded mb-2" />
//         <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="City" className="border p-2 w-full rounded mb-2" required />
//         <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="State" className="border p-2 w-full rounded mb-2" required />
//         <input type="text" name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Postal Code" className="border p-2 w-full rounded mb-2" required />
//         <input type="text" name="country" value={form.country} onChange={handleChange} placeholder="Country" className="border p-2 w-full rounded mb-2" required />
//         <button className="bg-green-500 text-white px-6 py-2 mt-4 rounded">Save Address</button>
//       </form>
//     </div>
//   );
// };
// export default AddressPage;
// 'use client'
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { useParams } from "next/navigation";

// const AddressPage = () => {
//   const [addresses, setAddresses] = useState([]);
//   const [user, setUser] = useState({ name: "", phone: "", email: "" });
//   const [form, setForm] = useState({
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     country: "India",
//   });

//   const { id } = useParams();

//   useEffect(() => {
//     fetchUser();
//     fetchAddresses();
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/users/getbyid/${id}`);
//       setUser(res.data);
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };

//   const fetchAddresses = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/Address/get/${id}`);
//       setAddresses(res.data);
//     } catch (error) {
//       console.error("Error fetching addresses:", error);
//     }
//   };

//   const handleDeleteAddress = async (addressId) => {
//     if (!confirm("Are you sure you want to delete this address?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/Address/delete/${addressId}`);
//       toast.success("Address deleted successfully");
//       fetchAddresses();
//     } catch (error) {
//       toast.error("Failed to delete address");
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/Address/add", { ...form, userId: id });
//       toast.success("Address added successfully");
//       setForm({ addressLine1: "", addressLine2: "", city: "", state: "", postalCode: "", country: "India" });
//       fetchAddresses();
//     } catch (error) {
//       toast.error("Failed to add address");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-semibold mb-4">Manage Addresses</h1>
//       <p><strong>Name:</strong> {user.name}</p>
//       <p><strong>Phone:</strong> {user.phone}</p>
//       <p><strong>Email:</strong> {user.email}</p>

//       {addresses.length > 0 ? (
//         <div className="space-y-4">
//           {addresses.map((address) => (
//             <div key={address._id} className={`border p-4 rounded-md ${address.isSelected ? "border-green-500" : "border-gray-300"}`}>
//               <p>{address.addressLine1}, {address.addressLine2}, {address.city}, {address.state}, {address.postalCode}, {address.country}</p>
//               <div className="mt-2 flex gap-4">
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleSelectAddress(address._id)}>Select</button>
//                 <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDeleteAddress(address._id)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No addresses saved. Add a new one below.</p>
//       )}
//       <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md mt-6">
//         <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
//         <input type="text" name="addressLine1" value={form.addressLine1} onChange={handleChange} placeholder="Address Line 1" className="border p-2 w-full rounded mb-2" required />
//         <input type="text" name="addressLine2" value={form.addressLine2} onChange={handleChange} placeholder="Address Line 2" className="border p-2 w-full rounded mb-2" />
//         <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="City" className="border p-2 w-full rounded mb-2" required />
//         <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="State" className="border p-2 w-full rounded mb-2" required />
//         <input type="text" name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Postal Code" className="border p-2 w-full rounded mb-2" required />
//         <button className="bg-green-500 text-white px-6 py-2 mt-4 rounded">Save Address</button>
//       </form>
//     </div>
//   );
// };
// export default AddressPage;
// 'use client'
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { useParams } from "next/navigation";

// const AddressPage = () => {
//   const [addresses, setAddresses] = useState([]);
//   const [user, setUser] = useState({ name: "", phone: "", email: "" });
//   const [form, setForm] = useState({
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     country: "India",
//   });

//   const { id } = useParams();

//   useEffect(() => {
//     fetchUser();
//     fetchAddresses();
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/users/getbyid/${id}`);
//       setUser(res.data);
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };

//   const fetchAddresses = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/Address/get/${id}`);
//       setAddresses(res.data);
//     } catch (error) {
//       console.error("Error fetching addresses:", error);
//     }
//   };

//   const handleSelectAddress = async (addressId) => {
//     try {
//       await axios.patch(`http://localhost:5000/Address/select/${addressId}`, { userId: id });
//       toast.success("Address selected successfully");
//       fetchAddresses();
//     } catch (error) {
//       toast.error("Failed to select address");
//     }
//   };

//   const handleDeleteAddress = async (addressId) => {
//     if (!confirm("Are you sure you want to delete this address?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/Address/delete/${addressId}`);
//       toast.success("Address deleted successfully");
//       fetchAddresses();
//     } catch (error) {
//       toast.error("Failed to delete address");
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/Address/add", { ...form, userId: id });
//       toast.success("Address added successfully");
//       setForm({ addressLine1: "", addressLine2: "", city: "", state: "", postalCode: "", country: "India" });
//       fetchAddresses();
//     } catch (error) {
//       toast.error("Failed to add address");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-semibold mb-4">Manage Addresses</h1>
//       <p><strong>Name:</strong> {user.name}</p>
//       <p><strong>Phone:</strong> {user.phone}</p>
//       <p><strong>Email:</strong> {user.email}</p>

//       {addresses.length > 0 ? (
//         <div className="space-y-4">
//           {addresses.map((address) => (
//             <div key={address._id} className={`border p-4 rounded-md ${address.isSelected ? "border-green-500" : "border-gray-300"}`}>
//               <p>{address.addressLine1}, {address.addressLine2}, {address.city}, {address.state}, {address.postalCode}, {address.country}</p>
//               <div className="mt-2 flex gap-4">
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleSelectAddress(address._id)}>Select</button>
//                 <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDeleteAddress(address._id)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No addresses saved. Add a new one below.</p>
//       )}
//       <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md mt-6">
//         <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
//         <input type="text" name="addressLine1" value={form.addressLine1} onChange={handleChange} placeholder="Address Line 1" className="border p-2 w-full rounded mb-2" required />
//         <input type="text" name="addressLine2" value={form.addressLine2} onChange={handleChange} placeholder="Address Line 2" className="border p-2 w-full rounded mb-2" />
//         <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="City" className="border p-2 w-full rounded mb-2" required />
//         <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="State" className="border p-2 w-full rounded mb-2" required />
//         <input type="text" name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Postal Code" className="border p-2 w-full rounded mb-2" required />
//         <button className="bg-green-500 text-white px-6 py-2 mt-4 rounded">Save Address</button>
//       </form>
//     </div>
//   );
// };
// export default AddressPage;
'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [user, setUser] = useState({ name: "", phone: "", email: "" });
  const [form, setForm] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
    fetchAddresses();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/users/getbyid/${id}`);
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/Address/get/${id}`);
      setAddresses(res.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleSelectAddress = async (addressId) => {
    try {
      await axios.patch(`http://localhost:5000/Address/select/${addressId}`, { userId: id });
      toast.success("Address selected successfully");
      setSelectedAddress(addressId);
      fetchAddresses();
    } catch (error) {
      toast.error("Failed to select address");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      await axios.delete(`http://localhost:5000/Address/delete/${addressId}`);
      toast.success("Address deleted successfully");
      fetchAddresses();
    } catch (error) {
      toast.error("Failed to delete address");
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setForm({
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
    });
  };

  const handleProceedToCheckout = () => {
    if (!selectedAddress) {
      toast.error("Please select an address before proceeding.");
      return;
    }
    router.push(`/user/order?addressId=${selectedAddress}`);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAddress) {
        await axios.patch(`http://localhost:5000/Address/update/${editingAddress._id}`, form);
        toast.success("Address updated successfully");
        setEditingAddress(null);
      } else {
        await axios.post("http://localhost:5000/Address/add", { ...form, userId: id });
        toast.success("Address added successfully");
      }
      setForm({ addressLine1: "", addressLine2: "", city: "", state: "", postalCode: "", country: "India" });
      fetchAddresses();
    } catch (error) {
      toast.error("Failed to save address");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Manage Addresses</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Email:</strong> {user.email}</p>

      {addresses.length > 0 ? (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address._id} className={`border p-4 rounded-md ${address.isSelected ? "border-green-500" : "border-gray-300"}`}>
              <p>{address.addressLine1}, {address.addressLine2}, {address.city}, {address.state}, {address.postalCode}, {address.country}</p>
              <div className="mt-2 flex gap-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleSelectAddress(address._id)}>Select</button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => handleEditAddress(address)}>Edit</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDeleteAddress(address._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No addresses saved. Add a new one below.</p>
      )}
      <button className="bg-purple-600 text-white px-6 py-2 mt-4 rounded w-full" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">{editingAddress ? "Edit Address" : "Add New Address"}</h2>
        <input type="text" name="addressLine1" value={form.addressLine1} onChange={handleChange} placeholder="Address Line 1" className="border p-2 w-full rounded mb-2" required />
        <input type="text" name="addressLine2" value={form.addressLine2} onChange={handleChange} placeholder="Address Line 2" className="border p-2 w-full rounded mb-2" />
        <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="City" className="border p-2 w-full rounded mb-2" required />
        <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="State" className="border p-2 w-full rounded mb-2" required />
        <input type="text" name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Postal Code" className="border p-2 w-full rounded mb-2" required />
        <button className="bg-green-500 text-white px-6 py-2 mt-4 rounded">{editingAddress ? "Update Address" : "Save Address"}</button>
      </form>
    </div>
  );
};
export default AddressPage;
