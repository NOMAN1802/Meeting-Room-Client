
export type FormValues = {
    name: string;
    photo: string;
    extraPhoto: string;
    category: 'featured' | 'regular';
    roomNo: number;
    floorNo: number;
    capacity: number;
    pricePerSlot: number;
    details: string,
    amenities: string[];
     
  }

  export type Filters = {
    category: string;
    minPrice: string;
    maxPrice: string;
  }

  
  export type SortOption = 'Price: Low to High' | 'Price: High to Low';

  export interface CustomJwtPayload {
    role?: string;
    exp?: number;
    iat?: number;
    sub?: string;
    
  }

export type TUser = {
  _id: string;
  name: string,
  email: string,
  password: string,
  phone: string,
  address: string,
  role?: 'user'|'admin',
}
  
  
  

  export type TRoom =  {
    _id: string ;
    name: string;
    photo: string; 
    extraPhoto:string;
    category: 'featured'| 'regular';
    roomNo: number; 
    floorNo: number; 
    capacity: number; 
    pricePerSlot: number; 
    amenities: string[]; 
    details: string; 
    isDeleted?: boolean; 
    isBooked?: boolean;
}

export type TSlot = {
  _id: string;           
  room: string;          
  date: string;          
  startTime: string;     
  endTime: string;       
  isBooked: boolean;     
};



export type TBooking =  {
  _id: string;
  room: {
    name: string;
    pricePerSlot?: number;

  };
  user: {
    name: string;
  };
  date: string;
  isConfirmed: "confirmed" | "unconfirmed";
  slots: TSlot[];
  isDeleted: boolean;
  totalAmount: number;
  
}