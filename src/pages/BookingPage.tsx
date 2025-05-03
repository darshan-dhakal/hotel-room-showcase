import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getRoomByType, rooms } from '@/data/roomData';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const bookingFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must contain both first and last name separated by a space.",
  }).refine((val) => val.includes(" "), {
    message: "Full name must contain both first and last name separated by a space.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address that includes @.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }).refine((val) => /^04\d{8}$/.test(val), {
    message: "Phone number must start with 04 and contain 10 digits.",
  }),
  checkInDate: z.date({
    required_error: "Please select a check-in date.",
  }).refine(date => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
    message: "Check-in date cannot be in the past.",
  }),
  roomType: z.string().min(1, {
    message: "Please select a room type.",
  }),
  guests: z.string().refine((val) => {
    const numGuests = parseInt(val);
    return !isNaN(numGuests) && numGuests > 0;
  }, {
    message: "Please enter a valid number of guests.",
  }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const preselectedRoomType = searchParams.get('roomType');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormValues | null>(null);
  const [noAvailability, setNoAvailability] = useState(false);

  const defaultValues: Partial<BookingFormValues> = {
    roomType: preselectedRoomType || "",
  };

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues,
  });

  // Validate max guests based on room type
  const validateGuestCount = (roomType: string, guestCount: number) => {
    const selectedRoom = getRoomByType(roomType);
    if (!selectedRoom) return false;
    return guestCount <= selectedRoom.maxOccupancy;
  };

  // Watch for form value changes
  const selectedRoomType = form.watch("roomType");
  const selectedRoom = getRoomByType(selectedRoomType);
  const maxOccupancy = selectedRoom?.maxOccupancy || 2;

  // Reset no availability error when form values change
  useEffect(() => {
    if (noAvailability) {
      setNoAvailability(false);
    }
  }, [form.watch("checkInDate"), form.watch("roomType")]);

  useEffect(() => {
    if (selectedRoomType) {
      const currentGuests = form.getValues("guests");
      const numGuests = currentGuests ? parseInt(currentGuests) : 1;
      
      // Check if current guest count exceeds max occupancy
      if (numGuests > maxOccupancy) {
        form.setValue("guests", String(maxOccupancy));
      }
    }
  }, [selectedRoomType, form, maxOccupancy]);

  async function onSubmit(data: BookingFormValues) {
    // Validate guest count against room capacity
    const guestCount = parseInt(data.guests);
    if (!validateGuestCount(data.roomType, guestCount)) {
      form.setError("guests", { 
        type: "manual", 
        message: `Maximum occupancy for this room type is ${maxOccupancy} people.` 
      });
      return;
    }

    setIsSubmitting(true);
    setNoAvailability(false);

    try {
      // In a real application, this would be an API call
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate room availability check - 30% chance of no availability for demo purposes
      const isRoomAvailable = Math.random() > 0.3;
      
      if (isRoomAvailable) {
        // Simulate success response
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
      toast({
        title: "Error",
        description: "There was an error submitting your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (bookingSuccess && bookingData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-16">
          <div className="hotel-container max-w-3xl mx-auto">
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
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-16">
        <div className="hotel-container max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-hotel-navy mb-4">Book Your Stay</h1>
            <p className="text-gray-600">
              Fill out the form below to reserve your room. All fields are required.
            </p>
          </div>

          {noAvailability && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Sorry! There is no room available!</AlertTitle>
              <AlertDescription>
                Unfortunately, there are no available rooms of the selected type on your chosen date. 
                Please select a different date or room type.
              </AlertDescription>
            </Alert>
          )}

          <div className="bg-white p-8 rounded-lg shadow-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Smith" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please enter your first and last name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@email.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        We'll send your booking confirmation to this email address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="0400123456" {...field} />
                      </FormControl>
                      <FormDescription>
                        Australian mobile number starting with '04'.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="checkInDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Check-In Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select your check-in date (future dates only).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="roomType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a room type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {rooms.map((room) => (
                            <SelectItem key={room.id} value={room.type}>
                              {room.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        {selectedRoom && (
                          <>Maximum occupancy: {selectedRoom.maxOccupancy} people</>
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Guests</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={!selectedRoomType}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select number of guests" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedRoom && Array.from({ length: selectedRoom.maxOccupancy }, (_, i) => i + 1).map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Number of guests staying in the room.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <Button className="btn-gold w-full" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Complete Booking"}
                  </Button>
                </div>
              </form>
            </Form>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-semibold mb-2">Important Information:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Check-in time is from 2:00 PM</li>
                <li>• Check-out time is until 11:00 AM</li>
                <li>• Photo ID will be required at check-in</li>
                <li>• Special requests cannot be guaranteed</li>
                <li>• Free cancellation until 48 hours before check-in</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;
