import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  users: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    const token = localStorage.getItem('token'); // Retrieve the bearer token from local storage
    axios.get('http://localhost:3000/api/users', {
      headers: {
        Authorization: `Bearer ${token}` // Set the Authorization header with the bearer token
      }
    })
      .then((response) => {
        this.users = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteUser(userId: string): void {
    const token = localStorage.getItem('token'); // Retrieve the bearer token from local storage
    axios.delete(`http://localhost:3000/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}` // Set the Authorization header with the bearer token
      }
    })
      .then(() => {
        console.log('User deleted successfully');
        this.getUsers(); // Refresh the user list after deletion
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
