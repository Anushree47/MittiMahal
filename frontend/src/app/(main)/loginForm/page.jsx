// 'use client';
// import { IconCheck, IconLoader3 } from '@tabler/icons-react';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import { useParams, useRouter } from 'next/navigation';
// import React from 'react';
// import toast  from 'react-hot-toast';
// import * as Yup from 'yup';

// const LoginSchema = Yup.object().shape({
//   email: Yup.string().email('Invalid email').required('Required'),
//   password: Yup.string().required('Password is required'),
// });

// const Login = () => {
//     const { id } = useParams();
//   const router = useRouter();

//   const loginForm = useFormik({
//     initialValues: { email: '', password: '' },
//     validationSchema: LoginSchema,
//     onSubmit: (values, { resetForm, setSubmitting }) => {
//       setSubmitting(true);
//       axios.post('http://localhost:5000/users/authenticate', values)
//         .then((result) => {
//           const token = result.data.token;
//           if (token) {
//             localStorage.setItem('token', token);
//             toast.success('User logged in successfully');
//             resetForm();
//             router.push('/');
            
//           } else {
//             toast.error('Login failed, token not received.');
//           }
//         })
//         .catch((err) => {
//           toast.error(err?.response?.data?.message || 'Something went wrong');
//           setSubmitting(false);
//           console.log(err);
          
//         });
//     },
//   });

//   return (


//     <div  className='flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-black'> 
//       {/*main div*/}
    
//     <div className='bg-white shadow-lg rounded-lg overflow-hidden w-3/5 max-w-4xl flex'>

//       {/* Left Image */}
//       <div className='relative w-1/2 h-full'>
//       <div className='absolute top-[20%] left-[10%] flex flex-col'>
//         <h1 className='text-4xl text-white font-bold my-4'>Turn you ideas into reality </h1>
//         <p className='text-xl text-white font-normal'>jahiua nhdiehfieh ndheaj nsjdjfoin nhdhd nndjjm jkfsji kjfrij </p>
//       </div>
//       <img src="/potter.jpg" alt="potter_img" className='w-full h-full ' />
//       </div>

//       {/* Right Login Form */}
      

//       <div className='w-1/2 p-8 '>
//       <h1 className='text-xl text-[#060606] font-sedmibold mr-auto'>Brand</h1>

//     <form onSubmit={loginForm.handleSubmit}>
//       <div className='w-full flex flex-col max-w-[400px]'>
//         <div className='w-full flex flex-col mb-2'>
//         <h3 className='text-2xl font-semibold mb-2'>Login</h3>
//         <p className='text-sm mb-2'>Welcome Back! Please enter your details.</p>
//         </div>

//         <div className='w-full flex flex-col'>
//             <input 
//             type="email" 
//             name='email'
//             placeholder='email'
//             onChange={loginForm.handleChange}
//             value={loginForm.values.email}
//             className='w-full text-black py-4 bg-trans border-b border-black outline-none focus:outline-none' />

//         <input 
//         type="password"
//         name='password'
//         onChange={loginForm.handleChange}
//         value={loginForm.values.password}
//             placeholder='password'
//             className='w-full text-black py-4 bg-trans border-b border-black outline-none focus:outline-none' />
//         </div>
//       </div>

//       <div className='w-full flex items-center justify-between'>
//         <div className='w-1/2 flex items-center'>
//             <input type="checkbox" id="remember" name="remember" value="remember" />
//             <label className='text-sm'>Remember me</label>
//         </div>


//         <p className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 '>Forgot Passward?</p>

//       </div>
      

//       <div className='w-full flex flex-col'>
//         <button 
//         type="submit"
//         disabled={loginForm.isSubmitting}
//         className='w-full text-white font-semibold my-2 bg-[#060606] rounded-md p-4 
//         text-center flex items-center justify-center cursor-pointer'>
//           {loginForm.isSubmitting ? <IconLoader3 className='animate-spin' /> : ''}
//           {loginForm.isSubmitting ? 'Logging In...' : 'Log In'}
//           </button>
          

//         <button className='w-full text-[#060606] font-semibold my-2 bg-white border-2 border-black rounded-md 
//         p-4 text-center flex items-center justify-center cursor-pointer'>
//           Register
//           </button>

//       </div>
//       </form>

//       <div className='w-full flex items-center justify-center relative'>
//         <div className='w-full h-[1px] bg-black '></div>
//         <p className='text-lg absolute text-black/80 bg-[#f5f5f5]'>or</p>
//       </div>

