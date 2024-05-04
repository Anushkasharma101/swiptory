import React, { useEffect, useState } from "react";
import AddStory from "../addStory/addStory";
import LoginResPage from "../loginRes/loginResPage";
import Slider from "../slider/slider";
import HomePage from "../home/home";
import axios from "axios";
import Loader from "../loader/loader";
import EditPost from "../editPost/editPost";

async function fetchData() {
  try {
    const response = await fetch(
      "https://swiptory-backend-nstv.onrender.com/getAllStories"
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
const Main = () => {
  const [logRes, setLogRes] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [story, setStory] = useState(false);
  const [StoriesFood, setStoriesFood] = useState([]); // Initialize stories array as empty
  const [StoriesHealth, setStoriesHealth] = useState([]); // Initialize stories array as empty
  const [StoriesTravel, setStoriesTravel] = useState([]); // Initialize stories array as empty
  const [StoriesMovie, setStoriesMovie] = useState([]); // Initialize stories array as empty
  const [StoriesEducation, setStoriesEducation] = useState([]); // Initialize stories array as empty
  const [sliderData, setSliderData] = useState([]); // Initialize
  const [edit,setEdit] = useState(false)
  const [editData,setEditData] = useState([])
  const getToken = () => {
    return localStorage.getItem("authToken");
  };
  const [userStories, setUserStories] = useState([]);
  const [userBookmarks, setUserBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookStories = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const authorizationHeader = `Bearer ${token}`;

        const response = await axios.get(
          "https://swiptory-backend-nstv.onrender.com/user/getBookmarks",
          {
            headers: {
              Authorization: authorizationHeader,
            },
          }
        );

        console.log("Response:", response); // Log the entire response object
        setUserBookmarks(response.data.bookmarks);

        if (response.ok) {
          console.log("Successfully fetched stories:", response);
        } else {
          console.error("Failed to fetch stories:", response.status);
          // Handle error
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
        // Handle error
      }
    };

    fetchBookStories();
  }, []);
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const authorizationHeader = `Bearer ${token}`;

        const response = await axios.get(
          "https://swiptory-backend-nstv.onrender.com/stories/UserId/",
          {
            headers: {
              Authorization: authorizationHeader,
            },
          }
        );

        console.log("Response:", response); // Log the entire response object
        setUserStories(response.data.stories);

        if (response.ok) {
          console.log("Successfully fetched stories:", response);
        } else {
          console.error("Failed to fetch stories:", response.status);
          // Handle error
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
        // Handle error
      }
    };

    fetchStories();
  }, []);
  useEffect(() => {
    console.log(getToken());
    if (getToken() !== null) {
      setIsLoggedIn(true);
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [viewStory, setViewStory] = useState(false);

  useEffect(() =>{
    const fetchData = async ({ category }) => {
      try {
        const response = await axios.get(
          `https://swiptory-backend-nstv.onrender.com/getStoriesByCategory/${category}`
        );

        const data = await response.data; // Access data directly from Axios response

        if (!data || !data.stories) {
          console.error("Failed to fetch stories or invalid response format");
          return; // Handle error gracefully (display error message, etc.)
        }
        // Update stories array based on category (assuming separate state variables)
        switch (category) {
          case "Food":
            setStoriesFood(data.stories);
            break;
          case "Health":
            setStoriesHealth(data.stories);
            break;
          case "Travel":
            setStoriesTravel(data.stories);
            break;
          case "Movie":
            setStoriesMovie(data.stories);
            break;
          case "Education":{
            setStoriesEducation(data.stories);
            setisLoading(false);}
            break;
          default:
            console.warn("Unknown category:", category);
        }
        // console.log(data.stories);
      } catch (error) {
        console.error("Error fetching stories:", error);
        // Handle error gracefully (display error message, etc.)
      }
    };

    fetchData({ category: "Food" }); // Fetch data for "Food" category on mount
    fetchData({ category: "Health" }); // Fetch data for "Food" category on mount
    fetchData({ category: "Travel" }); // Fetch data for "Food" category on mount
    fetchData({ category: "Movie" }); // Fetch data for "Food" category on mount
    fetchData({ category: "Education" }); // Fetch data for "Food" category on mount
    // You can optionally call fetchData for other categories here
    
  }, []);
  useEffect(() => {
    const fetchDataAsync = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    fetchDataAsync();
  }, []);

  return (
    isLoading? <Loader/>
    :<>
      {/* <AddStory/> */}
      {}
      <HomePage
        setLogRes={setLogRes}
        isLoggedIn={isLoggedIn}
        setStory={setStory}
        story={story}
        foodstories={StoriesFood}
        healthFitnessStories={StoriesHealth}
        travelstories={StoriesTravel}
        moviestories={StoriesMovie}
        educationstories={StoriesEducation}
        userStories={userStories}
        userBookmarks={userBookmarks}
        setViewStory={setViewStory}
        setSliderData={setSliderData}
        setEdit={setEdit}
        setEditData={setEditData}
      />
      {viewStory && <Slider data={sliderData} setViewStory={setViewStory} isLoggedIn={isLoggedIn}/>}
      {logRes === "Login" && (
        <LoginResPage
          title={"Login"}
          setLogRes={setLogRes}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
      {logRes === "Register Now" && (
        <LoginResPage
          title={"Register"}
          setLogRes={setLogRes}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
      {story && <AddStory setStory={setStory}/>}
      {edit && <EditPost data={editData} setStory={setEdit}/>}
      {/* <ImageSlider images={images} /> 
      {/* <LoginResPage/> */}
    </>
  );
};

export default Main;
