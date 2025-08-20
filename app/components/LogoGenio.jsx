import React from 'react';
import PropTypes from 'prop-types';

const GenioLogo = ({
  size = 'md',
  colorMode = 'color', // 'color', 'monochrome', 'white'
  variant = 'full',    // 'full', 'simplified', 'lettermark'
  className = ''
}) => {
  // Tamaños predefinidos
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20'
  };

  // Modos de color
  const colorClasses = {
    color: '', // Mantiene los colores originales
    monochrome: 'text-gray-800 [&_.cls-1]:fill-current [&_.cls-2]:fill-current [&_.cls-3]:fill-current',
    white: 'text-white [&_.cls-1]:fill-current [&_.cls-2]:fill-current [&_.cls-3]:fill-current'
  };

  // Variantes del logo
  const variants = {
    full: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 169.97 193.82" className="w-full h-full">
        {/* Contenido completo del SVG */}
        <defs>
          <style>{`
            .cls-1{fill:#2e388e;}
            .cls-2{fill:#5c2483;}
            .cls-3{fill:#257dc1;}
            .cls-4,.cls-5{fill:#fff;}
            .cls-4{opacity:0.62;}
            .cls-6,.cls-7{fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:8px;}
            .cls-6{stroke:#aaaaa9;}
            .cls-7{stroke:#f6f6f6;}
            .cls-8{fill:#aaaaa9;opacity:0.96;}
          `}</style>
        </defs>
        <g id="Capa_2" data-name="Capa 2">
          <g id="logos">
            <g id="logo_principal" data-name="logo principal">
              <path class="cls-1" d="M104.22,141.43,87.7,148.7a4.32,4.32,0,0,1-4-.27L42.31,123a4.34,4.34,0,0,1-2.05-3.68V78.79a4.32,4.32,0,0,0-2.07-3.68L7,56.08A4.3,4.3,0,0,0,.42,59.74L0,143.26A4.3,4.3,0,0,0,2.17,147L83,193.25a4.3,4.3,0,0,0,4.28,0l20.82-12.05a4.31,4.31,0,0,0,2.15-3.73V145.37C110.25,143.82,105.64,140.8,104.22,141.43ZM23.4,148.2a9.21,9.21,0,1,1,8-4.56,5.69,5.69,0,0,1-.33.52,9.23,9.23,0,0,1-7.62,4Z"/>
              <path class="cls-2" d="M114.11,15.2,88.86.58a4.33,4.33,0,0,0-4.32,0L7,44.93A4.36,4.36,0,0,0,7,52.5L37.75,70.05a4.34,4.34,0,0,0,4.53-.14l72-47.29A4.36,4.36,0,0,0,114.11,15.2Zm-53,32.73L47,31.27a3.68,3.68,0,0,1,2.16-6l21.42-3.85a3.29,3.29,0,0,1,1.21,0,3.67,3.67,0,0,1,2.9,4.87L67.35,46.81a3.64,3.64,0,0,1-2.9,2.38A3.6,3.6,0,0,1,61.09,47.93Z"/>
              <path class="cls-3" d="M170,50.66l-.17,33.77a4.39,4.39,0,0,1-6.66,3.73L95.4,47.08a4.38,4.38,0,0,1-.13-7.4l25.57-16.85a4.37,4.37,0,0,1,4.58-.15l42.34,24.15A4.36,4.36,0,0,1,170,50.66Z"/>
              <path class="cls-2" d="M163.1,122.35v24.08a4.59,4.59,0,0,1-2.3,4l-38.41,22.17a4.59,4.59,0,0,1-6.89-4V145.45a4.6,4.6,0,0,0-2.07-3.84L77.85,118.23a4.6,4.6,0,0,1-2-4.56l3.82-23.8,22-6.85a4.57,4.57,0,0,1,3.81.5L161,118.46A4.6,4.6,0,0,1,163.1,122.35Z"/>
              <path class="cls-4" d="M75.83,26.29,68.46,46.81a3.63,3.63,0,0,1-4,2.38,3.64,3.64,0,0,0,2.9-2.38l7.37-20.52a3.67,3.67,0,0,0-2.9-4.87A3.67,3.67,0,0,1,75.83,26.29Z"/>
              <path class="cls-5" d="M74.72,26.29,67.35,46.81a3.64,3.64,0,0,1-2.9,2.38,3.6,3.6,0,0,1-3.36-1.26L47,31.27a3.68,3.68,0,0,1,2.16-6l21.42-3.85a3.29,3.29,0,0,1,1.21,0A3.67,3.67,0,0,1,74.72,26.29Z"/>
              <line class="cls-6" x1="18.53" y1="136.86" x2="80.24" y2="172.92"/>
              <polyline class="cls-7" points="80.46 172.34 31.92 143.97 31.35 143.64"/>
              <line class="cls-7" x1="15.44" y1="134.34" x2="14.93" y2="134.04"/>
              <path class="cls-8" d="M32.57,141.6a8.41,8.41,0,0,1-2.05,3.85,8.57,8.57,0,0,1-2.74,2,10.07,10.07,0,0,1-5.48.73,8.83,8.83,0,0,0,3.92-.38A9.28,9.28,0,0,0,32,142.38a9.23,9.23,0,0,0,.63-3.06,9.12,9.12,0,0,0-.1-1.78A10.11,10.11,0,0,1,32.57,141.6Z"/>
              <path class="cls-5" d="M32.61,139a9.14,9.14,0,0,1-1.26,4.65,5.69,5.69,0,0,1-.33.52A9.2,9.2,0,1,1,32.61,139Z"/>
            </g>
          </g>
        </g>
      </svg>
    ),
    simplified: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 169.97 193.82" className="w-full h-full">
        {/* Versión simplificada (solo las formas principales) */}
        <path fill="#2e388e" d="M104.22,141.43,87.7,148.7a4.32,4.32,0,0,1-4-.27L42.31,123a4.34,4.34,0,0,1-2.05-3.68V78.79a4.32,4.32,0,0,0-2.07-3.68L7,56.08A4.3,4.3,0,0,0,.42,59.74L0,143.26A4.3,4.3,0,0,0,2.17,147L83,193.25a4.3,4.3,0,0,0,4.28,0l20.82-12.05a4.31,4.31,0,0,0,2.15-3.73V145.37C110.25,143.82,105.64,140.8,104.22,141.43Z"/>
        <path fill="#5c2483" d="M114.11,15.2,88.86.58a4.33,4.33,0,0,0-4.32,0L7,44.93A4.36,4.36,0,0,0,7,52.5L37.75,70.05a4.34,4.34,0,0,0,4.53-.14l72-47.29A4.36,4.36,0,0,0,114.11,15.2Z"/>
        <path fill="#257dc1" d="M170,50.66l-.17,33.77a4.39,4.39,0,0,1-6.66,3.73L95.4,47.08a4.38,4.38,0,0,1-.13-7.4l25.57-16.85a4.37,4.37,0,0,1,4.58-.15l42.34,24.15A4.36,4.36,0,0,1,170,50.66Z"/>
      </svg>
    ),
    lettermark: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 169.97 193.82" className="w-full h-full">
        {/* Versión con solo la letra G (puedes ajustar esto según necesites) */}
        <path fill="#2e388e" d="M104.22,141.43,87.7,148.7a4.32,4.32,0,0,1-4-.27L42.31,123a4.34,4.34,0,0,1-2.05-3.68V78.79a4.32,4.32,0,0,0-2.07-3.68L7,56.08A4.3,4.3,0,0,0,.42,59.74L0,143.26A4.3,4.3,0,0,0,2.17,147L83,193.25a4.3,4.3,0,0,0,4.28,0l20.82-12.05a4.31,4.31,0,0,0,2.15-3.73V145.37C110.25,143.82,105.64,140.8,104.22,141.43Z"/>
      </svg>
    )
  };

  return (
    <div className={`inline-block ${sizeClasses[size]} ${colorClasses[colorMode]} ${className}`}>
      {variants[variant]}
    </div>
  );
};

GenioLogo.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  colorMode: PropTypes.oneOf(['color', 'monochrome', 'white']),
  variant: PropTypes.oneOf(['full', 'simplified', 'lettermark']),
  className: PropTypes.string
};

export default GenioLogo;