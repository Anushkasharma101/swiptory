import React, { useState, useEffect } from "react";
import axios from "axios";
import './editPost.css';

const EditPost = ({ data, setStory }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [ImgUrl, setImgUrl] = useState("");
  const [dataList, setDataList] = useState(data);

  // Update state values when the current index changes
  useEffect(() => {
    if (dataList[currentIndex]) {
      setHeading(dataList[currentIndex].heading);
      setDescription(dataList[currentIndex].description);
      setImgUrl(dataList[currentIndex].imgUrl); // Ensure the property name matches your data structure
    }
  }, [currentIndex, dataList]);

  const updateStory = async () => {
    try {
      const id = dataList[currentIndex]._id;
      console.log(id);
      const token = localStorage.getItem('authToken'); // Replace 'YOUR_BEARER_TOKEN' with your actual token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.put(
        "https://swiptory-backend-nstv.onrender.com/stories/updateStory",
        {
          storyId: id,
          description,
          heading,
          img_url: ImgUrl,
        },
        config
      );
      console.log(response.data);
      setStory(false);
      // Handle response data
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="edit-story-maindiv">
      <div className="edit-addstoryform">
        <img
          src="./assets/Vector.jpg"
          alt="closebtn"
          className="edit-crossbtn"
          onClick={() => setStory(false)}
        />
        <div className="edit-slidecardlist">
          {dataList.map((_, index) => (
            <div
              onClick={() => setCurrentIndex(index)}
              key={index}
              className="edit-slidecard"
            >
              <h3 className="edit-slides">Slide {index}</h3>
            </div>
          ))}
        </div>

        <div className="edit-input-box">
          <div className="edit-input-box1">
            <h5 className="edit-addstoryheading">Heading :</h5>
            <input
              type="text"
              placeholder="Your heading"
              className="edit-storyheadinginput"
              value={heading} // Use state value
              onChange={(e) => setHeading(e.target.value)}
            />
          </div>
          <div className="edit-input-box2">
            <h5 className="edit-addstorydescription">Description :</h5>
            <textarea
              type="text"
              placeholder="Story Description"
              className="edit-storydescription"
              value={description} // Use state value
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="edit-input-box3">
            <h5 className="edit-addimage">Image :</h5>
            <input
              type="text"
              placeholder="Add Image url"
              className="edit-addstoryimage"
              value={ImgUrl} // Use state value
              onChange={(e) => setImgUrl(e.target.value)}
            />
          </div>
        </div>
        <div className="edit-bottombar">
          <button
            type="edit-button"
            className="edit-postBtn"
            onClick={updateStory} // Call updateStory directly
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
