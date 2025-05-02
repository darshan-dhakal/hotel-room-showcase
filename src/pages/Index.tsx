
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import RoomCard from '@/components/rooms/RoomCard';
import { rooms } from '@/data/roomData';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        <section className="py-16 bg-gray-50">
          <div className="hotel-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-hotel-navy mb-4">Our Luxurious Accommodations</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our range of meticulously designed rooms and suites, each offering a perfect blend of comfort, elegance, and modern amenities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="hotel-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-hotel-navy mb-4">Experience Luxury Like Never Before</h2>
                <p className="text-gray-600 mb-6">
                  Our hotel combines timeless elegance with contemporary design to create a truly unforgettable stay experience. From the moment you arrive, our attentive staff will ensure your every need is met with impeccable service.
                </p>
                <p className="text-gray-600 mb-6">
                  Situated in a prime location, our hotel offers easy access to major attractions, shopping districts, and business centers, making it the perfect choice for both leisure and business travelers.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-hotel-navy">24/7 Service</h3>
                    <p className="text-sm text-gray-600">Round-the-clock assistance for all your needs</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-hotel-navy">Fine Dining</h3>
                    <p className="text-sm text-gray-600">Award-winning restaurants and bars</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-hotel-navy">Wellness</h3>
                    <p className="text-sm text-gray-600">Spa, gym, and swimming pool facilities</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-hotel-navy">Business Center</h3>
                    <p className="text-sm text-gray-600">Full-service facilities for corporate needs</p>
                  </div>
                </div>
              </div>
              <div className="relative h-[500px]">
                <img
                  src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"
                  alt="Hotel Lobby"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 bg-hotel-gold p-6 rounded-lg shadow-lg">
                  <p className="text-white font-bold text-xl">5-Star Experience</p>
                  <p className="text-white/80">Rated excellent by our guests</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
