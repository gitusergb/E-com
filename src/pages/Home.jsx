import React from 'react';
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <h1>Welcome to E-Commerce</h1>
      <p>Discover amazing products and shop with ease!</p>
      <Link to={"/login"}>Login</Link>
    </div>

    
  );
};

export default Home;
