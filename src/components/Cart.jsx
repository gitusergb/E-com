import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cart.css';

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${'http://localhost:9000'}/cart/seeCart`); 
        console.log("cart res",response.data)
        //setCartProducts(response.data|| []);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setMessage('Failed to fetch cart');
      }
    };

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

      {cartProducts.length===0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-list">
          {cartProducts.map((product) => (
            <div className="cart-card" key={product.productId}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>Price: ₹{product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <button onClick={() => handleRemoveFromCart(product.productId)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
