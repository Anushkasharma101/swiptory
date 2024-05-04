

const All = () => {
  const [yourData, setyourData] = useState({
    category: 'ayush',
    arrayOfStories: [
      {
        imgUrl: 'imgurl1',
        heading: 'heading1',
        description: 'description1',
        total_likes: 0,
      },
      {
        imgUrl: 'imgurl2',
        heading: 'heading2',
        description: 'description2',
        total_likes: 0,
      },
      // ... more stories
    ],
  });



  const handleSubmit = async () => {
    const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjMyZmViYzljYWEyYjk0OWFlOGU2MzYiLCJpYXQiOjE3MTQ2NTY2NjJ9.4tE3e-qjw53t3tqB_BuFmbjqOxSTmO62Pc7sfSh8ZnI';
    console.log(bearerToken);
  
    const url = 'https://swiptory-backend-nstv.onrender.com/user/storyByCategory'; // Replace with your actual API endpoint URL
    const dataToSend = JSON.stringify(yourData); // Replace with your data object
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`, // Encode the token using btoa()
        },
        body: dataToSend,
      });
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      console.log('API response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleSubmit2 = async () => {
    try {
      const response = await fetch('https://swiptory-backend-nstv.onrender.com/getStoriesByCategory', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category: 'ayush' })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const [category, setCategory] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [storyId, setStoryId] = useState('');
  const [description, setDescription] = useState('');
  const [heading, setHeading] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handle = async (category) => {
  
    try {
      const response = await fetch(`https://swiptory-backend-nstv.onrender.com/getStoriesByCategory/${category}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        throw new Error(`Registration failed with status ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log('Registration response:', responseData); // Log response for debugging
      return responseData; // Return response data if needed
    } catch (error) {
      console.error('Error registering user:', error);
      throw error; // Re-throw for potential error handling in components
    }
  };
  const updateStory = async () => {
    try {
      const response = await axios.post('https://swiptory-backend-nstv.onrender.com/stories/updateStory', {
        storyId,
        description,
        heading,
        img_url: imgUrl
      });
      console.log(response.data);
      // Handle response data
    } catch (error) {
      console.error(error);
      setErrorMessage('Error updating story');
    }
  };
  
  
