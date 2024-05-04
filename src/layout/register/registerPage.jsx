import React from 'react'
import { RxEyeOpen } from "react-icons/rx";

const RegisterPage = () =>{
  return (
    <div className="mainlogindiv">
    <div className="container">
    <img src="./assets/Vector.jpg" alt="close button" />
    <h1 className="title">Register to Swiptory</h1>
    <form>
      <div className="input-field">
      <p>Username</p>
        <input
          type="text"
         placeholder="Enter username"
          
        />
      </div>
      <div className="input-field">
      <p>Password</p>
        <input
          type="password"
         placeholder="Enter password"
        />
        <RxEyeOpen className="password-eye-icon"/>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
  </div>
  )
}

export default RegisterPage;
