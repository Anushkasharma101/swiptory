import React, { useState,useEffect } from "react";
import "./addStory.css";
import Dropdown from "./dropdown";

const MAX_SLIDES = 6;
const MIN_SLIDES = 3;

const AddStory = ({ setStory }) => {
  const [slides, setSlides] = useState([
    { id: 1, title: "Slide 1", category: "" },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [ImgUrl, setImgUrl] = useState("");
  const [dataList, setDataList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Select category');
const [submit,setSubmit]=useState(false);

  useEffect(() => {
    console.log("Updated DataList:", dataList);
    submit && handleSubmit(selectedCategory,dataList);
  }, [dataList]);
  
  const handleSubmit = async ({ category, arrayOfStories }) => {
    const bearerToken = localStorage.getItem("authToken");

    if(category === 'Select category'){
      alert('Please Select Category');
      return
    }
    const url =
      "https://swiptory-backend-nstv.onrender.com/user/storyByCategory"; // Replace with your actual API endpoint URL
    const dataToSend = JSON.stringify({ "category": 'Food', "arrayOfStories": dataList }); // Replace with your data object

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`, // Encode the token using btoa()
        },
        body: dataToSend,
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log(data)
      window.location.reload(); 
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddSlide = () => {
    if (slides.length < MAX_SLIDES) {
      setSlides((prevSlides) => [
        ...prevSlides,
        {
          id: prevSlides.length + 1,
          title: `Slide ${prevSlides.length + 1}`,
          category: prevSlides[0].category,
        },
      ]);
    }
  };

  const handleAddData = (newData) => {
    if(heading===''||description===''|| ImgUrl === '' ){
      alert('Please fill all the details')
    }
      
    setDataList(prevDataList => [...prevDataList, newData]);
    setHeading("");
    setDescription("");
    setImgUrl("");
  };

  const handleRemoveSlide = (id) => {
    if (slides.length > MIN_SLIDES) {
      setSlides(slides.filter((slide) => slide.id !== id));
    }
  };

  const handleChangeCategory = (category) => {
    const updatedSlides = slides.map((slide, index) => ({
      ...slide,
      category: index === 0 ? category : slide.category,
    }));
    setSlides(updatedSlides);
  };

  const handlePost = () => {
    if (slides.length < MIN_SLIDES) {
      alert("Minimum 3 slides are mandatory");
      return;
    }
    // Your post logic here
  };

  return (
    <div className="story-maindiv">
      <div className="addstoryform">
        <img
          src="./assets/Vector.jpg"
          alt="closebtn"
          className="crossbtn"
          onClick={() => setStory(false)}
        />
        <div className="slidecardlist">
          {slides.map((slide) => (
            <div key={slide.id} className="slidecard">
              <h3 className="slides">{slide.title}</h3>
              {slides.length > MIN_SLIDES && slide.id > MIN_SLIDES && (
                <button
                  className="storycrossbtn"
                  onClick={() => handleRemoveSlide(slide.id)}
                >
                   <div className="icon">
                <div class="circle"></div>
                <div class="multiply">x</div>
                </div>
                </button>
              )}
            </div>
          ))}

          {slides.length < MAX_SLIDES && (
            <button
              className="addSlideBtn"
              onClick={() => {
                handleAddData({
                  // Provide initial values for new item
                  imgUrl: ImgUrl,
                  heading: heading,
                  description: description,
                  total_likes: 0,
                });
                handleAddSlide();
              }}
            >
              Add +
            </button>
          )}
        </div>
        <div className="input-box">
          <div className="input-box1">
            <h5 className="addstoryheading">Heading :</h5>
            <input
              type="text"
              placeholder="Your heading"
              className="storyheadinginput"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            />
          </div>
          <div className="input-box2">
            <h5 className="addstorydescription">Description :</h5>
            <textarea
              type="text"
              placeholder="Story Description"
              className="storydescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="input-box3">
            <h5 className="addimage">Image :</h5>
            <input
              type="text"
              placeholder="Add Image url"
              className="addstoryimage"
              value={ImgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
          </div>
          <div className="input-box4">
            <h5 className="addcategory">Category :</h5>
            <Dropdown selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
          </div>
        </div>
        <div className="bottombar">
          <div className="addstorybtngroup">
            <button type="button" className="previousBtn">
              Previous
            </button>
            <button type="button" className="NextBtn">
              Next
            </button>
          </div>
          <button
            type="button"
            className="postBtn"
            onClick={() => {
              handleAddData({
                // Provide initial values for new item
                imgUrl: ImgUrl,
                heading: heading,
                description: description,
                total_likes: 0,
              });
              setSubmit(true);
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStory;
