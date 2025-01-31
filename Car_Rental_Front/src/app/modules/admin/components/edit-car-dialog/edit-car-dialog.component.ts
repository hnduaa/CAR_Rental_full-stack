import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-car-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule 
  ],
  templateUrl: './edit-car-dialog.component.html',
  styleUrl: './edit-car-dialog.component.scss'
})
export class EditCarDialogComponent {
  carForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Car data passed to dialog:', data); // Log the data passed to the dialog

    // Initialize the form group with all fields
    this.carForm = this.fb.group({
      carName: [data?.carName || '', Validators.required],
      brandName: [data?.brandName || '', Validators.required],
      pricePerDay: [data?.pricePerDay || '', [Validators.required, Validators.min(1)]],
      modelYear: [data?.modelYear || '', Validators.required],
      carType: [data?.carType || ''], // Ensure other fields are included
      transmission: [data?.transmission || ''], // If you have a form for transmission
      carColor: [data?.carColor || ''],
      description: [data?.description || ''], // Add the description field
      imagePath: [data?.imagePath || '', Validators.required], // Include image path
      postedDate: [data?.postedDate || '', Validators.required] // Include posted date
    });
  }

  save() {
    if (this.carForm.valid) {
      const updatedCar = { ...this.carForm.value, id: this.data.id };
  
      // Ensure unchanged fields are retained if not updated
      updatedCar.carType = updatedCar.carType || this.data.carType;
      updatedCar.transmission = updatedCar.transmission || this.data.transmission;
      updatedCar.carColor = updatedCar.carColor || this.data.carColor;
      updatedCar.description = updatedCar.description || this.data.description;
      updatedCar.imagePath = updatedCar.imagePath || this.data.imagePath;
  
      // Add current date as posted_date if any field is updated
      updatedCar.postedDate = new Date().toISOString(); // Current timestamp
  
      console.log('Updated car with ID:', updatedCar); // Log the updated car data
      this.dialogRef.close(updatedCar); // Pass back the updated car data
    }
  }
  

  close() {
    this.dialogRef.close();
  }
}
