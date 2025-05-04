// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const ChangePasswordForm = () => {
//   const formik = useFormik({
//     initialValues: {
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     },
//     validationSchema: Yup.object({
//       currentPassword: Yup.string().required('Current password is required'),
//       newPassword: Yup.string()
//         .matches(/[a-z]/, 'Lowercase letter required')
//         .matches(/[A-Z]/, 'Uppercase letter required')
//         .matches(/[0-9]/, 'Number required')
//         .matches(/\W/, 'Special character required')
//         .min(8, 'Minimum 8 characters required')
//         .required('New password is required'),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
//         .required('Confirm your new password'),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const token = localStorage.getItem('token'); // Adjust based on how you store JWT
//         const res = await axios.post('/users/change-password', {
//           currentPassword: values.currentPassword,
//           newPassword: values.newPassword,
//         }, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         toast.success(res.data.message || 'Password changed successfully');
//         resetForm();
//       } catch (err) {
//         toast.error(err.response?.data?.error || 'Something went wrong');
//       }
//     },
//   });

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
//       <form onSubmit={formik.handleSubmit} className="space-y-4">
//         {/* Current Password */}
//         <div>
//           <input
//             type="password"
//             name="currentPassword"
//             placeholder="Current Password"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.currentPassword}
//             className={`w-full p-2 border rounded ${
//               formik.touched.currentPassword && formik.errors.currentPassword ? 'border-red-500' : 'border-gray-300'
//             }`}
//           />
//           {formik.touched.currentPassword && formik.errors.currentPassword && (
//             <p className="text-red-500 text-sm">{formik.errors.currentPassword}</p>
//           )}
//         </div>

//         {/* New Password */}
//         <div>
//           <input
//             type="password"
//             name="newPassword"
//             placeholder="New Password"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.newPassword}
//             className={`w-full p-2 border rounded ${
//               formik.touched.newPassword && formik.errors.newPassword ? 'border-red-500' : 'border-gray-300'
//             }`}
//           />
//           {formik.touched.newPassword && formik.errors.newPassword && (
//             <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
//           )}
//         </div>

//         {/* Confirm Password */}
//         <div>
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.confirmPassword}
//             className={`w-full p-2 border rounded ${
//               formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
//             }`}
//           />
//           {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//             <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
//         >
//           Change Password
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChangePasswordForm;




// src/app/user/changePassword/page.jsx
"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const ChangePasswordPage = () => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string().min(6, "Too short").required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm your password"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const res = await axios.post("/users/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Password changed successfully");
        resetForm();
      } else {
        toast.error(data.message || "Failed to change password");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className="space-y-4">
          <div>
            <label className="block mb-1">Old Password</label>
            <Field type="password" name="oldPassword" className="w-full border rounded px-3 py-2" />
            <ErrorMessage name="oldPassword" component="div" className="text-red-500 text-sm" />
          </div>
          <div>
            <label className="block mb-1">New Password</label>
            <Field type="password" name="newPassword" className="w-full border rounded px-3 py-2" />
            <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
          </div>
          <div>
            <label className="block mb-1">Confirm New Password</label>
            <Field type="password" name="confirmPassword" className="w-full border rounded px-3 py-2" />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>
            {loading ? "Updating..." : "Change Password"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePasswordPage;
