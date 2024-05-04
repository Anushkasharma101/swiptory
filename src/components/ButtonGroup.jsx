import React from "react";
import "./ButtonGroup.css";

const Button = ({ text, color, setLogRes, setIsLoggedIn,username,password,setOpenBookmark,openBookmark,setStory }) => {
  const registerUser = async (username, password) => {
    try {
      const response = await fetch('https://swiptory-backend-nstv.onrender.com/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password }),
      });
  
      if (!response.ok) {
        throw new Error(`Registration failed with status ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log('Registration response:', responseData);
      console.log(`tokennnnnnnn` + responseData.token) // Log response for debugging
      localStorage.setItem('authToken', responseData.token)

      localStorage.setItem('bookmarks',JSON.stringify([]))
      localStorage.setItem('likes', JSON.stringify([]))

      console.log("getting tokennsssss"+getToken());
      window.location.reload();
      return responseData; // Return response data if needed
    } catch (error) {
      console.error('Error registering user:', error);
      throw error; // Re-throw for potential error handling in components
    }
  };
  
  const LoginUser = async (username, password) => {
    try {
      const response = await fetch('https://swiptory-backend-nstv.onrender.com/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password }),
      });
  
      if (!response.ok) {
        throw new Error(`Registration failed with status ${response.status}`);
      }

      
      const responseData = await response.json();
      console.log(responseData.bookmarks,responseData.likes);
      console.log('Registration response:', responseData); // Log response for debugging
      localStorage.setItem('authToken', responseData.token)
      localStorage.setItem('bookmarks',JSON.stringify(responseData.bookmarks))
      localStorage.setItem('likes',JSON.stringify(responseData.likes) )
      window.location.reload();
      return responseData; // Return response data if needed
    
    } catch (error) {
      console.error('Error registering user:', error);
      throw error; // Re-throw for potential error handling in components
    }
  };
  const getToken = () => {
    return localStorage.getItem('authToken');
  
  };
  const btnHandler = () => {
    if (text === "Register Now") {
      setLogRes("Register Now");
    } else if (text === "InternalRegisterBtn") {
      setLogRes("");
      registerUser(username, password);
      setIsLoggedIn(true);
    } else if (text === "InternalLoginBtn") {
      setLogRes("");
      LoginUser(username, password);
      setIsLoggedIn(true);
    }else if(text === "Add story"){
      setStory(true);
    }else if(text === "Bookmarks"){
      setOpenBookmark(!openBookmark);
    } else {
      setLogRes("Login");
    }
  };

  return (
    <div
      className="btn"
      style={{
        backgroundColor: color,
        color: text === "Login" ? "black" : "white",
      }}
      onClick={() =>  btnHandler()}
    >
      {text === "Bookmarks" ? (
        <div className="bookmarkIconDiv">
          <img src="/assets/bookmark.svg" alt="bookmark icon" />
          <div><p>Bookmark</p></div>
        </div>
      ) : text === "InternalRegisterBtn"?"Register":
      text === "InternalLoginBtn"?"Login":
      (
        text
      )}
    </div>
  );
};

export default Button;
