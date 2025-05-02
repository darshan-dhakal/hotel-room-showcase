
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RoomCard from '@/components/rooms/RoomCard';
import { rooms } from '@/data/roomData';

const RoomsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="relative h-[40vh] min-h-[300px] w-full">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
              alt="Luxury Hotel Rooms"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-hotel-navy bg-opacity-50"></div>
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Rooms & Suites</h1>
            <p className="text-xl max-w-3xl">
              Select from our collection of luxury accommodations designed for your comfort
            </p>
          </div>
        </div>
        
        <section className="py-16">
          <div className="hotel-container">
            <p className="text-gray-600 mb-12 max-w-3xl">
              Our hotel offers a variety of room types to cater to different needs and preferences. From comfortable standard rooms to lavish suites, each space is designed with attention to detail and equipped with modern amenities to ensure a pleasant and memorable stay.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RoomsPage;
