
import React from 'react';
import { Button } from '@/components/ui/button';
import { getRoomByType } from '@/data/roomData';
import { BookingFormValues } from './BookingForm';

type BookingSuccessCardProps = {
  bookingData: BookingFormValues;
};

const BookingSuccessCard = ({ bookingData }: BookingSuccessCardProps) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-green-200">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-hotel-navy mb-2">The below booking has been successful!</h1>
        <p className="text-gray-600">Thank you for choosing our hotel. We look forward to welcoming you.</p>
      </div>
      
      <div className="border-t border-b border-gray-200 py-4 my-6">
        <h2 className="font-bold text-lg mb-4">Booking Details:</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Guest Name</p>
            <p className="font-medium">{bookingData.fullName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-medium">{bookingData.email}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Phone</p>
            <p className="font-medium">{bookingData.phone}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Check-in Date</p>
            <p className="font-medium">{bookingData.checkInDate.toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Room Type</p>
            <p className="font-medium">{getRoomByType(bookingData.roomType)?.name || bookingData.roomType}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Number of Guests</p>
            <p className="font-medium">{bookingData.guests}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">A confirmation email has been sent to {bookingData.email}</p>
        <Button className="btn-gold" onClick={() => window.location.href = "/"}>
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default BookingSuccessCard;
