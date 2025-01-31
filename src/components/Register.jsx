import React from "react";
import  { useState } from 'react';
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const Signup= (e) => {
  e.preventDefault();
  const navigate = useNavigate();
const [fullname,setfullname]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
    
      const handleSubmit = async() => {
          const payload={
            fullname,email,password
          }
       // e.preventDefault();
        console.log(payload)
       //console.log()
       fetch("http://localhost:9000/users/register",{
        method:'POST',
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(payload)

       }).then(res=>res.json()).then(data=>{
        console.log(data.registeredUser)
        const { fullname,email,_id} = data.registeredUser;
        toast.success("SignUp successful");
        localStorage.setItem('email', email);
        localStorage.setItem('fullname', fullname);
     
        navigate("/login")}

       ).catch(err=>console.log(err))


      };
  return (
    <DIV>
        <h3>Sign Up </h3>
    <input data-testid="user-name"
    type="text" 
    name="fullname"
    value={fullname} 
    placeholder="User Name"
    onChange={(e)=>setfullname(e.target.value)}
    required/>
    <input  data-testid="user-email" 
      type="email"
      name="email"
       placeholder="Email" 
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
       required/>
    <input  data-testid="user-password"
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required/>
    <button  onClick={handleSubmit} >Register</button>
    </DIV>
  );
};
const DIV = styled.div`
background-color: #d5e8e6;
margin-top: 30px;
color:#4d3b4a;
  width: 450px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  gap: 15px;
  align-items: center;
  box-shadow: rgba(92, 72, 89, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  input {
    width: 80%;
    height: 30px;
    font-size: larger;
    border-color: #bacac9;
  }
  button {
    background-color:#5c4859;
    color:#e2e9e8;
    width: 150px;
    height: 50px;
    padding: 5px;
    font-size: large;
    border-color: #bacac9;
    border-radius: 10px;
  }
`;