//       <div className='w-full text-[#060606] font-semibold my-2 bg-white border-2 border-black/40 rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
//         <img src="/icons8-google-48.png" alt="google" className='h-6 mr-2' />
//         Sign in with Google</div>


//         <div className='w-full flex items-center justify-center'>
//             <p>Dont have a account? <a href='/signupForm' className='font-semibold underline underline-offset'>Sign up for free</a></p>
//         </div>
//         </div>
        

//     </div>

//     </div>
//   );
// };

// export default Login;


// 'use client';
// import { IconLoader3 } from '@tabler/icons-react';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import { useParams, useRouter } from 'next/navigation';
// import React from 'react';
// import toast from 'react-hot-toast';
// import * as Yup from 'yup';

// const LoginSchema = Yup.object().shape({
//   email: Yup.string().email('Invalid email').required('Required'),
//   password: Yup.string().required('Password is required'),
// });

// const Login = () => {
//   const { id } = useParams();
//   const router = useRouter();

//   const loginForm = useFormik({
//     initialValues: { email: '', password: '' },
//     validationSchema: LoginSchema,
//     onSubmit: (values, { resetForm, setSubmitting }) => {
//       setSubmitting(true);
//       axios.post('http://localhost:5000/users/authenticate', values)
//         .then((result) => {// Assuming the token is in "data.token"
//           const token = result.data.token;
//           if (token) {
//             if(result.data.role === 'admin'){
//               localStorage.setItem('admin-token', token); //save the token in localStorage
//               toast.success('Admin login successfully');
//               router.push('/admin/profile');
//             }else{
//               localStorage.setItem('token', token); //save the token in localStorage
//               toast.success('User login successfully');
//               router.push('/');
//             }
//             resetForm();
//             router.push('/');
            
//           } else {
//             toast.error('Login failed, token not received.');
//           }
//         }).catch((err) => {
//           console.log(err);
//           toast.error(err?.response?.data?.message || 'something went wrong');
//           setSubmitting(false);
//           console.log(err);
          
//         });



//     },
//     validationSchema: LoginSchema
//   })



//   return (
//     // <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/full-bg-clay.jpg')" }}>
//     //   <div className="w-full max-w-md p-8 bg-[#F4EAE0] border border-[#E07A5F] rounded-lg shadow-lg backdrop-blur-md">
//     //     <div className="text-center">
//     //       <h1 className="text-3xl font-bold text-[#5E3B1C]">Welcome to Mitti Mahal</h1>
//     //       <p className="mt-2 text-sm text-[#8B5E3C]">
//     //         Don't have an account? <a href="/signupForm" className="text-[#E07A5F] hover:underline font-medium">Sign up here</a>
//     //       </p>
//     //     </div>

//     //     <div className="mt-5">
//     //       <button
//     //         type="button"
//     //         className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-[#8B5E3C] bg-white text-[#5E3B1C] shadow-sm hover:bg-[#F4EAE0] focus:outline-none"
//     //       >
//     //         <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
//     //         Sign in with Google
//     //       </button>
//     //       <div className="py-3 flex items-center text-xs text-[#8B5E3C] uppercase before:flex-1 before:border-t before:border-[#E07A5F] after:flex-1 after:border-t after:border-[#E07A5F]">
//     //         Or
//     //       </div>

//     //       <form onSubmit={loginForm.handleSubmit} className="space-y-4">
//     //         <div>
//     //           <label htmlFor="email" className="block text-sm text-[#5E3B1C] mb-2">Email Address</label>
//     //           <input
//     //             type="email"
//     //             id="email"
//     //             onChange={loginForm.handleChange}
//     //             value={loginForm.values.email}
//     //             className="w-full py-3 px-4 border border-[#8B5E3C] rounded-lg text-sm bg-white focus:ring-[#E07A5F] focus:border-[#E07A5F]"
//     //           />
//     //           {loginForm.errors.email && loginForm.touched.email && (
//     //             <p className="text-xs text-red-600 mt-1">{loginForm.errors.email}</p>
//     //           )}
//     //         </div>

//     //         <div>
//     //           <label htmlFor="password" className="block text-sm text-[#5E3B1C] mb-2">Password</label>
//     //           <input
//     //             type="password"
//     //             id="password"
//     //             onChange={loginForm.handleChange}
//     //             value={loginForm.values.password}
//     //             className="w-full py-3 px-4 border border-[#8B5E3C] rounded-lg text-sm bg-white focus:ring-[#E07A5F] focus:border-[#E07A5F]"
//     //           />
//     //           {loginForm.errors.password && loginForm.touched.password && (
//     //             <p className="text-xs text-red-600 mt-1">{loginForm.errors.password}</p>
//     //           )}
//     //         </div>

