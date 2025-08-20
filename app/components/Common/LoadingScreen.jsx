import React from 'react';

const LoadingScreen = ({ isLoading, progress }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
      <div className="relative w-20 h-20">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 rounded bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse`}
            style={{
              top: `${Math.floor(i / 3) * 24 + 8}px`,
              left: `${(i % 3) * 24 + 8}px`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: '2.4s'
            }}
          />
        ))}
      </div>
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold text-purple-500 mb-2">Cargando GENIO</h2>
        <p className="text-gray-500">Preparando la mejor experiencia para ti...</p>
        <div className="w-80 bg-gray-200 rounded-full h-2 mt-4 max-w-xs mx-auto">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;