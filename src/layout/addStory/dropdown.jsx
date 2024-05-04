import React,{useState} from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './dropdown.css';

function Dropdown({selectedCategory,setSelectedCategory}) {
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
     <button onClick={toggleDropdown} className="dropbtn">
        <div className="text">{selectedCategory}</div>
        <div className="dropdown-icon">{isOpen ? <FaChevronUp /> : <FaChevronDown />}</div>
      </button>
      <div className={isOpen ? "dropdown-content show" : "dropdown-content"}>
        <a href="#" onClick={() => selectCategory('Food')}>Food</a>
        <a href="#" onClick={() => selectCategory('Health & Fitness')}>Health & Fitness</a>
        <a href="#" onClick={() => selectCategory('Travel')}>Travel</a>
        <a href="#" onClick={() => selectCategory('Movie')}>Movie</a>
        <a href="#" onClick={() => selectCategory('Education')}>Education</a>
      </div>
    </div>
  );
}

export default Dropdown;