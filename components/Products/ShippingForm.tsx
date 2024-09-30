import React, { useState } from 'react';

const ShippingForm = ({ onSubmit }: { onSubmit: (info: any) => void }) => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
      <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
      <input name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal Code" required />
      <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" required />
      <button type="submit">Continue to Payment</button>
    </form>
  );
};

export default ShippingForm;
