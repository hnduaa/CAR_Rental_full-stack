export interface Car {
    id: number; // Add id to the model
    brandName: string;
    carColor: string;
    carName: string;
    carType: string;
    transmission: string;
    modelYear: string;
    pricePerDay: string;
    description: string;
    postedAt: string;
    imagePath: string; // Add imagePath for the car image URL
    carImage?: File | null; // Optional, as the image is handled separately in the component
    rating: number; // Add the rating field here
  }
  