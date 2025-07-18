import React, { useState, useEffect } from 'react'; 
import cover from '../../src/asset/imgg/Australia.png';
import cover1 from '../../src/asset/imgg/ca1.png';
import cover2 from '../../src/asset/imgg/canada.png';
import cover3 from '../../src/asset/imgg/ca2.png';
import { Link } from 'react-router-dom'
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);

  const images = [cover, cover1, cover2, cover3];
  const text = [
     'Where Every Post Tells a Story',
     '',
    'Discover amazing stories, share your thoughts, and connect with writers from around the world. Join our community of passionate storytellers today.'
  ];

  // Split the third text into words
  const words = text[2].split(' ');

  // Word-by-word effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (wordIndex < words.length) {
        setDisplayedText((prevText) => prevText + words[wordIndex] + ' ');
        setWordIndex((prevIndex) => prevIndex + 1);
      }
    }, 500); // Change words every 500ms (0.5 seconds)

    return () => clearInterval(interval);
  }, [wordIndex, words]);

  // Autoplay Logic for images
  useEffect(() => {
    const autoplay = setInterval(() => {
      handleNext();
    }, 5000); // Change slides every 5 seconds
    return () => clearInterval(autoplay); // Cleanup on component unmount
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between   h-autop-8">
      {/* Left Section with Text */}
      <div className="flex flex-col items-start w-full lg:w-1/2 pr-8 space-y-6 lg:ml-16 lg:mt-14">
        <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 transition-transform transform hover:scale-105">{text[0]}</h2>
        <h3 className="text-3xl lg:text-4xl font-semibold text-orange-500">{text[1]}</h3>
        <p className="text-lg font-medium text-gray-700 h-24 overflow-hidden transition-all ease-in-out duration-500">
          {displayedText}
        </p>

        {/* Buttons */}
        <div className="flex space-x-4">
          <Link to="/apply">
 <button
  style={{ backgroundColor: '#159A9C' }}
  className="text-white  p-4 px-6 py-3 rounded-md hover:bg-orange-600 transition duration-300 transform hover:scale-105"
>
Explore More</button>

          </Link>
         
  
        </div>
      </div>

      {/* Carousel Section */}
      <div id="default-carousel" className="relative w-full lg:w-1/2 mt-6 lg:mt-0">
        <div className="relative mx-auto h-56 sm:h-72 md:h-96 lg:h-128 w-full lg:w-96 overflow-hidden rounded-lg border-8 border-white shadow-xl transform hover:scale-105 transition-transform duration-500">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src={img}
                className="block w-full h-full object-cover object-center"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="absolute z-30 flex space-x-3 bottom-5 left-1/2 transform -translate-x-1/2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Previous Button */}
        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none invisible"
          onClick={handlePrev}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>

        {/* Next Button */}
        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none invisible"
          onClick={handleNext}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 9l4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
