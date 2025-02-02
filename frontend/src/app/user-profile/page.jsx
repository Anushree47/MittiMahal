import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const Profile = () => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/user/profile", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setForm(res.data);
        setOrders(res.data.orders);
        setWishlist(res.data.wishlist);
        setPreview(res.data.profilePic);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Please log in to access your profile!");
        router.push("/login");
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/user/profile", form, { withCredentials: true });
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile.");
    }
  };

  const handleWishlistRemove = async (id) => {
    try {
      await axios.delete(/api/user/wishlist/${id}, { withCredentials: true });
      setWishlist(wishlist.filter((item) => item._id !== id));
      toast.success("Item removed from wishlist!");
    } catch {
      toast.error("Failed to remove item.");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageSubmit = async () => {
    if (!image) return toast.error("Please select an image!");
    const formData = new FormData();
    formData.append("profilePic", image);

    try {
      const res = await axios.put("/api/user/upload-profile-pic", formData, { withCredentials: true });
      setPreview(res.data.profilePic);
      toast.success("Profile picture updated!");
    } catch {
      toast.error("Failed to upload image.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">User Profile</h2>

      {/* Profile Picture Upload */}
      <div className="text-center mb-4">
        <img src={preview || "/default-avatar.png"} alt="Profile Pic" className="w-24 h-24 rounded-full mx-auto" />
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2" />
        <button onClick={handleImageSubmit} className="btn mt-2">Upload</button>
      </div>

      {/* Profile Update Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block text-gray-600">Email (Read-only)</label>
          <input type="email" value={user.email} disabled className="input bg-gray-100 cursor-not-allowed" />
        </div>
        <div>
          <label className="block text-gray-600">Phone</label>
          <input type="text" name="phone" value={form.phone} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block text-gray-600">Address</label>
          <input type="text" name="address" value={form.address} onChange={handleChange} className="input" />
        </div>
        <button type="submit" className="btn">Update Profile</button>
      </form>

      {/* Wishlist Section */}
      <h3 className="text-lg font-semibold mt-6">Wishlist</h3>
      <ul>
        {wishlist.length === 0 ? (
          <p>No items in wishlist.</p>
        ) : (
          wishlist.map((item) => (
            <li key={item._id} className="flex justify-between items-center mt-2">
              <span>{item.name}</span>
              <button onClick={() => handleWishlistRemove(item._id)} className="text-red-500">Remove</button>
            </li>
          ))
        )}
      </ul>

      {/* Orders Section */}
      <h3 className="text-lg font-semibold mt-6">My Orders</h3>
      <ul>
        {orders.length === 0 ? (
          <p>No past orders.</p>
        ) : (
          orders.map((order) => (
            <li key={order._id} className="mt-2">
              <p>Order #{order._id} - {order.status}</p>
            </li>
          ))
        )}
      </ul>

      <div className="mt-4 text-center">
        <Link href="/">
          <a className="text-orange-500 hover:underline">Back to Home</a>
        </Link>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  if (!token) {
    return { redirect: { destination: "/login", permanent: false } };
  }
  return { props: {} };
}

export default Profile;