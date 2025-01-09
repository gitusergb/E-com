import React from 'react';
import './Navbar.css'; 
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/authContext";


export const Navbar = () => {
 
  const navigate = useNavigate();
  const { isLoggedIn, login ,logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };
  return (
    <div>
   
    
      {isLoggedIn ? (
       
        <nav className="navbar">
     <a href="/"> <div className="navbar-logo">
        <h2>E-Commerce</h2>
      </div></a>
      <ul className="navbar-links">
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
        <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
      ) : (
        <DIV>
          <a href="/"> <div className="navbar-logo">
        <h2>E-Commerce</h2>
      </div></a>
          {/* <Link to={"/login"}>Login</Link> */}
         
          </DIV>
      )}
    
      <ToastContainer />
   
    </div>
  );
};

const DIV = styled.div`
 background-color: #d9e9e8;

 border-color: rgb(92, 72, 89);
 color: rgb(92, 72, 89);
padding: 0.7rem 1rem;
justify-content :space-around;
  display: flex;
  gap: 20px;
  align-items:center;
  cursor: pointer;
  box-shadow: rgba(92, 72, 89, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  a {
    color: rgb(92, 72, 89);
  text-decoration: none;
}
button {
    background-color:#5c4859;
    color:#e2e9e8;
    width: 150px;
    height: 40px;
    padding: 5px;
    font-size: large;
    border-color: #bacac9;
    border-radius: 10px;
  }
`;

