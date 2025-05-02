
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-16">
        <div className="text-center px-4">
          <h1 className="text-9xl font-bold text-hotel-navy mb-4">404</h1>
          <div className="w-16 h-1 bg-hotel-gold mx-auto mb-8"></div>
          <p className="text-2xl text-gray-600 mb-8">Oops! We couldn't find the page you're looking for.</p>
          <p className="text-gray-500 max-w-lg mx-auto mb-10">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Link to="/">
            <Button className="btn-gold px-8 py-6 text-lg">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
