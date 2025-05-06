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
