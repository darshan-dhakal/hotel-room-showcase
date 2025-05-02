
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="relative h-[70vh] min-h-[500px] w-full">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
          alt="Luxury Hotel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hotel-navy bg-opacity-40"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Experience Unparalleled Luxury
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mb-8">
          Indulge in exceptional comfort and world-class service at our prestigious hotel
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/rooms">
            <Button className="bg-hotel-gold hover:bg-hotel-gold/90 text-white font-medium px-8 py-6 text-lg">
              Explore Our Rooms
            </Button>
          </Link>
          <Link to="/booking">
            <Button variant="outline" className="bg-transparent border-2 border-white hover:bg-white/20 text-white font-medium px-8 py-6 text-lg">
              Book Your Stay
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
