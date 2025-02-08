import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  userRole: string | null = null;

  @Output() toggleEvent = new EventEmitter<boolean>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.role$.subscribe(role => {
      this.userRole = role;
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.toggleEvent.emit(this.isCollapsed);
  }
  logout() {
    this.authService.logout();
  }
  
}
