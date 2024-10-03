import React, { useState } from 'react';

const ShippingForm = ({ onSubmit }: { onSubmit: (info: any) => void }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Shipping Form Submitted:', formData); // log i will keep for my sanity
    onSubmit(formData); // submits the form to parent
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">First Name</label>
        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Last Name</label>
        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col col-span-2">
        <label className="mb-1 font-semibold text-gray-700">Address</label>
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">City</label>
        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">State</label>
        <input
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Zip Code</label>
        <input
          name="zipCode"
          placeholder="Zip Code"
          value={formData.zipCode}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded">
        Submit Shipping Info
      </button>
    </form>
  );
};

export default ShippingForm;
