import React from 'react';

interface RobloxLogoProps {
  size?: number;
  className?: string;
}

const RobloxLogo: React.FC<RobloxLogoProps> = ({ size = 48, className = "" }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transform rotate-12"
      >
        {/* Background white square with shadow */}
        <rect 
          x="8" 
          y="12" 
          width="76" 
          height="76" 
          fill="white" 
          stroke="#E53E3E" 
          strokeWidth="4"
          className="drop-shadow-lg"
        />
        
        {/* Letter R */}
        <g fill="#E53E3E">
          {/* Vertical bar of R */}
          <rect x="20" y="25" width="12" height="50" />
          
          {/* Top horizontal bar */}
          <rect x="20" y="25" width="35" height="12" />
          
          {/* Middle horizontal bar */}
          <rect x="20" y="44" width="25" height="10" />
          
          {/* Top right vertical */}
          <rect x="43" y="25" width="12" height="24" />
          
          {/* Diagonal leg */}
          <polygon points="32,54 44,54 60,75 48,75" />
        </g>
        
        {/* Small inner rectangle detail */}
        <rect 
          x="47" 
          y="30" 
          width="6" 
          height="8" 
          fill="white"
        />
      </svg>
    </div>
  );
};

export default RobloxLogo;