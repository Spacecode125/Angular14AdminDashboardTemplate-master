import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios'

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent  {
  userId!: string;
  profile: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    image: null,
    role: 'user'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}



  fetchUserData(): void {
    // Make a GET request to retrieve the user's data
    const url = `http://localhost:3000/api/user/${this.userId}`;
    axios.get(url)
      .then(response => {
        this.profile = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }


  onSubmit(): void {
    // Create form data object for sending the file
    const formData = new FormData();
    formData.append('firstName', this.profile.firstName);
    formData.append('lastName', this.profile.lastName);
    formData.append('email', this.profile.email);
    formData.append('phone', this.profile.phone);
    formData.append('address', this.profile.address);
    formData.append('password', this.profile.password);
    formData.append('image', this.profile.image);
    formData.append('role', this.profile.role);

    // Make a PUT request to update the user's data
    const url = `http://localhost:3000/api/user/${this.userId}`;
    axios.put(url, formData)
      .then(response => {
        console.log(response);
        // Redirect or show success message
        this.router.navigate(['/profile']);
      })
      .catch(error => {
        console.error(error);
        // Handle error response
      });
  }

  onFileChange(event: any): void {
    // Get the file from the input element
    const file = event.target.files[0];
    this.profile.image = file;
  }
}