//     //         <div className="flex items-center">
//     //           <input id="remember-me" name="remember-me" type="checkbox" className="text-[#E07A5F]" />
//     //           <label htmlFor="remember-me" className="ml-2 text-sm text-[#5E3B1C]">Remember me</label>
//     //         </div>

//     //         <button
//     //           type="submit"
//     //           disabled={loginForm.isSubmitting}
//     //           className="w-full py-3 px-4 flex items-center justify-center gap-2 text-sm font-medium text-white bg-[#E07A5F] rounded-lg hover:bg-[#D86B50] disabled:opacity-50"
//     //         >
//     //           {loginForm.isSubmitting ? <IconLoader3 className="animate-spin" /> : <IconCheck />}
//     //           {loginForm.isSubmitting ? 'Signing In...' : 'Sign In'}
//     //         </button>

//     //         <div className="text-center mt-4">
//     //           <a href="/" className="text-[#8B5E3C] hover:underline text-sm">← Back to Home</a>
//     //         </div>
//     //       </form>
//     //     </div>
//     //   </div>
//     // </div>


//     <div  className='flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-black'> 
//       {/*main div*/}
    
//     <div className='bg-white shadow-lg rounded-lg overflow-hidden w-3/5 max-w-4xl flex'>

//       {/* Left Image */}
//       <div className='relative w-1/2 h-full'>
//       <div className='absolute top-[20%] left-[10%] flex flex-col'>
//         <h1 className='text-4xl text-white font-bold my-4'>Turn you ideas into reality </h1>
//         <p className='text-xl text-white font-normal'>jahiua nhdiehfieh ndheaj nsjdjfoin nhdhd nndjjm jkfsji kjfrij </p>
//       </div>
//       <img src="/potter.jpg" alt="potter_img" className='w-full h-full ' />
//       </div>

//       {/* Right Login Form */}
      

//       <div className='w-1/2 p-8 '>
//       <h1 className='text-xl text-[#060606] font-sedmibold mr-auto'>Brand</h1>

//     <form onSubmit={loginForm.handleSubmit}>
//       <div className='w-full flex flex-col max-w-[400px]'>
//         <div className='w-full flex flex-col mb-2'>
//         <h3 className='text-2xl font-semibold mb-2'>Login</h3>
//         <p className='text-sm mb-2'>Welcome Back! Please enter your details.</p>
//         </div>

//         <div className='w-full flex flex-col'>
//             <input 
//             type="email" 
//             name='email'
//             placeholder='email'
//             onChange={loginForm.handleChange}
//             value={loginForm.values.email}
//             className='w-full text-black py-4 bg-trans border-b border-black outline-none focus:outline-none' />

//         <input 
//         type="password"
//         name='password'
//         onChange={loginForm.handleChange}
//         value={loginForm.values.password}
//             placeholder='password'
//             className='w-full text-black py-4 bg-trans border-b border-black outline-none focus:outline-none' />
//         </div>
//       </div>

//       <div className='w-full flex items-center justify-between'>
//         <div className='w-1/2 flex items-center'>
//             <input type="checkbox" id="remember" name="remember" value="remember" />
//             <label className='text-sm'>Remember me</label>
//         </div>


//         <p className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 '>Forgot Passward?</p>

//       </div>
      

//       <div className='w-full flex flex-col'>
//         <button 
//         type="submit"
//         disabled={loginForm.isSubmitting}
//         className='w-full text-white font-semibold my-2 bg-[#060606] rounded-md p-4 
//         text-center flex items-center justify-center cursor-pointer'>
//           {loginForm.isSubmitting ? <IconLoader3 className='animate-spin' /> : ''}
//           {loginForm.isSubmitting ? 'Logging In...' : 'Log In'}
//           </button>
          

//         <button className='w-full text-[#060606] font-semibold my-2 bg-white border-2 border-black rounded-md 
//         p-4 text-center flex items-center justify-center cursor-pointer'>
//           Register
//           </button>

//       </div>
//       </form>

//       <div className='w-full flex items-center justify-center relative'>
//         <div className='w-full h-[1px] bg-black '></div>
//         <p className='text-lg absolute text-black/80 bg-[#f5f5f5]'>or</p>
//       </div>

//       <div className='w-full text-[#060606] font-semibold my-2 bg-white border-2 border-black/40 rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
//         <img src="/icons8-google-48.png" alt="google" className='h-6 mr-2' />
//         Sign in with Google</div>


