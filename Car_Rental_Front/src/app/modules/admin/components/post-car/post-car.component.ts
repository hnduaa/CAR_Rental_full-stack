import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-car',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Add FormsModule to imports
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss']
})
export class PostCarComponent {
  // Define the carData model
  carData = {
    carImage: null,
    brandName: '',
    carName: '',
    carType: '',
    transmission: '',
    carColor: '',
    modelYear: '',
    pricePerDay: '',
    description: ''
  };

  // Handle form submission
  onSubmit() {
    // Log the form data to the console
    console.log('Form Data:', this.carData);
  }

  // Handle file input change
  onFileChange(event: any) {
    const file = event.target.files[0];  // Get the first selected file
    if (file) {
      this.carData.carImage = file;  // Store file in carData object
      console.log('Selected File:', file);  // Log the file for debugging
    }
  }
}
