'use client';
import { IconCheck, IconLoader3 } from '@tabler/icons-react';
import axios from 'axios';
import { Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const UpdateProduct = () => {
    const { id } = useParams();
    const router = useRouter();
    
    const [productData, setProductData] = useState(null);

    const fetchProductData = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/product/getbyid/${id}`);
            setProductData(res.data);
        } catch (error) {
            toast.error('Failed to fetch product data');
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [id]);

    const uploadImages = async (e, updateForm) => {
        const files = e.target.files;
        if (!files.length) return;

        const uploadedImages = [];
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
            formData.append('upload_preset', 'anupreset47');
            formData.append('cloud_name', 'du4tklzpq');

            try {
                const res = await axios.post('https://api.cloudinary.com/v1_1/du4tklzpq/image/upload', formData);
                if (res.status === 200) {
                    uploadedImages.push(res.data.url);
                }
            } catch (error) {
                toast.error('Failed to upload image');
                return;
            }
        }

        updateForm.setFieldValue('images', [...updateForm.values.images, ...uploadedImages]);
        toast.success('Images uploaded successfully');
    };

    const submitForm = async (values) => {
        try {
            const res = await axios.put(`http://localhost:5000/product/update/${id}`, values);
            if (res.status === 200) {
                toast.success('Product Updated Successfully');
                router.push('/admin/manage-product');
            }
        } catch (error) {
            toast.error('Failed to update product');
        }
    };

    return (
        <div className='min-h-screen'>
            <div className="max-w-lg mx-auto mt-7 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                <h1 className="text-2xl font-bold text-center mb-5">Update Product</h1>

                {productData === null ? (
                    <p className='text-center my-5 text-gray-500 font-bold text-2xl'>Loading, Please Wait...</p>
                ) : (
                    <Formik initialValues={productData} onSubmit={submitForm}>
                        {(updateForm) => (
                            <form onSubmit={updateForm.handleSubmit} className="space-y-4">
                                {/* Title */}
                                <div>
                                    <label className="block text-lg mb-1">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        onChange={updateForm.handleChange}
                                        value={updateForm.values.title}
                                        className="w-full p-3 border rounded-lg"
                                        required
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-lg mb-1">Category</label>
                                    <input
                                        type="text"
                                        id="category"
                                        onChange={updateForm.handleChange}
                                        value={updateForm.values.category}
                                        className="w-full p-3 border rounded-lg"
                                        required
                                    />
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-lg mb-1">Price</label>
                                    <input
                                        type="number"
                                        id="price"
                                        onChange={updateForm.handleChange}
                                        value={updateForm.values.price}
                                        className="w-full p-3 border rounded-lg"
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-lg mb-1">Description</label>
                                    <textarea
                                        id="description"
                                        onChange={updateForm.handleChange}
                                        value={updateForm.values.description}
                                        className="w-full p-3 border rounded-lg"
                                        rows="3"
                                    />
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label className="block text-lg mb-1">Upload Images</label>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={(e) => uploadImages(e, updateForm)}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>

                                {/* Display Uploaded Images */}
                                {updateForm.values.images.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                        {updateForm.values.images.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt="Uploaded"
                                                className="w-full h-16 object-cover border rounded-md"
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={updateForm.isSubmitting}
                                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
                                >
                                    {updateForm.isSubmitting ? (
                                        <IconLoader3 className='animate-spin inline-block' />
                                    ) : (
                                        <IconCheck className='inline-block' />
                                    )}
                                    {updateForm.isSubmitting ? 'Updating...' : 'Update Product'}
                                </button>
                            </form>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    );
};

export default UpdateProduct;