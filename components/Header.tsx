import React from 'react';

interface HeaderProps {
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-md z-10 border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div 
          onClick={onLogoClick} 
          className="text-2xl font-bold tracking-wider text-black cursor-pointer w-fit"
        >
          SEWNA
        </div>
      </div>
    </header>
  );
};

export default Header;