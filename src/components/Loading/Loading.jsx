import React, { useState, useEffect } from 'react';
import './Loading.css'; // Make sure to create this CSS file for styling

const Loading = () => {
  const [loadingText, setLoadingText] = useState('Loading');

  useEffect(() => {
    const textVariants = ['Loading', 'Loading.', 'Loading..', 'Loading...'];
    let index = 0;

    const interval = setInterval(() => {
      setLoadingText(textVariants[index]);
      index = (index + 1) % textVariants.length;
    }, 500); // Update text every 500ms

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <span className="loading-text">{loadingText}</span>
    </div>
  );
};

export default Loading;
