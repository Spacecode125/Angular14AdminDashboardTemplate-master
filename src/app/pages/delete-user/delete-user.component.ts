import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
})
export class DeleteUserComponent implements OnInit {
  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {}

  users: any[] = [];
  token: any;
  errorMessage: string = '';
  url: string = 'http://localhost:3000/api/user'; // Update the URL

  ngOnInit(): void {
    const output = window.localStorage.getItem('token');
    this.token = output ? JSON.parse(output) : null;

    axios
      .get(this.url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.users = response.data;
      })
      .catch((error) => {
        this.errorMessage = error.response.data.message;
      });
  }

  deleteUser(id: any): void {
    const url = `http://localhost:3000/api/user/${id}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.router.navigateByUrl('/delete-user').then(() => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
        this.toastr.success('User deleted successfully');
      })
      .catch((error) => {
        this.toastr.error(error.response.data.message);
      });
  }
}
