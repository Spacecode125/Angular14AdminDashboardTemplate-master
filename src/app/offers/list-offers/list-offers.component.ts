import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.css'],
})
export class ListOffersComponent implements OnInit {
  token: any;
  devices: any[] = [];
  errorMessage: String = '';

  constructor() {}

  ngOnInit(): void {
    const output = window.localStorage.getItem('token');
    this.token = output ? JSON.parse(output) : null;
    const url = 'http://localhost:3000/api/offer/salesman';
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.devices = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        this.errorMessage = error.response.data.message;
      });
  }
}
