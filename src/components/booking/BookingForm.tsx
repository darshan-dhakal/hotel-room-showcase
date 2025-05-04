
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { z } from 'zod';

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
import { getRoomByType, rooms } from '@/data/roomData';

export const bookingFormSchema = z.object({
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

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

// Validate max guests based on room type
export const validateGuestCount = (roomType: string, guestCount: number) => {
  const selectedRoom = getRoomByType(roomType);
  if (!selectedRoom) return false;
  return guestCount <= selectedRoom.maxOccupancy;
};

type BookingFormProps = {
  preselectedRoomType: string | null;
  onSubmit: (data: BookingFormValues) => void;
  isSubmitting: boolean;
};

const BookingForm = ({ 
  preselectedRoomType, 
  onSubmit, 
  isSubmitting 
}: BookingFormProps) => {
  const defaultValues: Partial<BookingFormValues> = {
    roomType: preselectedRoomType || "",
  };

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues,
  });

  // Watch for form value changes
  const selectedRoomType = form.watch("roomType");
  const selectedRoom = getRoomByType(selectedRoomType);
  const maxOccupancy = selectedRoom?.maxOccupancy || 2;

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

  const handleFormSubmit = (data: BookingFormValues) => {
    // Validate guest count against room capacity
    const guestCount = parseInt(data.guests);
    if (!validateGuestCount(data.roomType, guestCount)) {
      form.setError("guests", { 
        type: "manual", 
        message: `Maximum occupancy for this room type is ${maxOccupancy} people.` 
      });
      return;
    }

    onSubmit(data);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
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
  );
};

export default BookingForm;
