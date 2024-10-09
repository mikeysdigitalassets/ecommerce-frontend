import React, { useState } from 'react';
import { useUser } from '../Context/UserContext';
import axios from 'axios';
import { useRouter } from "next/router"; 
import { toast, ToastOptions, TypeOptions } from 'react-toastify';

const AddShipping = () => {
  const { user } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const notify = (message: string, type: TypeOptions) => {
    const options: ToastOptions = { type, autoClose: 5000 }
    toast(message, options);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!user) {
    return <div>Loading...</div>; // Safeguard to avoid errors when user context isn't ready
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     const response = await axios.post(
        "http://localhost:5000/api/user-settings/add-shipping",
        {
          user_id: user.id,
          address: formData.address,
          city: formData.city,
          firstName: formData.firstName,
          lastName: formData.lastName,
          state: formData.state,
          postalCode: formData.zipCode,
        },
        {
          withCredentials: true,
        }
      );
      console.log('Shipping Form Submitted:', formData); // log for debugging
      if (response.status == 200) {
        notify('Succesfully added shipping address!', 'success');
        router.push("/settings")
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-screen-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Shipping Information</h2>
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

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700 transition"
            >
              Submit Shipping Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShipping;
