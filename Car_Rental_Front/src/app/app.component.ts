import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout'; // Import NZ-ZORRO layout module
import { NzButtonModule } from 'ng-zorro-antd/button'; // Import NZ-ZORRO button module
import { provideRouter } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,RouterOutlet, NzLayoutModule, NzButtonModule],
  providers: [], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Car_Rental_Front';
}
