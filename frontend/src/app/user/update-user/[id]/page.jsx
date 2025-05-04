

'use client';
import { IconCheck, IconLoader3 } from '@tabler/icons-react';
import axios from 'axios';
import { Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const UpdateUser = () => {
    const { id } = useParams();
    const router = useRouter();
    
    const [userData, setUserData] = useState(null);

    const fetchUserData = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/users/getbyid/${id}`);
            setUserData(res.data);
        } catch (error) {
            toast.error('Failed to fetch user data');
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const submitForm = async (values) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URI}/users/update/${id}`, values);
            if (res.status === 200) {
                toast.success('User Updated Successfully');
                router.push('/user/dashboard');
            }
        } catch (error) {
            toast.error('Failed to update user');
        }
    };

    return (
        <div className='min-h-screen'>
            <div className="max-w-lg mx-auto mt-7 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                <h1 className="text-2xl font-bold text-center mb-5">Update User</h1>

                {userData === null ? (
                    <p className='text-center my-5 text-gray-500 font-bold text-2xl'>Loading, Please Wait...</p>
                ) : (
                    <Formik initialValues={userData} onSubmit={submitForm}>
                        {(updateForm) => (
                            <form onSubmit={updateForm.handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-lg mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        onChange={updateForm.handleChange}
                                        value={updateForm.values.name}
                                        className="w-full p-3 border rounded-lg"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        disabled
                                        value={updateForm.values.email}
                                        className="w-full p-3 border rounded-lg bg-gray-200"
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg mb-1">Phone</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        onChange={updateForm.handleChange}
                                        value={updateForm.values.phone}
                                        className="w-full p-3 border rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg mb-1">User Type</label>
                                    <select id="userType" onChange={updateForm.handleChange} value={updateForm.values.userType} className="w-full p-3 border rounded-lg">
                                        <option value="">Select User Type</option>
                                        <option value="Buyer">Buyer</option>
                                        <option value="Artisan">Artisan</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-lg mb-1">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        onChange={updateForm.handleChange}
                                        value={updateForm.values.city}
                                        className="w-full p-3 border rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg mb-1">State</label>
                                    <input
                                        type="text"
                                        id="state"
                                        onChange={updateForm.handleChange}
                                        value={updateForm.values.state}
                                        className="w-full p-3 border rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg mb-1">Pincode</label>
                                    <input
                                        type="text"
                                        id="pincode"
                                        onChange={updateForm.handleChange}
                                        value={updateForm.values.pincode}
                                        className="w-full p-3 border rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg mb-1">Profile Picture</label>
                                    <input type="file" onChange={(e) => updateForm.setFieldValue('imageUrl', e.target.files[0])} className="w-full p-3 border rounded-lg" />
                                </div>

                                <button
                                    type="submit"
                                    disabled={updateForm.isSubmitting}
                                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
                                >
                                    {updateForm.isSubmitting ? <IconLoader3 className='animate-spin inline-block' /> : <IconCheck />}
                                    {updateForm.isSubmitting ? 'Updating...' : 'Update User'}
                                </button>
                            </form>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    );
};

export default UpdateUser;
