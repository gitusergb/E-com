import React, { useState } from 'react';
import { placeOrder } from '../services/api';

function Order() {
  const [form, setForm] = useState({ shippingAddress: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await placeOrder({ shippingAddress: form.shippingAddress });
      setMessage('Order placed successfully!');
    } catch (err) {
      setMessage('Failed to place order');
    }
  };

  return (
    <div>
      <h2>Place Order</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="shippingAddress"
          placeholder="Shipping Address"
          onChange={handleChange}
          required
        />
        <button type="submit">Place Order</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Order;
