import React, { useEffect, useState } from 'react';
import './categoryCard.css';

const categories = [
  { category: 'All', image: './assets/All.jpg', alt: 'All categories' },
  { category: 'Food', image: './assets/food.jpg', alt: 'Food category' },
  { category: 'Health & Fitness', image: './assets/health.jpg', alt: 'Health & Fitness category' },
  { category: 'Travel', image: './assets/travel.jpg', alt: 'Travel category' },
  { category: 'Movie', image: './assets/movie.jpg', alt: 'Movie category' },
  { category: 'Education', image: './assets/education.jpg', alt: 'Education category' },
];

const Card = ({ category, image, isSelected, handleClick }) => {
  return (
    <div
      className="categoryCard"
      onClick={handleClick}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        border: isSelected ? '2px solid #FF7272' : '2px solid white',
      }}
    >
      <p className='para'>{category}</p>
    </div>
  );
};

const CategoryList = ({ setCategoryType }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryClick = (category) => {
    setCategoryType(category);
    setSelectedCategory(category);
  };

  return (
    <div className="category">
      {categories.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          category={card.category}
          isSelected={selectedCategory === card.category}
          handleClick={() => handleCategoryClick(card.category)}
        />
      ))}
    </div>
  );
};

export default CategoryList;
