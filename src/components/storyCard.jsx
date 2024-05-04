import React, { useState, useEffect, useRef } from "react";
import "./storyCard.css";
import VanillaTilt from "vanilla-tilt";

import axios from "axios";

const StoryCard = ({
  title,
  subtitle,
  isLoggedIn,
  img_url,
  editable,
  setViewStory,
  setSliderData,
  fullCardData,
  setEdit,
  setEditData,
}) => {
  // Import Axios

  // Re-run useEffect only if category changes (dependency array)
  // Re-run useEffect only if category changes
  const tiltRef = useRef(null);

  useEffect(() => {
    // Check if the reference is available
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
      });
    }

    return () => {
      if (tiltRef.current && tiltRef.current.vanillaTilt) {
        tiltRef.current.vanillaTilt.destroy();
      }
    };
  }, []);

  const clickHandler = () => {
    setSliderData(fullCardData);
    setViewStory(true);
  };
  return (
    <div
      className="storyCard"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url("${img_url}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      ref={tiltRef}
      onClick={() => clickHandler()}
    >
      <h2 className="storyheading">{title}</h2>
      <p className="storyCardCaption">{subtitle}</p>
      {isLoggedIn && editable && (
        <div className="editBtnMain">
          <div
            className="editBtn"
            onClick={(e) => {
              setEditData(fullCardData);
              setEdit(true);
              e.stopPropagation();
            }}
          >
            <img src="/assets/tabler_edit.svg" alt="" />
            <p>Edit</p>
          </div>
        </div>
      )}
    </div>
  );
};

