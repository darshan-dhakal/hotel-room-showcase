
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { BookingFormValues } from '@/components/booking/BookingForm';

export const useBooking = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormValues | null>(null);
  const [noAvailability, setNoAvailability] = useState(false);

  const submitBooking = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    setNoAvailability(false);

    try {
      console.log("Starting booking process with data:", data);

      // Simulate room availability check - 30% chance of no availability for demo purposes
      const isRoomAvailable = Math.random() > 0.3;
      
      if (isRoomAvailable) {
        // Prepare booking data for Supabase
        const bookingData = {
          room_type: data.roomType,
          full_name: data.fullName,
          email: data.email,
          phone: data.phone,
          check_in_date: data.checkInDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
          guests: parseInt(data.guests)
        };

        console.log("Sending booking data to Supabase:", bookingData);
        
        // Save booking to Supabase - with improved error handling
        const { data: insertedData, error } = await supabase
          .from('bookings')
          .insert(bookingData)
          .select();
        
        if (error) {
          console.error('Error saving booking:', error);
          toast({
            title: "Booking Failed",
            description: `Database error: ${error.message}`,
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }

        console.log("Booking successfully saved:", insertedData);

        // If successfully saved to Supabase
        setBookingSuccess(true);
        setBookingData(data);
        
        toast({
          title: "Booking Submitted",
          description: "Your booking request has been successfully submitted!",
        });
      } else {
        // No availability scenario
        setNoAvailability(true);
        toast({
          title: "Booking Failed",
          description: "Sorry! There is no room available for the selected date and room type.",
          variant: "destructive",
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error in booking process:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    bookingSuccess,
    bookingData,
    noAvailability,
    submitBooking,
    setNoAvailability
  };
};
