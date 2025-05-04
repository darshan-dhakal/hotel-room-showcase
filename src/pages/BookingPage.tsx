
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BookingForm from '@/components/booking/BookingForm';
import BookingSuccessCard from '@/components/booking/BookingSuccessCard';
import NoAvailabilityAlert from '@/components/booking/NoAvailabilityAlert';
import { useBooking } from '@/hooks/useBooking';

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const preselectedRoomType = searchParams.get('roomType');
  
  const {
    isSubmitting,
    bookingSuccess,
    bookingData,
    noAvailability,
    submitBooking,
    setNoAvailability
  } = useBooking();

  // Reset no availability error when component mounts
  useEffect(() => {
    if (noAvailability) {
      setNoAvailability(false);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-16">
        <div className="hotel-container max-w-3xl mx-auto">
          {bookingSuccess && bookingData ? (
            <BookingSuccessCard bookingData={bookingData} />
          ) : (
            <>
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-hotel-navy mb-4">Book Your Stay</h1>
                <p className="text-gray-600">
                  Fill out the form below to reserve your room. All fields are required.
                </p>
              </div>

              {noAvailability && <NoAvailabilityAlert />}

              <BookingForm 
                preselectedRoomType={preselectedRoomType}
                onSubmit={submitBooking}
                isSubmitting={isSubmitting}
              />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;