const StoryList = ({
  isLoggedIn,
  foodstories,
  healthFitnessStories,
  travelstories,
  moviestories,
  educationstories,
  categoryType,
  userStories,
  setViewStory,
  setSliderData,
  setEdit,
  setEditData,
}) => {
  const [visiblefoodStories, setVisiblefoodStories] = useState(4);
  const [visibleHealthFitness, setVisibleHealthFitness] = useState(4);
  const [visibletravel, setVisibletravel] = useState(4);
  const [visiblemovies, setVisiblemovies] = useState(4);
  const [visibleducation, setVisibleducation] = useState(4);
  const [visibleYourStories, setVisibleYourStories] = useState(4);
  console.log(foodstories);
  console.log(healthFitnessStories);
  console.log(travelstories);
  console.log(moviestories);
  console.log(educationstories);

  const handleShowMoreYourStories = () => {
    setVisibleYourStories((prevVisibleCards) =>
      Math.min(prevVisibleCards + 4, userStories.length)
    );
  };
  const handleShowMoreStories = () => {
    setVisiblefoodStories((prevVisibleCards) =>
      Math.min(prevVisibleCards + 4, foodstories.length)
    );
  };

  const handleShowMoreHealthFitness = () => {
    setVisibleHealthFitness((prevVisibleCards) =>
      Math.min(prevVisibleCards + 4, healthFitnessStories.length)
    );
  };

  const handleShowMoreTravel = () => {
    setVisibletravel((prevVisibleCards) =>
      Math.min(prevVisibleCards + 4, travelstories.length)
    );
  };

  const handleShowMoreMovie = () => {
    setVisiblemovies((prevVisibleCards) =>
      Math.min(prevVisibleCards + 4, moviestories.length)
    );
  };

  const handleShowMoreEducation = () => {
    setVisibleducation((prevVisibleCards) =>
      Math.min(prevVisibleCards + 4, educationstories.length)
    );
  };
  const yourStoryCards = userStories
    .slice(0, visibleYourStories)
    .map((story, index) => (
      <StoryCard
        key={index}
        title={story.arrayOfStories[0].heading}
        subtitle={story.arrayOfStories[0].description}
        img_url={story.arrayOfStories[0].imgUrl}
        isLoggedIn={isLoggedIn}
        setViewStory={setViewStory}
        editable={true}
        setSliderData={setSliderData}
        fullCardData={story.arrayOfStories}
        setEdit={setEdit}
        setEditData={setEditData}
      />
    ));
  const checkEditible = (local_story_id) => {
    return userStories.some((story) => story._id === local_story_id);
  };
  const storyCards = foodstories
    .slice(0, visiblefoodStories)
    .map((story, index) => (
      <StoryCard
        key={index}
        title={story.arrayOfStories[0].heading}
        subtitle={story.arrayOfStories[0].description}
        img_url={story.arrayOfStories[0].imgUrl}
        isLoggedIn={isLoggedIn}
        editable={checkEditible(story._id)}
        setViewStory={setViewStory}
        setSliderData={setSliderData}
        fullCardData={story.arrayOfStories}
        setEdit={setEdit}
        setEditData={setEditData}
      />
    ));

  const healthFitnessCards = healthFitnessStories
    .slice(0, visibleHealthFitness)
    .map((health, index) => (
      <StoryCard
        key={index}
        title={health.arrayOfStories[0].heading}
        subtitle={health.arrayOfStories[0].description}
        img_url={health.arrayOfStories[0].imgUrl}
        isLoggedIn={isLoggedIn}
        editable={checkEditible(health._id)}
        setViewStory={setViewStory}
        setSliderData={setSliderData}
        fullCardData={health.arrayOfStories}
        setEdit={setEdit}
        setEditData={setEditData}
      />
    ));

  const travelCards = travelstories
    .slice(0, visibletravel)
    .map((travel, index) => (
      <StoryCard
        key={index}
        title={travel.arrayOfStories[0].heading}
        subtitle={travel.arrayOfStories[0].description}
        img_url={travel.arrayOfStories[0].imgUrl}
        isLoggedIn={isLoggedIn}
        editable={checkEditible(travel._id)}
        setViewStory={setViewStory}
        setSliderData={setSliderData}
        fullCardData={travel.arrayOfStories}
        setEdit={setEdit}
        setEditData={setEditData}
      />
    ));

  const movieCards = moviestories
    .slice(0, visiblemovies)
    .map((movie, index) => (
      <StoryCard
        key={index}
        title={movie.arrayOfStories[0].heading}
        subtitle={movie.arrayOfStories[0].description}
        img_url={movie.arrayOfStories[0].imgUrl}
        isLoggedIn={isLoggedIn}
        editable={checkEditible(movie._id)}
        setViewStory={setViewStory}
        setSliderData={setSliderData}
        fullCardData={movie.arrayOfStories}
        setEdit={setEdit}
        setEditData={setEditData}
      />
    ));

  const educationCards = educationstories
    .slice(0, visibleducation)
    .map((education, index) => (
      <StoryCard
        key={index}
        title={education.arrayOfStories[0].heading}
        subtitle={education.arrayOfStories[0].description}
        img_url={education.arrayOfStories[0].imgUrl}
        isLoggedIn={isLoggedIn}
        editable={checkEditible(education._id)}
        setViewStory={setViewStory}
        setSliderData={setSliderData}
        fullCardData={education.arrayOfStories}
        setEdit={setEdit}
        setEditData={setEditData}
      />
    ));

  return (
    <>
      {categoryType === "All" && (
        <div className="story-div">
          {userStories.length > 0 && (
            <>
              <div className="firstheading">Your Stories</div>
              {yourStoryCards}
              {visibleYourStories < userStories.length && (
                <div className="showmorebtn">
                  <button
                    className="show-more-button"
                    onClick={handleShowMoreYourStories}
                  >
                    See more
                  </button>
                </div>
              )}
            </>
          )}
          <div className="firstheading">Top Stories About food</div>
          {storyCards}
          {visiblefoodStories < foodstories.length && (
            <div className="showmorebtn">
              <button
                className="show-more-button"
                onClick={handleShowMoreStories}
              >
                See more
              </button>
            </div>
          )}
          <div className="firstheading">Top Stories About Health & Fitness</div>
          {healthFitnessCards}
          {visibleHealthFitness < healthFitnessStories.length && (
            <div className="showmorebtn">
              <button
                className="show-more-button"
                onClick={handleShowMoreHealthFitness}
              >
                See more
              </button>
            </div>
          )}
          <div className="firstheading">Top Stories About Travel</div>
          {travelCards}
          {visibletravel < travelstories.length && (
            <div className="showmorebtn">
              <button
                className="show-more-button"
                onClick={handleShowMoreTravel}
              >
                See more
              </button>
            </div>
          )}
          <div className="firstheading">Top Stories About Movies</div>
          {movieCards}
          {visiblemovies < moviestories.length && (
            <div className="showmorebtn">
              <button
                className="show-more-button"
                onClick={handleShowMoreMovie}
              >
                See more
              </button>
            </div>
          )}
          <div className="firstheading">Top Stories About Education</div>
          {educationCards}
          {visibleducation < educationstories.length && (
            <div className="showmorebtn">
              <button
                className="show-more-button"
                onClick={handleShowMoreEducation}
              >
                See more
              </button>
            </div>
          )}
        </div>
      )}
      {categoryType === "Food" && (
        <div className="story-div">
          <div className="firstheading">Top Stories About food</div>
          {storyCards}
          {visiblefoodStories < foodstories.length && (
            <div className="showmorebtn">
              <button
                className="show-more-button"
                onClick={handleShowMoreStories}
              >
                See more
              </button>
            </div>
          )}
        </div>
      )}
      {categoryType === "Health & Fitness" && (
        <div className="story-div">
          <div className="firstheading">Top Stories About Health & Fitness</div>
          {healthFitnessCards}
          {visibleHealthFitness < healthFitnessStories.length && (
            <div className="showmorebtn">
              <button
                className="show-more-button"
                onClick={handleShowMoreHealthFitness}
              >
                See more
              </button>
            </div>
          )}
        </div>
      )}
      {categoryType === "Travel" && (
        <div className="story-div">
          <div className="firstheading">Top Stories About Travel</div>
          {travelCards}
          {visibletravel < travelstories.length && (
            <div className="showmorebtn">
              <button
                className="show-more-button"
                onClick={handleShowMoreTravel}
              >
                See more
              </button>
            </div>
          )}
        </div>
      )}
      {categoryType === "Movie" && (
        <div className="story-div">
          <div className="firstheading">Top Stories About Movies</div>
          {movieCards}
          {visiblemovies < moviestories.length && (
            <div className="showmorebtn">
              <button
                className="show-more-button"
                onClick={handleShowMoreMovie}
              >
                See more
              </button>
            </div>
          )}
        </div>
      )}
      {categoryType === "Education" && (
        <div className="story-div">
          <div className="firstheading">Top Stories About Education</div>
          {educationCards}
          {visibleducation < educationstories.length && (
            <div className="showmorebtn">
              <button
                className="show-more-button"
                onClick={handleShowMoreEducation}
              >
                See more
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default StoryList;
