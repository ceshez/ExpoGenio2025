import React from 'react';

const Card = ({ children, className = '', hover = true, glass = true }) => {
  const baseClasses = glass 
    ? "bg-white/80 backdrop-blur-md border border-white/30 shadow-lg rounded-2xl"
    : "bg-white border border-gray-200 shadow-lg rounded-2xl";
  
  const hoverClasses = hover ? "transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl" : "";

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;