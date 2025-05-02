
export type RoomFacility = 
  | 'Free Wi-Fi' 
  | 'Flat-screen TV' 
  | 'Air conditioning' 
  | 'Mini bar' 
  | 'Coffee machine' 
  | 'Bathtub' 
  | 'Safe' 
  | 'Hairdryer'
  | 'Walk-in shower'
  | 'Bathrobe & slippers'
  | 'Workspace'
  | 'Separate living area'
  | 'Dining area'
  | 'Jacuzzi'
  | 'Butler service'
  | 'Private lounge access'
  | 'Private balcony'
  | 'Kitchen'
  | 'Champagne service';

export interface Room {
  id: string;
  name: string;
  type: string;
  description: string;
  bedType: string;
  size: string;
  maxOccupancy: number;
  pricePerNight: number;
  facilities: RoomFacility[];
  images: string[];
}

export const rooms: Room[] = [
  {
    id: "standard-twin",
    name: "Standard Twin Room",
    type: "standard-twin",
    description: "Comfortable and cozy twin room perfect for friends or colleagues traveling together.",
    bedType: "2 Single Beds",
    size: "25 sq.m",
    maxOccupancy: 2,
    pricePerNight: 180,
    facilities: [
      'Free Wi-Fi',
      'Flat-screen TV',
      'Air conditioning',
      'Mini bar',
      'Hairdryer',
      'Safe'
    ],
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: "executive-twin",
    name: "Executive Twin Room",
    type: "executive-twin",
    description: "Upgraded twin room with enhanced amenities and executive privileges.",
    bedType: "2 Single Beds",
    size: "30 sq.m",
    maxOccupancy: 2,
    pricePerNight: 220,
    facilities: [
      'Free Wi-Fi',
      'Flat-screen TV',
      'Air conditioning',
      'Mini bar',
      'Coffee machine',
      'Hairdryer',
      'Safe',
      'Bathrobe & slippers',
      'Private lounge access'
    ],
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587985064135-0366536eab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: "superior-suite",
    name: "Superior Suite",
    type: "superior-suite",
    description: "Spacious suite with a separate living area and premium amenities for comfort.",
    bedType: "1 King Bed",
    size: "45 sq.m",
    maxOccupancy: 3,
    pricePerNight: 320,
    facilities: [
      'Free Wi-Fi',
      'Flat-screen TV',
      'Air conditioning',
      'Mini bar',
      'Coffee machine',
      'Bathtub',
      'Walk-in shower',
      'Safe',
      'Hairdryer',
      'Bathrobe & slippers',
      'Workspace',
      'Separate living area'
    ],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: "deluxe-suite",
    name: "Deluxe Suite",
    type: "deluxe-suite",
    description: "Indulgent suite offering enhanced space and luxury amenities for a premium stay experience.",
    bedType: "1 King Bed",
    size: "55 sq.m",
    maxOccupancy: 3,
    pricePerNight: 420,
    facilities: [
      'Free Wi-Fi',
      'Flat-screen TV',
      'Air conditioning',
      'Mini bar',
      'Coffee machine',
      'Bathtub',
      'Walk-in shower',
      'Safe',
      'Hairdryer',
      'Bathrobe & slippers',
      'Workspace',
      'Separate living area',
      'Private balcony',
      'Jacuzzi'
    ],
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1621293954908-907159247fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    type: "executive-suite",
    description: "Premium suite with executive benefits, featuring elegant decor and top-tier amenities.",
    bedType: "1 King Bed",
    size: "65 sq.m",
    maxOccupancy: 3,
    pricePerNight: 520,
    facilities: [
      'Free Wi-Fi',
      'Flat-screen TV',
      'Air conditioning',
      'Mini bar',
      'Coffee machine',
      'Bathtub',
      'Walk-in shower',
      'Safe',
      'Hairdryer',
      'Bathrobe & slippers',
      'Workspace',
      'Separate living area',
      'Private balcony',
      'Jacuzzi',
      'Private lounge access',
      'Butler service'
    ],
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: "presidential-suite",
    name: "Presidential Suite",
    type: "presidential-suite",
    description: "The ultimate luxury experience with expansive space, unparalleled amenities, and personalized service.",
    bedType: "1 King Bed and 2 Queen Beds",
    size: "120 sq.m",
    maxOccupancy: 5,
    pricePerNight: 1200,
    facilities: [
      'Free Wi-Fi',
      'Flat-screen TV',
      'Air conditioning',
      'Mini bar',
      'Coffee machine',
      'Bathtub',
      'Walk-in shower',
      'Safe',
      'Hairdryer',
      'Bathrobe & slippers',
      'Workspace',
      'Separate living area',
      'Dining area',
      'Private balcony',
      'Jacuzzi',
      'Butler service',
      'Kitchen',
      'Private lounge access',
      'Champagne service'
    ],
    images: [
      'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  }
];

export const getRoomByType = (type: string): Room | undefined => {
  return rooms.find(room => room.type === type);
};
