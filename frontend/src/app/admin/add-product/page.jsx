'use client';
import { IconCheck, IconLoader3, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const ProductSchema = Yup.object().shape({
  price: Yup.number().typeError('Must be a number').required('This field is required'),
});

const ProductCard = () => {
  
  const router = useRouter();

  // State for multiple images
  const [images, setImages] = useState([]);

  // Initializing Formik
  const product = useFormik({
    initialValues: {
    
      title: '',
      category: '',
      price: '',
      description: '',
      images: []
    },
    validationSchema: ProductSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      const finalValues = { ...values, images };
      axios
        .post('http://localhost:5000/product/add', finalValues)
        .then((result) => {
          toast.success('Product entered successfully');
          resetForm();
          setImages([]); // Clear images state
          router.push('/browse');
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || 'SOMETHING WENT WRONG');
          setSubmitting(false);
        });
    },
  });

  useEffect(() => {
  }, []);

  // Upload multiple images to Cloudinary
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
        const res = await axios.post('https://api.cloudinary.com/v1_1/du4tklzpq/image/upload', formData);
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

  // Remove an image from the array
  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="max-w-xl w-full bg-gradient-to-r from-[#7F5539] to-[#E6CCB2] shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center text-black">Add Product</h1>
        <form onSubmit={product.handleSubmit} className="mt-6 space-y-4">
       
          {/* Title */}
          <div>
            <label className="block text-black font-medium">Title</label>
            <input
              type="text"
              name="title"
              onChange={product.handleChange}
              value={product.values.title}
              className="w-full mt-1 p-3 border rounded-md"
              required
            />
          </div>

        
         
          {/* Category Dropdown */}
<div>
  <label className="block text-black font-medium">Category</label>
  <select
    name="category"
    onChange={product.handleChange}
    value={product.values.category}
    className="w-full mt-1 p-3 border rounded-md bg-white"
    required
  >
    <option value="" disabled>Select Category</option>
    <option value="Home Decor">Home Decor</option>
    <option value="Kitchen and Dining">Kitchen and Dining</option>
    <option value="Garden Essentials">Garden Essentials</option>
    <option value="Toy and Miniature">Toy and Miniature</option>
    <option value="Custom and Personalized Item">Custom and Personalized Item</option>
    <option value="Art and Craft Supplies">Art and Craft Supplies</option>
  </select>
</div>

        

          {/* Description */}
          <div>
            <label className="block text-black font-medium">Description</label>
            <textarea
              name="description"
              onChange={product.handleChange}
              value={product.values.description}
              className="w-full mt-1 p-3 border rounded-md"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-black font-medium">Price</label>
            <input
              type="number"
              name="price"
              onChange={product.handleChange}
              value={product.values.price}
              className="w-full mt-1 p-3 border rounded-md"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-black font-medium">Upload Images</label>
            <input type="file" multiple onChange={uploadImages} className="w-full mt-2" />
          </div>

          {/* Display Uploaded Images */}
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {images.map((url, index) => (
                <div key={index} className="relative group">
                  <img src={url} alt="img" className="w-full h-20 object-cover rounded-md"/>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-80 group-hover:opacity-100"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={product.isSubmitting || images.length === 0}
            className="w-full py-3 text-white bg-black rounded-md hover:bg-black-200 disabled:opacity-50"
          >
            {product.isSubmitting ? <IconLoader3 className="animate-spin inline" /> : <IconCheck className="inline" />}
            {product.isSubmitting ? 'Submitting...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductCard;