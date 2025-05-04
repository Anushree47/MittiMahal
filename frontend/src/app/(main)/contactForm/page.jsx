"use client";

import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ContactForm = () => {
  const router = useRouter();

  const form = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/contact/submit`, values)
        .then((result) => {
          toast.success("Form Successfully Submitted.");
          resetForm();
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message || "Something went wrong!");
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="min-h-screen bg-white py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900 to-yellow-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="text-white relative px-4 py-10 bg-gray-50 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="text-center pb-6">
            <h1 className="text-3xl text-black font-bold">Contact Us!</h1>
            <p className="text-black">Fill up the form below to send us a message.</p>
          </div>

          <form onSubmit={form.handleSubmit} className="space-y-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Your Name"
              name="name"
              value={form.values.name}
              onChange={form.handleChange}
              required
            />

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Your Email"
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
              required
            />

          
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Type your message here..."
              name="message"
              value={form.values.message}
              onChange={form.handleChange}
              required
              style={{ height: "121px" }}
            ></textarea>

            <div className="flex justify-between">
              <button
                type="submit"
                className="shadow bg-yellow-900 hover:bg-yellow-500 text-white font-bold shadow-md py-2 px-4 transition rounded focus:outline-none focus:shadow-outline"
                disabled={form.isSubmitting}
              >
                {form.isSubmitting ? "Sending..." : "Send ➤"}
              </button>
              <button
                type="reset"
                onClick={form.handleReset}
                className="shadow bg-white hover:bg-yellow-900 text-yellow-900 hover:text-white shadow-md transition font-bold py-2 px-4 rounded border border-yellow-600 focus:outline-none focus:shadow-outline"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
