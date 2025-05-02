
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md py-4">
      <div className="hotel-container">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-3xl font-bold text-hotel-navy">
              <span className="text-hotel-gold">Luxury</span> Hotel
            </h1>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={cn(
              "block w-6 h-0.5 bg-hotel-navy mb-1.5 transition-all",
              isMenuOpen && "transform rotate-45 translate-y-2"
            )}></span>
            <span className={cn(
              "block w-6 h-0.5 bg-hotel-navy mb-1.5 transition-opacity",
              isMenuOpen && "opacity-0"
            )}></span>
            <span className={cn(
              "block w-6 h-0.5 bg-hotel-navy transition-all",
              isMenuOpen && "transform -rotate-45 -translate-y-2"
            )}></span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-hotel-navy hover:text-hotel-gold transition-colors font-medium">
              Home
            </Link>
            <Link to="/rooms" className="text-hotel-navy hover:text-hotel-gold transition-colors font-medium">
              Rooms
            </Link>
            <Link to="/facilities" className="text-hotel-navy hover:text-hotel-gold transition-colors font-medium">
              Facilities
            </Link>
            <Link to="/dining" className="text-hotel-navy hover:text-hotel-gold transition-colors font-medium">
              Dining
            </Link>
            <Link to="/contact" className="text-hotel-navy hover:text-hotel-gold transition-colors font-medium">
              Contact
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden transition-all overflow-hidden",
          isMenuOpen ? "max-h-64 mt-4" : "max-h-0"
        )}>
          <nav className="flex flex-col space-y-4 py-2">
            <Link 
              to="/" 
              className="text-hotel-navy hover:text-hotel-gold transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/rooms" 
              className="text-hotel-navy hover:text-hotel-gold transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Rooms
            </Link>
            <Link 
              to="/facilities" 
              className="text-hotel-navy hover:text-hotel-gold transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Facilities
            </Link>
            <Link 
              to="/dining" 
              className="text-hotel-navy hover:text-hotel-gold transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Dining
            </Link>
            <Link 
              to="/contact" 
              className="text-hotel-navy hover:text-hotel-gold transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
