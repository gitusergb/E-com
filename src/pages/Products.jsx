import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';
// import { addToCart } from '../services/api';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://bb-nwfw.onrender.com/allProducts'); 
        // console.log(response.data)
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );
  const handleAddToCart = async (product) => {
    try {
      const userID = localStorage.getItem('userID');
      if (!userID) {
        console.log("userID",userID)
        setMessage('You need to log in to add items to the cart.');
        return;
      }
      const cart = {userID,
      productId: product.productId || product.id,
          title: product.title,
          price: product.price,
          image: product.images ? product.images[0] : product.image,
          quantity: product.quantity || 1
      };
      const response = await axios.post(`${'http://localhost:9000'}/carts/addToCart`,cart, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  console.log(cart,response.status)
      
      //return response;
      // const response = await addToCart(payload);

      if (response.status === 200 || response.status === 201) {
        setMessage('Product added to cart!');
        toast.success("Product added to cart!");
      } else {
        setMessage('Failed to add product to cart');
        toast.error("Failed to add product to cart");
   
      }
     
    } catch (err) {
      setMessage('Failed to add product to cart');
      toast.dark("Failed to add product to cart");
    }
  };

  return (
    <div className="products-page">
      <h1>Our Products</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Product List */}
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.images[0]} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Price: ₹{product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
