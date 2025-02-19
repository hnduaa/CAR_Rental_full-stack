import { BookingService } from './../../services/booking.service';
import { Component, Inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { CarService } from '../../services/car.service';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-edit-booking-dialog',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
  ],
  template: `
    <h2 mat-dialog-title>Modifier la réservation</h2>

    <mat-dialog-content class="dialog-content">
      <form>
        <!-- Sélection de la voiture -->
        <mat-form-field appearance="outline">
          <mat-label>Voiture</mat-label>
          <mat-select [(ngModel)]="booking.carId" name="carId">
            <mat-option *ngFor="let car of cars" [value]="car.id">
              {{ car.brandName }} {{ car.carName }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <!-- Date de début -->
        <mat-form-field appearance="outline">
          <mat-label>Date de début</mat-label>
          <input matInput [matDatepicker]="pickerFrom" [(ngModel)]="fromDate">
          <mat-datepicker-toggle matIconSuffix [for]="pickerFrom"></mat-datepicker-toggle>
          <mat-datepicker #pickerFrom></mat-datepicker>
        </mat-form-field>

        <!-- Date de fin -->
        <mat-form-field appearance="outline">
          <mat-label>Date de fin</mat-label>
          <input matInput [matDatepicker]="pickerTo" [(ngModel)]="toDate">
          <mat-datepicker-toggle matIconSuffix [for]="pickerTo"></mat-datepicker-toggle>
          <mat-datepicker #pickerTo></mat-datepicker>
        </mat-form-field>

        <!-- Prix total -->
        <mat-form-field appearance="outline">
          <mat-label>Prix total (€)</mat-label>
          <input matInput type="number" [(ngModel)]="booking.totalPrice" name="totalPrice" readonly>
        </mat-form-field>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions class="dialog-actions">
      <button mat-button (click)="onCancel()">Annuler</button>
      <button mat-button color="primary" (click)="onSave()">Enregistrer</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-content {
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding: 15px;
    }

    mat-form-field {
      width: 100%;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      padding: 15px;
      border-top: 1px solid #ddd;
    }
  `]
})
export class EditBookingDialogComponent {
  cars: any[] = [];  // Liste des voitures disponibles

  constructor(
    public dialogRef: MatDialogRef<EditBookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public booking: Booking,
    private carService: CarService,
    private bookingService: BookingService
  ) {
    this.carService.getAllCars().subscribe(cars => {
      this.cars = cars;
    });
  }

  // Getters et Setters pour gérer la conversion Date ↔ String
  get fromDate(): Date | null {
    if (!this.booking.fromDate) return null;
    
    const dateValue = (this.booking.fromDate as any) instanceof String ? this.booking.fromDate.toString() : this.booking.fromDate;
        return new Date(dateValue);
  }
  
  set fromDate(value: Date | null) {
    this.booking.fromDate = value ? this.formatDate(value) : '';
  }
  
  get toDate(): Date | null {
    if (!this.booking.toDate) return null;
    
    const dateValue = (this.booking.fromDate as any) instanceof String ? this.booking.fromDate.toString() : this.booking.fromDate;
        return new Date(dateValue);
  }
  
  set toDate(value: Date | null) {
    this.booking.toDate = value ? this.formatDate(value) : '';
  }
  

  // Fonction pour formater une date en "YYYY-MM-DD"
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  onSave(): void {
    const updatedBooking = {
      ...this.booking,
      fromDate: this.booking.fromDate,
      toDate: this.booking.toDate,
    };

    console.log('Données envoyées à l’API:', updatedBooking);

    this.bookingService.updateBooking(updatedBooking).subscribe(
      (updatedBooking: any) => {
        console.log('Réservation mise à jour:', updatedBooking);
        this.dialogRef.close(updatedBooking);
      },
      (error: any) => {
        console.error('Erreur lors de la mise à jour de la réservation:', error);
        alert('Une erreur est survenue lors de la mise à jour de la réservation.');
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
