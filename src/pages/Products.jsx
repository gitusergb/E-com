import React, { useState, useEffect } from 'react';
import './Products.css';
// import { addToCart } from '../services/api';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://bb-nwfw.onrender.com/allProducts'); 
        // console.log(response.data)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        //setProducts(response.data);
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
    if (!token) {
      toast.error("You need to log in to add items to the cart.");
      return navigate("/login");
    }
    const userID = localStorage.getItem('userID');
    const fullname = localStorage.getItem('fullname');

      if (!userID) {
        console.log("userID", userID);
        toast.message('You need to log in to add items to the cart.');
        return;
      }
  
      const cartData = {
        userID,fullname ,
        Products: [{
          productId:product.id,
          title: product.title,
          price: product.price,
          image: product.images?.[0] || product.images[1]|| "default-image.jpg",
          quantity:product.quantity || 1}]
      };
      try {
      console.log("cartData", `:` ,cartData)
      const response = await fetch(`http://localhost:9000/carts/addCart?userID=${userID}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartData),
      });
  
      if (response.ok) {
        toast.success('Product added to cart!');
        console.log('userdata', cartData, response.status);
      } else {
        toast.error('Failed to add product to cart.');
      }
    } catch (err) {
    
      toast.error('Failed to add product to cart.');
      console.error('Error adding product to cart:', err);
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
        {filteredProducts.length > 0 ?(filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.images[0]} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Price: ₹{product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button> 
          </div>
        ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
