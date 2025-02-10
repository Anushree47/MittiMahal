"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/product/getall")
      .then((res) => setProducts(res.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/product/delete/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Products</h1>
      <ul className="mt-4">
        {products.map((product) => (
          <li key={product._id} className="border p-2 flex justify-between">
            <div>
              <p>{product.name} - ${product.price}</p>
            </div>
            <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white p-1">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
