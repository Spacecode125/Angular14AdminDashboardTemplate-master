import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userObj: any = {
    email: '',
    firstName: '',
    lastName: '',
    role: '',
    phone: '',
    address: '',
    password: ''
  };

  constructor(private router: Router, private toastr: ToastrService) {}

  onAddUser(): void {
    const url = 'http://localhost:3000/api/user/register';
    const { email, firstName, lastName, role, phone, address, password } = this.userObj;

    axios
      .post(url, { email, firstName, lastName, role, phone, address, password })
      .then(response => {
        console.log(response);
        this.router.navigate(['/']); // Navigate to the desired route after adding the user
        this.toastr.success('User successfully added to your database');
      })
      .catch(error => {
        this.toastr.error(error.response.data.message);
      });
  }
}
