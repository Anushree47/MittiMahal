<div className="w-1/2 p-8 bg-white">
      <h2 className="text-2xl font-semibold text-gray-900">Sign Up</h2>
      <p className="text-sm text-gray-600">Create a new account.</p>
      
      <form onSubmit={signupForm.handleSubmit} className="mt-4">
        <div>
          <input type="text" 
        placeholder="Full Name" 
        {...signupForm.getFieldProps('name')} 
        className="w-full p-2 border rounded mt-2" />
        {signupForm.touched.name && signupForm.errors.name && <p className="text-red-500 text-xs mt-1">{signupForm.errors.name}</p>}
        </div>

        <div>
          <input type="email"   
        placeholder="Email" 
        {...signupForm.getFieldProps('email')} 
        className="w-full p-2 border rounded mt-2" />
        {signupForm.touched.email && signupForm.errors.email && <p className="text-red-500 text-xs mt-1">{signupForm.errors.email}</p>}
        </div>

        

         <div><input type="text" 
        placeholder="phone" 
        {...signupForm.getFieldProps('phone')} 
        className="w-full p-2 border rounded mt-2" />
        {signupForm.touched.phone && signupForm.errors.phone && <p className="text-red-500 text-xs mt-1">{signupForm.errors.phone}</p>}
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

        <div><input type="text" 
        placeholder="city" 
        {...signupForm.getFieldProps('city')} 
        className="w-full p-2 border rounded mt-2" />
        {signupForm.touched.city && signupForm.errors.city && <p className="text-red-500 text-xs mt-1">{signupForm.errors.city}</p>}
        </div>

        <div><input type="text" 
        placeholder="state" 
        {...signupForm.getFieldProps('state')} 
        className="w-full p-2 border rounded mt-2" />
        {signupForm.touched.state && signupForm.errors.state && <p className="text-red-500 text-xs mt-1">{signupForm.errors.state}</p>}
        </div>

        <div><input type="text" 
        placeholder="pincode" 
        {...signupForm.getFieldProps('pincode')} 
        className="w-full p-2 border rounded mt-2" />
        {signupForm.touched.pincode && signupForm.errors.pincode && <p className="text-red-500 text-xs mt-1">{signupForm.errors.pincode}</p>}
        </div>

        <div>
          <input type="password" 
        placeholder="Password" 
        {...signupForm.getFieldProps('password')}
         className="w-full p-2 border rounded mt-2" />
         {signupForm.touched.password && signupForm.errors.password && <p className="text-red-500 text-xs mt-1">{signupForm.errors.password}</p>}
         </div>

        <div>
          <input type="password" 
        placeholder="Confirm Password" 
        {...signupForm.getFieldProps('confirm password')}
         className="w-full p-2 border rounded mt-2" />
         {signupForm.touched.confirmPassword && signupForm.errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{signupForm.errors.confirmPassword}</p>}
         </div>
        
        <div className="flex justify-between items-center mt-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> I agree to the Terms & Conditions
          </label>
        </div>
        
        <button 
        type='submit'
        disabled={signupForm.isSubmitting}
        className="w-full bg-black text-white p-2 rounded mt-4">
          {signupForm.isSubmitting ? 'Signing Up...' : 'Sign Up'}
          {signupForm.isSubmitting && <img src="/loading.gif" alt="loading" className="w-5 h-5 ml-2" />}
        </button>
        <div className="text-center my-2">or</div>
        <button className="w-full border flex items-center justify-center p-2 rounded">
          <img src="/icons8-google-48.png" alt="Google" className="w-5 h-5 mr-2" /> Sign up with Google
        </button>
      </form>

      <p className="text-sm mt-4 text-center">
        Already have an account? <a href="/loginForm" className="text-blue-500">Log in</a>
      </p>
    </div>