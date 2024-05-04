import "./bookmark.css";
import React, { useEffect, useState } from "react";

const Bookmark = ({
  bookmark,
  foodstories,
  healthFitnessStories,
  travelstories,
  moviestories,
  educationstories,
}) => {
  const StoryCard = ({ key, story }) => {
    const { imgUrl, heading, description } = story;
    return (
      <div
        key={key}
        className="bookmark-card"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url("${imgUrl}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="card-content">
          <h3 className="card-heading">{heading}</h3>
          <p className="card-description">{description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="main-bookmark-div">
      <div className="top-heading-div">
        <h2>Your Bookmarks</h2>
      </div>
      <div className="main-body">
        {foodstories.map((category, index) =>
          category.arrayOfStories.map(
            (story) =>
              bookmark.includes(story._id) && (
                <StoryCard key={story._id} story={story} />
              )
          )
        )}
        {healthFitnessStories.map((category, index) =>
          category.arrayOfStories.map(
            (story) =>
              bookmark.includes(story._id) && (
                <StoryCard key={story._id} story={story} />
              )
          )
        )}
        {travelstories.map((category, index) =>
          category.arrayOfStories.map(
            (story) =>
              bookmark.includes(story._id) && (
                <StoryCard key={story._id} story={story} />
              )
          )
        )}
        {moviestories.map((category, index) =>
          category.arrayOfStories.map(
            (story) =>
              bookmark.includes(story._id) && (
                <StoryCard key={story._id} story={story} />
              )
          )
        )}
        {educationstories.map((category, index) =>
          category.arrayOfStories.map(
            (story) =>
              bookmark.includes(story._id) && (
                <StoryCard key={story._id} story={story} />
              )
          )
        )}
      </div>
    </div>
  );
};

export default Bookmark;
