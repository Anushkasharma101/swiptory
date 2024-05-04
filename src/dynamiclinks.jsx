import React, { useState, useEffect } from "react";
import "./layout/slider/slider.css";
import useIsMobile from "./layout/customhooks/customhook";
import { RxCross1 } from "react-icons/rx";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import { useParams } from "react-router-dom";

const DynamicLiks = () => {
  const [currentSliderIndex, setCurrentSliderIndex] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const isMobile = useIsMobile();
  const { storyId } = useParams("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [id, setId] = useState("");
  const [total_likes, setTotalLikes] = useState("");
  const [likedList, setLikedList] = useState([]);
  const [bookmarkList, setBookmarkList] = useState([]);

  useEffect(() => {
    const bookmarks = localStorage.getItem("bookmarks");
    if (bookmarks) {
      setBookmarkList(JSON.parse(bookmarks));
    } else {
      setBookmarkList([]);
    }
    const likes = localStorage.getItem("likes");
    if (likes) {
      setLikedList(JSON.parse(likes));
    } else {
      setLikedList([]);
    }
  }, [likedList, bookmarkList]);

  useEffect(() => {
    async function fetchStoryData() {
      try {
        const response = await axios.get(
          `https://swiptory-backend-nstv.onrender.com/stories/StoryId/${storyId}`
        );
        const res = await response.data;
        console.log("Fetched story data:", res);
        setHeading(res.heading);
        setDescription(res.description);
        setImgUrl(res.imgUrl);
        setId(res._id);
        setTotalLikes(res.total_likes);
        return await response.data;
      } catch (error) {
        console.error("Error fetching story data:", error);
        return {}; // Or return an empty object for error handling
      }
    }
    fetchStoryData();
  }, [storyId]);

  async function bookmarkStory(storyId, bearerToken) {
    const url = "https://swiptory-backend-nstv.onrender.com/bookmark";

    // Create the request object with headers
    const options = {
      method: "PUT", // Use PUT for liking a story
      headers: {
        "Content-Type": "application/json", // Set content type for JSON body
        Authorization: `Bearer ${bearerToken}`, // Include bearer token in authorization header
      },
      body: JSON.stringify({ storyId }), // Stringify the story ID object
    };

    try {
      if (localStorage.getItem("authToken") === null) {
        alert("please signUp or SignIn");
        return;
      }
      const response = await fetch(url, options);

      if (!response.ok) {
        // Handle errors appropriately (e.g., throw an exception)
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data.user.bookmark);
      setBookmarkList(data.user.bookmark);
      if (data.user.bookmark) {
        localStorage.setItem("bookmarks", JSON.stringify(data.user.bookmark));
      }

      return data; // Return the parsed JSON response
    } catch (error) {
      console.error("Error bookmark story:", error);
      throw error; // Re-throw the error for handling in the calling code
    }
  }
  async function likeStory(storyId, bearerToken) {
    if (localStorage.getItem("authToken") === null) {
      alert("please signUp or SignIn");
      return;
    }
    const url = "https://swiptory-backend-nstv.onrender.com/stories/likeStory";

    // Create the request object with headers
    const options = {
      method: "PUT", // Use PUT for liking a story
      headers: {
        "Content-Type": "application/json", // Set content type for JSON body
        Authorization: `Bearer ${bearerToken}`, // Include bearer token in authorization header
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
      setLikedList(data.user.likes);
      localStorage.setItem("likes", JSON.stringify(data.user.likes));

      return data; // Return the parsed JSON response
    } catch (error) {
      console.error("Error liking story:", error);
      throw error; // Re-throw the error for handling in the calling code
    }
  }

  function copyToClipboard(text) {
    if (!navigator.clipboard) {
      console.error("Clipboard API not supported");
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setToastVisible(true);
        setTimeout(() => {
          // This function will be executed after 3 seconds
          setToastVisible(false);
        }, 3000);
        console.log("Text copied to clipboard successfully");
      })
      .catch((err) => {
        alert("Failed to copy text to clipboard:", err.message);
        console.error("Failed to copy text to clipboard:", err);
      });
  }

  return (
    <div className="slider-main-div">
      {!isMobile && (
        <div className="left-btn">
          <img src="/assets/leftarrow.png" alt="left arrow" />
        </div>
      )}

      <div
        className="slide"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),url('${imgUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="wrapper">
          <div className="top-div">
            <div className="progress-bar-group">
              <div className={"progress-bar"} />
            </div>
            <div className="top-bar">
              <RxCross1 className="closestorybtn" />
              <FiSend
                className="sendbtn"
                onClick={() => copyToClipboard("https://swiptory-nine.vercel.app/" + id)}
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
              <h2>{heading}</h2>
            </div>
            <div className="content">
              <p>{description}this is my first description</p>
            </div>
            <div className="bottomBar">
              <div
                className="bookmark"
                onClick={() => {
                  localStorage.getItem("authToken") !== null
                    ? bookmarkStory(id, localStorage.getItem("authToken"))
                    : alert("Please Login or Signup");
                }}
              >
                {bookmarkList.includes(id) ? (
                  <img src="/assets/bookmarkSelected.svg" alt="bookmark" />
                ) : (
                  <img src="/assets/bookmark.png" alt="bookmark" />
                )}
              </div>
              <div className="like">
                <div
                  className="likeDiv"
                  onClick={() => {
                    localStorage.getItem("authToken") !== null
                      ? likeStory(id, localStorage.getItem("authToken"))
                      : alert("Please Login or Signup");
                  }}
                >
                  {likedList.includes(id) ? (
                    <img src="/assets/likeSelected.svg" alt="like" />
                  ) : (
                    <img src="/assets/like.png" alt="like" />
                  )}
                </div>
                <p>{total_likes}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isMobile && (
        <div className="right-btn">
          <img src="/assets/rightarrow.png" alt="right arrow" />
        </div>
      )}
    </div>
  );
};

export default DynamicLiks;
