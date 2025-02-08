import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],  // Add CommonModule here
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {}; // Store user data
  isModalOpen: boolean = false; // Control modal visibility for editing profile
  isDeleteModalOpen: boolean = false; // Control modal visibility for deletion confirmation
  email: string = ''; // For input email in delete modal
  password: string = ''; // For input password in delete modal

  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail'); // Get logged-in user's email
    if (email) {
      this.loadUserProfile(email);
    }
  }

  // Load the user profile
  loadUserProfile(email: string): void {
    this.userService.getUserProfile(email).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  // Open the modal for editing profile
  openEditModal(): void {
    this.isModalOpen = true;
  }

  // Close the modal for editing profile
  closeEditModal(): void {
    this.isModalOpen = false;
  }

  // Open the modal for delete confirmation
  openDeleteConfirmation(): void {
    console.log('Opening delete modal...');
    this.isDeleteModalOpen = true;
  }
  
  closeDeleteModal(): void {
    console.log('Closing delete modal...');
    this.isDeleteModalOpen = false;
  }
  

  // Method to handle account deletion
  deleteAccount(): void {
    if (!this.email || !this.password) {
        alert('Please enter both email and password.');
        return;
    }

    if (this.email !== this.user.email) {
        alert('Please enter your correct email address.');
        return;
    }

    this.userService.deleteUser(this.email, this.password).subscribe({
        next: (response) => {
            console.log('Account deleted successfully');
            localStorage.clear(); // Clear all localStorage data
            this.closeDeleteModal();
            // Force navigation after a short delay
            setTimeout(() => {
                this.router.navigate(['/register']).then(() => {
                    window.location.reload(); // Force page reload if needed
                });
            }, 100);
        },
        error: (error) => {
            console.error('Error deleting account:', error);
            if (error.status === 401) {
                alert('Invalid password. Please try again.');
            } else {
                // Check if the user was actually deleted despite the error
                this.userService.getUserProfile(this.email).subscribe({
                    error: (profileError) => {
                        if (profileError.status === 404) {
                            // User was deleted, proceed with cleanup and redirect
                            localStorage.clear();
                            this.closeDeleteModal();
                            this.router.navigate(['/register']).then(() => {
                                window.location.reload();
                            });
                        } else {
                            alert('An error occurred. Please try again later.');
                        }
                    }
                });
            }
        }
    });
}
  

  // Save the changes (you can connect this to the backend service)
  saveChanges(): void {
    console.log('Changes saved:', this.user);  // Here, call backend API to save changes
    this.closeEditModal(); // Close modal after saving changes
  }
}
