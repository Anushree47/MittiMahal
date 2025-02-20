'use client'
import React from 'react';
import { useState, useEffect } from 'react';

const AddressForm = ({ onSubmit, existingAddress }) => {
  const [address, setAddress] = useState(existingAddress || { street: '', city: '', state: '', zipCode: '', country: '', isDefault: false });

  useEffect(() => {
    if (existingAddress) {
      setAddress(existingAddress);
    }
  }, [existingAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(address);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-center text-gray-800">{existingAddress ? 'Edit Address' : 'Add New Address'}</h2>

      <div className="space-y-4">
        <input
          type="text"
          name="street"
          value={address.street}
          onChange={handleChange}
          placeholder="Street Address"
          className="w-full p-3 border rounded-md"
          required
        />
        <input
          type="text"
          name="city"
          value={address.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full p-3 border rounded-md"
          required
        />
        <input
          type="text"
          name="state"
          value={address.state}
          onChange={handleChange}
          placeholder="State"
          className="w-full p-3 border rounded-md"
          required
        />
        <input
          type="text"
          name="zipCode"
          value={address.zipCode}
          onChange={handleChange}
          placeholder="Zip Code"
          className="w-full p-3 border rounded-md"
          required
        />
        <input
          type="text"
          name="country"
          value={address.country}
          onChange={handleChange}
          placeholder="Country"
          className="w-full p-3 border rounded-md"
          required
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isDefault"
            checked={address.isDefault}
            onChange={() => setAddress((prev) => ({ ...prev, isDefault: !prev.isDefault }))}
            className="h-5 w-5 text-green-500"
          />
          <span className="text-gray-700">Set as Default Address</span>
        </label>
      </div>

      <button type="submit" className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700">
        {existingAddress ? 'Update Address' : 'Add Address'}
      </button>
    </form>
  );
};

export default AddressForm;
