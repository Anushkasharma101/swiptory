import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './layout/main/main';
import DynamicPage from './dynamiclinks';


function App() {
  return <div className='mainDiv'>
    <Router>
      <Routes>
        <Route path="/" element={<Main/>} />  
        {/* Default route */}
        {/* <Route path="/" element={<All/>} /> */}
        <Route path="/:storyId" element={<DynamicPage/>} />
        {/* Dynamic route */}
      </Routes>
    </Router>
  </div>
}
export default App;
