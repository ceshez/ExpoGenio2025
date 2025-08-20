import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon,
  ripple = false,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 whitespace-nowrap relative overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:from-purple-600 hover:to-pink-600 hover:shadow-xl hover:-translate-y-1 hover:scale-105",
    secondary: "bg-white text-purple-500 border-2 border-purple-500 hover:bg-purple-500 hover:text-white hover:-translate-y-1 hover:scale-105",
    outline: "border-2 border-white text-white hover:bg-white hover:text-purple-500"
  };
  
  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-10 py-4 text-lg"
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${ripple ? 'group' : ''}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      {ripple && (
        <span className="absolute inset-0 bg-white opacity-0 group-active:opacity-30 group-active:animate-ping rounded-full" />
      )}
    </button>
  );
};

export default Button;