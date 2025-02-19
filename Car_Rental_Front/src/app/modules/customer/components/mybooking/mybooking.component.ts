import { Component } from '@angular/core';
import { BookingListComponent } from '../../../../components/booking-list/booking-list.component';

@Component({
  selector: 'app-mybooking',
  standalone: true,
  imports: [BookingListComponent],
  templateUrl: './mybooking.component.html',
})
export class MybookingComponent {

}
