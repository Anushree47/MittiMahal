'use client';
import { IconCheck, IconLoader3, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useAdminAuth } from '@/context/AdminAuthContext';

const ProductSchema = Yup.object().shape({
  price: Yup.number().typeError('Must be a number').required('This field is required'),
});

const ProductCard = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const { isAuthenticated } = useAdminAuth();
  
  const product = useFormik({
    initialValues: {
      title: '',
      category: '',
      price: '',
      description: '',
      images: [],
    },
    validationSchema: ProductSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      const finalValues = { ...values, images };
      axios
        .post('http://localhost:5000/product/add', finalValues)
        .then(() => {
          toast.success('Product entered successfully');
          resetForm();
          setImages([]);
          router.push('/browse');
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || 'SOMETHING WENT WRONG');
          setSubmitting(false);
        });
    },
  });

  const uploadImages = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    const uploadedImages = [...images];
    toast.loading('Uploading images...');
    for (let file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'anupreset47');
      formData.append('cloud_name', 'du4tklzpq');
      try {
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/du4tklzpq/image/upload',
          formData
        );
        if (res.status === 200) {
          uploadedImages.push(res.data.url);
        }
      } catch (error) {
        toast.error('Failed to upload image');
      }
    }
    setImages(uploadedImages);
    toast.dismiss();
    toast.success('Images uploaded successfully');
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  if (!isAuthenticated) {
    return <div className="p-10 text-center">You are not authorized to view this page.</div>;
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative p-6 bg-white rounded-2xl shadow-lg max-w-lg w-full py-6">
        {/* Decorative Background */}
        <div className="absolute inset-0 -z-10 transform rotate-6 bg-gray-900 rounded-2xl"></div>

        {/* Heading Outside the Form */}
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Add Product
        </h2>

        <form onSubmit={product.handleSubmit} className="space-y-2">
          <div>
            <label className="block font-medium text-gray-700">Title*</label>
            <input
              type="text"
              name="title"
              onChange={product.handleChange}
              value={product.values.title}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-gray-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Category*</label>
            <select
              name="category"
              onChange={product.handleChange}
              value={product.values.category}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-gray-500 outline-none"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Home Decor">Home Decor</option>
              <option value="Kitchen and Dining">Kitchen and Dining</option>
              <option value="Garden Essentials">Garden Essentials</option>
              <option value="Toy and Miniature">Toy and Miniature</option>
              <option value="Custom and Personalized Item">
                Custom and Personalized Item
              </option>
              <option value="Art and Craft Supplies">Art and Craft Supplies</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Description*</label>
            <textarea
              name="description"
              onChange={product.handleChange}
              value={product.values.description}
              rows="3"
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-gray-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Price*</label>
            <input
              type="number"
              name="price"
              onChange={product.handleChange}
              value={product.values.price}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-gray-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Upload Images</label>
            <input type="file" multiple onChange={uploadImages} className="w-full mt-2" />
          </div>

          {images.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {images.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt="img"
                    className="w-full h-16 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-80 group-hover:opacity-100"
                  >
                    <IconTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={product.isSubmitting || images.length === 0}
            className="w-full py-2 text-white bg-gray-900 rounded-md hover:bg-gray-700 transition"
          >
            {product.isSubmitting ? (
              <IconLoader3 className="animate-spin inline" />
            ) : (
              <IconCheck className="inline" />
            )}{' '}
            {product.isSubmitting ? 'Submitting...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductCard;
