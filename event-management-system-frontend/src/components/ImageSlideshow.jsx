// src/components/ImageSlideshow.jsx
import { useState, useEffect } from 'react';

const images = [
  '/Images/Slide1.jpg',
  '/Images/Slide2.jpg',
  '/Images/Slide3.jpg',
  '/Images/Slide4.jpg',

]; // replace with your actual image paths

const ImageSlideshow = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-64 md:h-96 overflow-hidden relative">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              current === index ? 'bg-white' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlideshow;
