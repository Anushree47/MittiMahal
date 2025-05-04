'use client';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ManageProduct = () => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const { isAuthenticated } = useAdminAuth();
    

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/product/getall`);
            setProductList(res.data);
        } catch (error) {
            toast.error('Failed to fetch products');
        }
        setLoading(false);
    };

    if (!isAuthenticated) {
        return <div className='p-10 text-center'>You are not authorized to view this page.</div>;
    }


    useEffect(() => {
        
    }, []);

    const deleteProduct = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URI}/product/delete/${id}`);
            if (res.status === 200) {
                fetchProducts();
                toast.success('Product Deleted Successfully');
            }
        } catch (error) {
            toast.error('Failed To Delete');
        }
    };

    return (
        <div className='min-h-screen bg-gray-100 p-6'>
            <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>Manage Products</h1>
            <div className='container mx-auto bg-white shadow-lg rounded-lg p-4'>
                {loading ? (
                    <p className='text-center text-gray-500 text-2xl font-bold'>Loading... Please Wait</p>
                ) : (
                    <div className='overflow-x-auto'>
                        <table className='w-full border-collapse border border-gray-300'>
                            <thead className='bg-gray-700 text-white'>
                                <tr>
                                    <th className='p-3 border'>ID</th>
                                    <th className='p-3 border'>Title</th>
                                    <th className='p-3 border'>Category</th>
                                    <th className='p-3 border'>Price</th>
                                    <th className='p-3 border'>Description</th>
                                    <th className='p-3 border'>Images</th>
                                    <th className='p-3 border'>Delete</th>
                                    <th className='p-3 border'>Update</th>
                                </tr>
                            </thead>
                            <tbody className='bg-gray-50'>
                                {productList.map((product) => (
                                    <tr key={product._id} className='border-b hover:bg-gray-100'>
                                        <td className='p-3 border'>{product._id}</td>
                                        <td className='p-3 border'>{product.title}</td>
                                        <td className='p-3 border'>{product.category}</td>
                                        <td className='p-3 border'>${product.price}</td>
                                        <td className='p-3 border'>{product.description?.substring(0, 30)}...</td>
                                        <td className='p-3 border'>
                                            <div className='flex flex-wrap gap-2'>
                                                {product.images.map((img, index) => (
                                                    <img 
                                                        key={index} 
                                                        src={img} 
                                                        alt='Product' 
                                                        className='h-16 w-16 object-cover rounded-md border' 
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                        <td className='p-3 border text-center'>
                                            <button
                                                onClick={() => deleteProduct(product._id)}
                                                className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition'
                                            >
                                                <IconTrash size={20} />
                                            </button>
                                        </td>
                                            <td className='p-3 border text-center'>
                                            <Link
                                                href={`/admin/update-product/${product._id}`}
                                                className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition'
                                            >
                                                <IconPencil size={20} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageProduct;