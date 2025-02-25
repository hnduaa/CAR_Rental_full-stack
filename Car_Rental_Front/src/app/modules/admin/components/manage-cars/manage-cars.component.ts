import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditCarDialogComponent } from '../edit-car-dialog/edit-car-dialog.component'; // Ensure correct path
import { CarService } from '../../../../services/car.service';


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
  styleUrls: ['./manage-cars.component.scss']
})
export class ManageCarsComponent implements OnInit {
  cars: any[] = [];
  private dialog = inject(MatDialog);
  private carService = inject(CarService);  // Inject CarService

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.carService.getAllCars().subscribe(
      (response) => {
        console.log('Response from API:', response);
        this.cars = response;
      },
      (error) => {
        console.error('Error fetching cars:', error);
      }
    );
  }

  editCar(car: any) {
    console.log('Car object being passed to dialog:', car);
    const dialogRef = this.dialog.open(EditCarDialogComponent, {
      width: '450px',
      data: car
    });

    dialogRef.afterClosed().subscribe((updatedCar) => {
      console.log('Updated car data after dialog close:', updatedCar);
      if (updatedCar) {
        // Ensure unchanged fields are retained if not updated
        updatedCar.carType = updatedCar.carType || car.carType;
        updatedCar.transmission = updatedCar.transmission || car.transmission;
        updatedCar.carColor = updatedCar.carColor || car.carColor;
        updatedCar.description = updatedCar.description || car.description;

        if (updatedCar.id) {
          this.carService.updateCar(updatedCar.id, updatedCar).subscribe(() => {
            this.getAllCars();
          });
        } else {
          console.error('Car ID is undefined after editing');
        }
      }
    });
  }

  deleteCar(id: number) {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carService.deleteCar(id).subscribe(() => {
        this.cars = this.cars.filter(car => car.id !== id);
      });
    }
  }
}
