'use client';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ManageUsers = () => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/users/getall');
            setUserList(res.data);
        } catch (error) {
            toast.error('Failed to fetch users');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            const res = await axios.delete(`http://localhost:5000/users/delete/${id}`);
            if (res.status === 200) {
                fetchUsers();
                toast.success('User Deleted Successfully');
            }
        } catch (error) {
            toast.error('Failed To Delete');
        }
    };

    return (
        <div className='min-h-screen bg-gray-100 p-6'>
            <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>Manage Users</h1>
            <div className='container mx-auto bg-white shadow-lg rounded-lg p-4'>
                {loading ? (
                    <p className='text-center text-gray-500 text-2xl font-bold'>Loading... Please Wait</p>
                ) : (
                    <div className='overflow-x-auto'>
                        <table className='w-full border-collapse border border-gray-300'>
                            <thead className='bg-gray-700 text-white'>
                                <tr>
                                    <th className='p-3 border'>ID</th>
                                    <th className='p-3 border'>Name</th>
                                    <th className='p-3 border'>Email</th>
                                    <th className='p-3 border'>Phone</th>
                                    <th className='p-3 border'>City</th>
                                    <th className='p-3 border'>State</th>
                                    <th className='p-3 border'>Pincode</th>
                                    <th className='p-3 border'>User Type</th>
                                    <th className='p-3 border'>Profile Picture</th>
                                    <th className='p-3 border'>Delete</th>
                                    <th className='p-3 border'>Update</th>
                                </tr>
                            </thead>
                            <tbody className='bg-gray-50'>
                                {userList.map((user) => (
                                    <tr key={user._id} className='border-b hover:bg-gray-100'>
                                        <td className='p-3 border'>{user._id}</td>
                                        <td className='p-3 border'>{user.name}</td>
                                        <td className='p-3 border'>{user.email}</td>
                                        <td className='p-3 border'>{user.phone}</td>
                                        <td className='p-3 border'>{user.city}</td>
                                        <td className='p-3 border'>{user.state}</td>
                                        <td className='p-3 border'>{user.pincode}</td>
                                        <td className='p-3 border'>{user.userType}</td>
                                        <td className='p-3 border'> <img src={user.imageUrl} alt="" />
                                        </td>
                                        <td className='p-3 border text-center'>
                                            <button
                                                onClick={() => deleteUser(user._id)}
                                                className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition'
                                            >
                                                <IconTrash size={20} />
                                            </button>
                                        </td>
                                        <td className='p-3 border text-center'>
                                            <Link
                                                href={`/update-user/${user._id}`}
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

export default ManageUsers;