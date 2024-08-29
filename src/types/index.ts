
export type FormValues = {
    name: string;
    photo: string;
    extraPhoto: string;
    category: 'featured' | 'regular';
    roomNo: number;
    floorNo: number;
    capacity: number;
    pricePerSlot: number;
    amenities: string[];
     
  }

  export type Filters = {
    category: string;
    minPrice: string;
    maxPrice: string;
  }

  
  export type SortOption = 'Price: Low to High' | 'Price: High to Low';
  
  

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

