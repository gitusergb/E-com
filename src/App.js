import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Navbar} from './pages/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './components/Cart';
import Order from './components/Order';
import {Login} from './components/Login';
import {Signup} from './components/Register';

const App = () => {
  return (
    < >
      <Navbar />
      <div className="content">
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup/>} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="*" element={<div>Page Not Found</div>} /> 
     
        </Routes>
      </div>
    </>
  );
};

export default App;
