
import React from 'react';
import { Link } from 'react-router-dom';
import { Room } from '@/data/roomData';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="room-card bg-white mb-8">
      <div className="relative h-[300px] overflow-hidden">
        <img 
          src={room.images[0]} 
          alt={room.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <div className="p-6">
        <h2 className="text-2xl font-bold text-hotel-navy mb-2">{room.name}</h2>
        <p className="text-gray-600 mb-4">{room.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-500 text-sm">Bed Type</p>
            <p className="font-medium">{room.bedType}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Room Size</p>
            <p className="font-medium">{room.size}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Max Occupancy</p>
            <p className="font-medium">{room.maxOccupancy} {room.maxOccupancy === 1 ? 'Person' : 'People'}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Price Per Night</p>
            <p className="font-bold text-lg">${room.pricePerNight}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 font-medium mb-2">Room Facilities:</p>
          <div className="flex flex-wrap gap-2">
            {room.facilities.slice(0, 5).map((facility, index) => (
              <span key={index} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                {facility}
              </span>
            ))}
            {room.facilities.length > 5 && (
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                +{room.facilities.length - 5} more
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="btn-navy flex-1">Check Availability</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Check Room Availability</DialogTitle>
              </DialogHeader>
              <div className="p-4">
                <p className="mb-4">Select a date to check availability for {room.name}</p>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className={cn("rounded-md border pointer-events-auto", date ? "border-hotel-gold" : "")}
                  disabled={(date) => date < new Date()}
                />
                <div className="mt-6 space-y-4">
                  <p className="font-medium">
                    {date ? (
                      <>Availability for {date.toLocaleDateString()}: <span className="text-green-600 font-bold">Available</span></>
                    ) : (
                      "Please select a date to check availability"
                    )}
                  </p>
                  {date && (
                    <div className="text-sm text-gray-600">
                      <p>• 2 rooms available for this type</p>
                      <p>• Room rate: ${room.pricePerNight} per night</p>
                      <p>• Max occupancy: {room.maxOccupancy} people</p>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Link to={`/booking?roomType=${room.type}`} className="flex-1">
            <Button className="btn-gold w-full">Book Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
