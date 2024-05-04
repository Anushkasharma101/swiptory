import React, { useState, useEffect } from "react";
import "./slider.css";
import useIsMobile from "../customhooks/customhook";
import { RxCross1 } from "react-icons/rx";
import { FiSend } from "react-icons/fi";


const Slider = ({data,setViewStory, isLoggedIn}) => {
  const [currentSliderIndex, setCurrentSliderIndex] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const isMobile = useIsMobile();
  const [likedList, setLikedList] = useState([]);
  const [bookmarkList, setBookmarkList] = useState([]);
  const [totalLikes,setTotalLikes] = useState(0)

   async function bookmarkStory(storyId, bearerToken) {
    const url = 'https://swiptory-backend-nstv.onrender.com/bookmark';
  
    // Create the request object with headers
    const options = {
      method: 'PUT', // Use PUT for liking a story
      headers: {
        'Content-Type': 'application/json', // Set content type for JSON body
        'Authorization': `Bearer ${bearerToken}`, // Include bearer token in authorization header
      },
      body: JSON.stringify({ storyId }), // Stringify the story ID object
    };
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        // Handle errors appropriately (e.g., throw an exception)
        throw new Error(`API request failed with status: ${response.status}`);
      }
  
      const data = await response.json();

      console.log(data.user.bookmark);
      setBookmarkList(data.user.bookmark)
      
      localStorage.setItem('bookmarks',JSON.stringify(data.user.bookmark))

      return data; // Return the parsed JSON response
    } catch (error) {
      console.error('Error bookmark story:', error);
      throw error; // Re-throw the error for handling in the calling code
    }
  }
  async function likeStory(storyId, bearerToken) {
    const url = 'https://swiptory-backend-nstv.onrender.com/stories/likeStory';
  
    // Create the request object with headers
    const options = {
      method: 'PUT', // Use PUT for liking a story
      headers: {
        'Content-Type': 'application/json', // Set content type for JSON body
        'Authorization': `Bearer ${bearerToken}`, // Include bearer token in authorization header
      },
      body: JSON.stringify({ storyId }), // Stringify the story ID object
    };
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        // Handle errors appropriately (e.g., throw an exception)
        throw new Error(`API request failed with status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
      setLikedList(data.user.likes)
      localStorage.setItem('likes',JSON.stringify(data.user.likes))
      setTotalLikes(data.total_likes)
      return data; // Return the parsed JSON response

    } catch (error) {

      console.error('Error liking story:', error);
      throw error; // Re-throw the error for handling in the calling code
    
    }
  }
  
const leftButtonHandler = ()=>{
  
  if(currentSliderIndex > 0){
  setCurrentSliderIndex((prevIndex) => prevIndex - 1);
}
}
const RightButtonHandler = ()=>{
  if(currentSliderIndex < data.length-1){
  setCurrentSliderIndex((prevIndex) => prevIndex + 1);
}
}
function copyToClipboard(text) {
  if (!navigator.clipboard) {
    console.error('Clipboard API not supported');
    return;
  }

  navigator.clipboard.writeText(text)
    .then(() => {
      setToastVisible(true);
    setTimeout(() => {
      // This function will be executed after 3 seconds
      setToastVisible(false);
    }, 3000);
      console.log('Text copied to clipboard successfully');
    })
    .catch(err => {
      alert('Failed to copy text to clipboard:',err.message);
      console.error('Failed to copy text to clipboard:', err);
    });
}

useEffect(() => {
  const bookmarks = localStorage.getItem('bookmarks');
  if(bookmarks){
  setBookmarkList(JSON.parse(bookmarks))
  }else{
    setBookmarkList([])
  }
  const likes = localStorage.getItem('likes');
  if(likes){
  setLikedList(JSON.parse(likes ||[]))
  }else{
    setLikedList([])
  }
}, [likedList,bookmarkList])


  useEffect(() => {

    

    if (currentSliderIndex < data.length -1) {
      const intervalId = setInterval(() => {
        console.log(currentSliderIndex);
        setCurrentSliderIndex((prevIndex) => prevIndex + 1);
      }, 3000); // Update every 3 seconds (3000 milliseconds)
      return () => clearInterval(intervalId);
    }
    // Cleanup function to clear the interval on component unmount
  }, [currentSliderIndex]);
  return (
    <div className="slider-main-div">
      {!isMobile && (
        <div className="left-btn">
          <img src="/assets/leftarrow.png" alt="left arrow" onClick={()=> leftButtonHandler()}/>
        </div>
      )}

      <div
        className="slide"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),url(${data[currentSliderIndex].imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="wrapper">
          <div className="top-div">
            <div className="progress-bar-group">
              {data.map((_, index) => (
                <div
                  key={index}
                  className={
                    index === currentSliderIndex
                      ? "progress-bar"
                      : "progress-bar-disable"
                  }
                />
              ))}
            </div>
            <div className="top-bar">
              <RxCross1 className="closestorybtn" onClick={()=>{setViewStory(false)}}/>
              <FiSend className = "sendbtn" onClick={() => copyToClipboard('https://swiptory-nine.vercel.app/' + data[currentSliderIndex]._id)}
                
              />
            </div>
          </div>
          <div className="bottom-div">
            <div className="toast-main-div">
              {toastVisible && (
                <div className="toast-div">
                  <h4>Link copied to clipboard</h4>
                </div>
              )}
            </div>
            <div className="heading">
              <h2>{data[currentSliderIndex].heading}</h2>
            </div>
            <div className="content">
              <p>{data[currentSliderIndex].content}this is my first description</p>
            </div>
            <div className="bottomBar">
              <div
                className="bookmark"
                onClick={() => {
                  isLoggedIn?
                  bookmarkStory(data[currentSliderIndex]._id,localStorage.getItem('authToken'))
                : alert('Please Login or Register')  
                }}
              >
                {bookmarkList.includes(data[currentSliderIndex]._id) ? (
                  <img src="/assets/bookmarkSelected.svg" alt="bookmark" />
                ) : (
                  <img src="/assets/bookmark.png" alt="bookmark" />
                )}
              </div>
              <div className="like">
                <div className="likeDiv" onClick={() => {
                  isLoggedIn ?
                  likeStory(data[currentSliderIndex]._id,localStorage.getItem('authToken')):
                  alert('Please Login or Register')

                  }}>
                  {likedList.includes(data[currentSliderIndex]._id) ? (
                    <img src="/assets/likeSelected.svg" alt="like" />
                  ) : (
                    <img src="/assets/like.png" alt="like" />
                  )}
                </div>
                <p>{totalLikes}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isMobile && (
        <div className="right-btn">
          <img src="/assets/rightarrow.png" alt="right arrow" onClick={()=>RightButtonHandler()}/>
        </div>
      )}
    </div>
  );
};

export default Slider;
