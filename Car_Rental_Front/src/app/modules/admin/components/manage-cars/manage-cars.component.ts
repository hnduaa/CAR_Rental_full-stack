import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditCarDialogComponent } from '../edit-car-dialog/edit-car-dialog.component'; // Assure-toi que le chemin est correct

@Component({
  selector: 'manage-cars',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './manage-cars.component.html',
  styleUrl: './manage-cars.component.scss'
})
export class ManageCarsComponent implements OnInit {
  cars: any[] = [];
  apiUrl = 'http://localhost:8080/api/cars';
  private dialog = inject(MatDialog);
  private http = inject(HttpClient);

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.http.get<any[]>(`${this.apiUrl}/all`, { withCredentials: true }).subscribe(
      (response) => {
        console.log('Response from API:', response); // Log the response
        this.cars = response;
      },
      (error) => {
        console.error('Error fetching cars:', error);
      }
    );
  }

  editCar(car: any) {
    console.log('Car object being passed to dialog:', car); // Log the car object being passed
    const dialogRef = this.dialog.open(EditCarDialogComponent, {
      width: '450px',
      data: car
    });
  
    dialogRef.afterClosed().subscribe((updatedCar) => {
      console.log('Updated car data after dialog close:', updatedCar); // Log updated car data
      if (updatedCar) {
        if (updatedCar.id) {
          this.http.put(`${this.apiUrl}/update/${updatedCar.id}`, updatedCar)
            .subscribe(() => this.getAllCars());
        } else {
          console.error('Car ID is undefined after editing');
        }
      }
    });
  }
  
  

  deleteCar(id: number) {
    if (confirm('Are you sure you want to delete this car?')) {
      this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe(() => {
        this.cars = this.cars.filter(car => car.id !== id);
      });
    }
  }
}
