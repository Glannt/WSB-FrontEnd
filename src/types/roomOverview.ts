interface Room {
  id: number; // Unique identifier for the room
  roomName: string; // Name of the room
  roomType: 'single' | 'double' | 'suite'; // Type of room
  roomImg: string[];
  roomStatus: 'available' | 'booked' | 'maintenance'; // Status of the room
  createdAt: Date; // Date when the room was created
}

export interface ListRooms {
  roomId: string; // Unique identifier for the room
  roomName: string; // Name of the room
  price: number;
  roomImg?: string[];
  description?: string;
  building: string;
  roomType: string; // Type of room
}

export interface ListRooms2 {
  roomId: string; // Unique identifier for the room
  roomName: string; // Name of the room
  price: number;
  building: string;
  roomType: string; // Type of room
}
