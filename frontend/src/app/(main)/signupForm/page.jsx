'use client';
import axios from 'axios';
import { IconCheck, IconLoader3 } from '@tabler/icons-react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Required'),
  userType: Yup.string().oneOf(['Buyer', 'Artisan'], 'Invalid User Type').required('Required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  pincode: Yup.string().matches(/^\d{5,6}$/, 'Invalid Pin code').required('Required'),
  password: Yup.string()
    .matches(/[a-z]/, 'Lowercase letter required')
    .matches(/[A-Z]/, 'Uppercase letter required')
    .matches(/[0-9]/, 'Number required')
    .matches(/\W/, 'Special character required')
    .min(8, 'Minimum 8 characters required')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms')
});

const Signup = () => {
  
  const router = useRouter();
  

  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      userType: '',
      city: '',
      state: '',
      pincode: '',
      password: '',
      confirmPassword: '',

      terms: false ,
      imageUrl :''
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      axios.post('http://localhost:5000/users/register', values)
        .then(() => {
          toast.success('User Registered Successfully');
          resetForm();
          router.push('/loginForm');
        })
        .catch(err => {
          toast.error(err?.response?.data?.message || 'Something went wrong');
          setSubmitting(false);
        });
    },
    validationSchema: SignupSchema
  });
  useEffect(() => {
if(localStorage.getItem('!currentUser'))
{
toast.error("login is required")
router.push('/loginForm')
}    
    
  }, [])
  
  const uploadImage = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('file', file)
    formData.append('upload_preset', 'anupreset47')
    formData.append('cloud_name', 'du4tklzpq')
    const res = await axios.post('https://api.cloudinary.com/v1_1/du4tklzpq/image/upload', formData)

    if (res.status === 200) {
      console.log(res.data);
      toast.success('IMAGE UPLOADED SUCCESSFULLY')
      signupForm.setFieldValue('imageUrl', res.data.url);

    }
  }

  
    




  return (
    
    <div className=" flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
  <div className="w-[80%] bg-white shadow-lg rounded-lg overflow-hidden w-3/5 max-w-4xl flex">
    
    {/* Left Side (Image with Text) */}
    <div className="w-1/2 relative">
      <img 
        src="/potter.jpg" 
        alt="Pottery" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-6">
        <h2 className="text-2xl font-bold">Join Us Today</h2>
        <p className="text-sm mt-2">Create an account and start your journey.</p>
      </div>
    </div>

    {/* Right Side (Sign-Up Form) */}
    <div className="w-1/2 p-8 bg-gray-100">
      <div className="max-w-lg mx-auto mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Sign up</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Already have an account? 
              <a className="text-blue-600 hover:underline dark:text-blue-500" href="/loginForm">
                Sign in here
              </a>
            </p>
          </div>
          <form onSubmit={signupForm.handleSubmit} className="mt-5 grid gap-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm mb-2 dark:text-white">Full Name</label>
              <input type="text" name="name" {...signupForm.getFieldProps('name')}
                className="input-field" />
              {signupForm.touched.name && signupForm.errors.name && <p className="error-text">{signupForm.errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-2 dark:text-white">Email Address</label>
              <input type="email" name="email" {...signupForm.getFieldProps('email')}
                className="input-field" />
              {signupForm.touched.email && signupForm.errors.email && <p className="error-text">{signupForm.errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm mb-2 dark:text-white">Phone Number</label>
              <input type="text" name="phone" {...signupForm.getFieldProps('phone')}
                className="input-field" />
              {signupForm.touched.phone && signupForm.errors.phone && <p className="error-text">{signupForm.errors.phone}</p>}
            </div>

            {/* User Type Dropdown */}
            <div>
              <label className="block text-sm mb-2 dark:text-white">User Type</label>
              <select name="userType" {...signupForm.getFieldProps('userType')} className="input-field">
                <option value="" disabled>Select User Type</option>
                <option value="Buyer">Buyer</option>
                <option value="Artisan">Artisan</option>
              </select>
              {signupForm.touched.userType && signupForm.errors.userType && <p className="error-text">{signupForm.errors.userType}</p>}
            </div>

            {/* Address Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 dark:text-white">City</label>
                <input type="text" name="city" {...signupForm.getFieldProps('city')}
                  className="input-field" />
                {signupForm.touched.city && signupForm.errors.city && <p className="error-text">{signupForm.errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm mb-2 dark:text-white">State</label>
                <input type="text" name="state" {...signupForm.getFieldProps('state')}
                  className="input-field" />
                {signupForm.touched.state && signupForm.errors.state && <p className="error-text">{signupForm.errors.state}</p>}
              </div>
              <div className="col-span-2">
                <label className="block text-sm mb-2 dark:text-white">Pin Code </label>
                <input type="text" name="pincode" {...signupForm.getFieldProps('pincode')}
                  className="input-field" />
                {signupForm.touched.pincode && signupForm.errors.pincode && <p className="error-text">{signupForm.errors.pincode}</p>}
              </div>
            </div>

        
                   {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium">Upload Profile Picture</label>
            <input type="file"  onChange={uploadImage} className="w-full mt-2" />
          </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-2 dark:text-white">Password</label>
              <input type="password" name="password" {...signupForm.getFieldProps('password')}
                className="input-field" />
              {signupForm.touched.password && signupForm.errors.password && <p className="error-text">{signupForm.errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm mb-2 dark:text-white">Confirm Password</label>
              <input type="password" name="confirmPassword" {...signupForm.getFieldProps('confirmPassword')}
                className="input-field" />
              {signupForm.touched.confirmPassword && signupForm.errors.confirmPassword && <p className="error-text">{signupForm.errors.confirmPassword}</p>}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center">
              <input type="checkbox" name="terms" {...signupForm.getFieldProps('terms')}
                className="w-4 h-4 rounded" />
              <label className="ml-2 text-sm dark:text-white">I accept the <a className="text-blue-600 hover:underline" href="#">Terms and Conditions</a></label>
            </div>
            {signupForm.touched.terms && signupForm.errors.terms && <p className="error-text">{signupForm.errors.terms}</p>}

            {/* Submit Button */}
            <button type="submit" disabled={signupForm.isSubmitting}
              className="btn-primary flex items-center justify-center">
              {signupForm.isSubmitting ? <IconLoader3 className="animate-spin" /> : <IconCheck />}
              {signupForm.isSubmitting ? 'Submitting...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>




  </div>
</div>

  );
};

export default Signup;
