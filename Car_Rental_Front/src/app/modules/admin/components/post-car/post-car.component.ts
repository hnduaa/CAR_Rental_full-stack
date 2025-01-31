import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-car',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Add FormsModule to imports
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss']
})
export class PostCarComponent {
  carData = {
    brandName: '',
    carColor: '',
    carName: '',
    carType: '',
    transmission: '',
    modelYear: '',
    pricePerDay: '',
    description: '',
    postedAt: new Date().toISOString().split('.')[0], // Removes milliseconds and ensures compatibility
  };

  carImage: File | null = null;

  constructor(private carService: CarService, private http: HttpClient) {}

  // Handle form submission
  onSubmit() {
    console.log('Form Submitted', this.carData);
  
    if (this.carImage) {
      const formData: FormData = new FormData();
      
      // Append car data fields correctly
      Object.keys(this.carData).forEach((key) => {
        let value = this.carData[key as keyof typeof this.carData] as string | number | null;
      
        if (value !== null && value !== undefined) {
          formData.append(key, value.toString()); // Convert all values to string before appending
        }
      });

      // Append the image file
      formData.append('carImage', this.carImage);
  
      // Call the service to post car data with the image
      this.carService.postCarWithImage(formData).subscribe(
        (response) => {
          console.log('Car posted successfully:', response);
        },
        (error) => {
          console.error('Error posting car:', error);
        }
      );
    } else {
      console.error('No image selected');
    }
  }
  
  // Handle file input change
  onFileChange(event: any) {
    const file = event.target.files[0];  
    if (file && file.type.startsWith('image')) { // Ensure only images are selected
      this.carImage = file;  
      console.log('Selected Image:', file.name, file.type);
    } else {
      console.error('Invalid file type. Please select an image.');
    }
  }
  
}
