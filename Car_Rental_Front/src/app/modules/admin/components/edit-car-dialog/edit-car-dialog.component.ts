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
    this.carForm = this.fb.group({
      carName: [data?.carName || '', Validators.required],
      brandName: [data?.brandName || '', Validators.required],
      pricePerDay: [data?.pricePerDay || '', [Validators.required, Validators.min(1)]],
      modelYear: [data?.modelYear || '', Validators.required]
    });
  }

  save() {
    if (this.carForm.valid) {
      // Ensure the ID from the data is included in the updated car object
      const updatedCar = { ...this.carForm.value, id: this.data.id };
      console.log('Updated car with ID:', updatedCar); // Log updated car data
      this.dialogRef.close(updatedCar); // Pass back the full car object with ID
    }
  }
  
  

  close() {
    this.dialogRef.close();
  }
}
