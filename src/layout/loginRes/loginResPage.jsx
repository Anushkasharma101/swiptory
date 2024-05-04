import React, { useState } from "react";
import "./loginResPage.css";
import { RxEyeOpen,RxEyeClosed } from "react-icons/rx";
import Button from "../../components/ButtonGroup";


const LoginResPage = ({ title, setLogRes,setIsLoggedIn }) => {
const [passwordField,setPasswordField] = useState('');
const [userNameField,setUsernameField] = useState('');
const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword); // Toggle the state to show/hide password
};

  return (
    <div className="mainlogindiv">
      <div className="container">
        <div className="logindiv">
          <div className="closebtn-div">
            <img src="./assets/Vector.jpg" alt="close btn" className="closebtn" onClick={()=>setLogRes('')}/>
          </div>
          <div className="titlelogin">{title} to SwipTory</div>
          <div className="loginform">
            <div className="input-field">
              <div className="username">Username</div>
              <input type="text" placeholder="Enter username" className="enter_username" onChange={(e)=>setUsernameField(e.target.value)}/>
            </div>
            <div className="input-field">
              <div className="password">Password</div>
              <div className="password-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="enter_password"
                  onChange={(e) => setPasswordField(e.target.value)}
                ></input>
                <div className="passwordhide" onClick={togglePasswordVisibility} >
                {showPassword ? <RxEyeClosed className="passwordhideicon" /> : <RxEyeOpen className="passwordhideicon" />}
                </div>
              </div>
            </div>
            <div className="loginbtn">
            <Button text={title === 'Register'?'InternalRegisterBtn':'InternalLoginBtn'} color={"#73ABFF"} setLogRes={setLogRes} setIsLoggedIn={setIsLoggedIn}
            username={userNameField} password={passwordField}
            />
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginResPage;
