"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddressPage = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ street: "", city: "", state: "", zip: "", country: "" });
    const [editingId, setEditingId] = useState(null); // Store ID of the address being edited
    const router = useRouter();

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/loginForm");
            return;
        }

        // try {
        //     const { data } = await axios.get("http://localhost:5000/Address/get",
        //     );

        //     setAddresses(data);
        // } catch (error) {
        //     console.error("Error fetching addresses:", error.response?.data?.message);
        //     if (error.response?.status === 401) {
        //         localStorage.removeItem("token");
        //         router.push("/loginForm");
        //     }
        // } finally {
        //     setLoading(false);
        // }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/loginForm");
            return;
        }

        try {
            if (editingId) {
                // Update existing address
                await axios.put(`http://localhost:5000/Address/${editingId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                // Add new address
                await axios.post("http://localhost:5000/Address/add", formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }

            fetchAddresses();
            setFormData({ street: "", city: "", state: "", zip: "", country: "" });
            setEditingId(null);
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong.");
        }
    };

    const handleEdit = (address) => {
        setEditingId(address._id);
        setFormData(address);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/loginForm");
            return;
        }

        if (!confirm("Are you sure you want to delete this address?")) return;

        try {
            await axios.delete(`http://localhost:5000/Address/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            fetchAddresses();
        } catch (error) {
            console.error("Error deleting address:", error.response?.data?.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Your Addresses</h1>

            {/* Address Form */}
            <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded-lg">
                {error && <p className="text-red-500">{error}</p>}

                <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="text" name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required className="w-full p-2 border rounded" />

                <button type="submit" className="bg-yellow-600 text-white p-2 rounded w-full">
                    {editingId ? "Update Address" : "Add Address"}
                </button>
            </form>

            {/* Address List */}
            {loading ? (
                <p>Loading addresses...</p>
            ) : addresses.length > 0 ? (
                <ul className="mt-4 space-y-3">
                    {addresses.map((address) => (
                        <li key={address._id} className="border p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{address.street}, {address.city}, {address.state} - {address.zip}</p>
                                <p className="text-gray-600">{address.country}</p>
                            </div>
                            <div className="space-x-2">
                                <button onClick={() => handleEdit(address)} className="text-blue-500">Edit</button>
                                <button onClick={() => handleDelete(address._id)} className="text-red-500">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No addresses found.</p>
            )}
        </div>
    );
};

export default AddressPage;
