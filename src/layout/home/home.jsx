import React, { useState, useEffect } from "react";
import "./home.css";
import Button from "../../components/ButtonGroup";
import CategoryList from "../../components/categoryCard";
import StoryList from "../../components/storyCard";
import Bookmark from "../bookmark/bookmark";

const headings = [
  {
    headingText: "Top Stories About Food",
    subHeadingText: "No stories Available",
  },
  {
    headingText: "Top Stories About Health & Fitness",
    subHeadingText: "No stories Available",
  },
];

const HeadingSubheading = ({ headingText, subHeadingText }) => {
  return (
    <div className="spacedHeadings">
      <div>
        <h3 className="heading">{headingText}</h3>
      </div>
      <div>
        <p className="subHeading">{subHeadingText}</p>
      </div>
    </div>
  );
};

const HomePage = ({
  setLogRes,
  isLoggedIn,
  setStory,
  foodstories,
  healthFitnessStories,
  travelstories,
  moviestories,
  educationstories,
  userStories,
  userBookmarks,
  setViewStory,
  setSliderData,
  setEdit,
  setEditData
}) => {

  console.log("yoyoyoyooy");
  console.log(userStories);

  const [showHamburger, setShowHamburger] = useState(false);
  const [userName, setUserName] = useState("Your Name");
  const [categoryType, setCategoryType] = useState("All");
  const [openBookmark, setOpenBookmark] = useState(false)
  const handleLogout = () => {
    // setShowHamburger(!showHamburger);
  };
  
  const deleteToken = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem('bookmarks');
    localStorage.removeItem("likes");
    window.location.reload(false);
  };
console.log("bookmarksssss",userBookmarks);
  return (
    <div className="main-homeDiv">
      <div className="topNavBar">
        <div className="logodiv">
          <img src="./assets/logo.jpeg" alt="logoimg" className="logo" />
        <h2 className="swiptory">SwipTory</h2>
        </div>
        {!isLoggedIn ? (
          <div className="btn-div">
            <Button
              text={"Register Now"}
              color={"#FF7373"}
              setLogRes={setLogRes}
            />
            <Button text={"Sign In"} color={"#73ABFF"} setLogRes={setLogRes} />
          </div>
        ) : (
          <div className="loggedInBtnDiv">
            <Button
              text={"Bookmarks"}
              color={"#FF7373"}
              setLogRes={setLogRes}
              setOpenBookmark={setOpenBookmark}
              openBookmark={openBookmark}
            />
            <Button
              text={"Add story"}
              color={"#FF7373"}
              setLogRes={setLogRes}
              setStory={setStory}
            />

            <div className="avatarDiv">
              <img
                src="./assets/profileimage.jpg"
                alt="profile_image"
                className="profile_image"
              />
            </div>
            <div
              className="hamburgerIcon"
              onClick={() => setShowHamburger(!showHamburger)}
            >
              <img src="assets/hambergerIcon.svg" alt="ham icon" />
              {showHamburger && (
                <div className="logoutDiv">
                  <div className="logout">
                    <h4 onClick={() => deleteToken()}>LogOut</h4>
                    </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {openBookmark ?
      <Bookmark
      bookmark={userBookmarks}
      foodstories={foodstories}
      healthFitnessStories={healthFitnessStories}
      travelstories={travelstories}
      moviestories={moviestories}
      educationstories={educationstories}
      /> :
      <>
      <CategoryList setCategoryType={setCategoryType} />
      <StoryList
        isLoggedIn={isLoggedIn}
        foodstories={foodstories}
        healthFitnessStories={healthFitnessStories}
        travelstories={travelstories}
        moviestories={moviestories}
        educationstories={educationstories}
        categoryType={categoryType}
        userStories={userStories}
        setViewStory={setViewStory}
        setSliderData={setSliderData}
        setEdit={setEdit}
        setEditData={setEditData}
      />
      </>}
      
    </div>
  );
};

export default HomePage;