//         <div className='w-full flex items-center justify-center'>
//             <p>Dont have a account? <a href='/signupForm' className='font-semibold underline underline-offset'>Sign up for free</a></p>
//         </div>
//         </div>
        

//     </div>

//     </div>
//   );
// };

// export default Login;
'use client';
import { IconLoader3 } from '@tabler/icons-react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const { id } = useParams();
  const router = useRouter();

  const loginForm = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      axios.post('http://localhost:5000/users/authenticate', values)
      .then((result) => {
        const token = result.data.token;
        if (token) {
          if(result.data.role === 'admin'){
            localStorage.setItem('admin-token', token);
            toast.success('Admin login successfully');
            router.push('/admin/profile');
          }else{
            localStorage.setItem('token', token);
            toast.success('User login successfully');
            router.push('/');
          }
          resetForm();
          router.push('/');
        } else {
          toast.error('Login failed, token not received.');
        }
      }).catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message || 'something went wrong');
        setSubmitting(false);
      });
    },
    validationSchema: LoginSchema
  });

  return (
    <div className="flex items-center justify-center min-h-screen ">
      {/* Main Container */}
      <div className="bg-white shadow-2xl dark:bg-gray-800 dark:border-gray-700 border border-gray-200 rounded-xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
        
        {/* Left Side - Image & Text */}
        <div className="relative md:w-1/2 h-64 md:h-auto bg-black">
          <img src="/potter.jpg" alt="potter_img" className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold">Turn Your Ideas into Reality</h1>
            <p className="text-sm md:text-base mt-2">Start your journey with us today.</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold text-gray-900">Mitti Mahal</h1>

          <form onSubmit={loginForm.handleSubmit} className="mt-4">
            <div className="w-full flex flex-col space-y-4">
              
              {/* Email Input */}
              <input 
                type="email" 
                name="email"
                placeholder="Email"
                onChange={loginForm.handleChange}
                value={loginForm.values.email}
                className="w-full text-[#5a3e2b] px-4 py-3 bg-white border border-[#5a3e2b] rounded-md focus:ring-2 focus:ring-[#d89b64] focus:outline-none"
              />

              {/* Password Input */}
              <input 
                type="password"
                name="password"
                placeholder="Password"
                onChange={loginForm.handleChange}
                value={loginForm.values.password}
                className="w-full text-[#5a3e2b] px-4 py-3 bg-white border border-[#5a3e2b] rounded-md focus:ring-2 focus:ring-[#d89b64] focus:outline-none"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="w-full flex items-center justify-between mt-3 text-sm ">
              <label className="flex items-center space-x-2">
                <input type="checkbox" name="remember" className="w-4 h-4" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-yellow-900 hover:underline">Forgot Password?</a>
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              disabled={loginForm.isSubmitting}
              className="w-full bg-yellow-900 hover:bg-yellow-500 shadow-md text-white font-semibold mt-4 p-3 rounded-lg transition flex items-center justify-center ">
              {loginForm.isSubmitting ? <IconLoader3 className="animate-spin mr-2" /> : ''}
              {loginForm.isSubmitting ? 'Logging In...' : 'Log In'}
            </button>

            {/* Register Button */}
            <button className="w-full bg-white text-yellow-900 border border-yellow-600 hover:bg-yellow-900 hover:text-white font-semibold mt-2 p-3 rounded-lg transition flex items-center justify-center ">
              Register
            </button>
          </form>

          {/* OR Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="w-full h-[1px] bg-gray-300"></div>
            <p className="absolute bg-white px-4 text-gray-500">or</p>
          </div>

          {/* Google Sign-in */}
          <button className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-400 hover:bg-gray-100 text-black font-semibold p-3 rounded-md transition">
            <img src="/icons8-google-48.png" alt="Google" className="h-6" />
            <span>Sign in with Google</span>
          </button>

          {/* Signup Redirect */}
          <div className="w-full text-center mt-4">
            <p>Don't have an account? <a href="/signupForm" className="text-yellow-900 hover:underline font-semibold">Sign up for free</a></p>
          </div>

          {/* Admin Login Link - Added this section */}
          <div className="w-full text-center mt-4">
            <p>Are you an admin? <a href="/admin/admin-login" className="text-red-700 hover:underline font-semibold">Login as Admin</a></p>
          </div>
          {/* End of Admin Login Link */}

        </div>
      </div>
    </div>
  );
};

export default Login;
