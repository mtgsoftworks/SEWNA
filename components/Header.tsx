import React, { useState } from 'react';

interface HeaderProps {
  onLogoClick: () => void;
  currentPage?: 'home' | 'discover' | 'portfolio' | 'request';
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, currentPage = 'home' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div
            onClick={onLogoClick}
            className="flex items-center gap-3 cursor-pointer"
          >
            <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
            <h2 className="text-xl font-bold tracking-tight text-text-light dark:text-white">SEWNA</h2>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a className="text-sm font-medium hover:text-primary dark:text-gray-300 dark:hover:text-primary" href="#">How It Works</a>
            <a className={`text-sm font-medium hover:text-primary dark:text-gray-300 dark:hover:text-primary ${currentPage === 'discover' ? 'text-primary' : ''}`} href="#">Designers</a>
            <a className="text-sm font-medium hover:text-primary dark:text-gray-300 dark:hover:text-primary" href="#">Login</a>
            <button className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary px-5 text-sm font-bold text-white transition-transform hover:scale-105">
              <span className="truncate">Sign Up</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-light dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/20">
            <nav className="flex flex-col gap-4">
              <a className="text-sm font-medium hover:text-primary" href="#">How It Works</a>
              <a className={`text-sm font-medium hover:text-primary ${currentPage === 'discover' ? 'text-primary' : ''}`} href="#">Designers</a>
              <a className="text-sm font-medium hover:text-primary" href="#">Login</a>
              <button className="flex h-10 w-full cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary px-5 text-sm font-bold text-white transition-transform hover:scale-105">
                <span className="truncate">Sign Up</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;