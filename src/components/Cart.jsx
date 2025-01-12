import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cart.css';

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [message, setMessage] = useState('');

  const fetchCart = async () => {
    try {
      const userID = localStorage.getItem('userID');
      const token = localStorage.getItem('token');
  
      console.log('userID:', userID, 'token:', token);
  
      const response = await fetch(`http://localhost:9000/carts/seeCart?userID=${userID}`, 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      );
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
        console.error('Error fetching cart:', response.status, response.statusText);
        setMessage('Failed to fetch cart data.');
        return;
      }
  console.log(response.json())
      const data = await response.json();
      console.log('Cart data:', data.message);
  
      setCartProducts(data || []);
    } catch (error) {
      console.error('Error fetching cart:', error.message);
    }
  };
  
  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:9000/cart/${productId}`); 
      setCartProducts(cartProducts.filter((product) => product.productId !== productId));
      setMessage('Product removed from cart!');
    } catch (err) {
      setMessage('Failed to remove product from cart');
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {message && <p className="message">{message}</p>}

        <div className="cart-list">
          {Array.isArray(cartProducts) && cartProducts.length > 0 ? (
        cartProducts.map((product) => (
            <div className="cart-card" key={product.productId}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>Price: ₹{product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <button onClick={() => handleRemoveFromCart(product.productId)}>Remove</button>
            </div>
          ))) : (
            <p>Your cart is empty.</p>
          )}
        </div>
    
    </div>
  );
};

export default CartPage;
