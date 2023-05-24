import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.css'],
})
export class ListOffersComponent implements OnInit {
  token: any;
  user: any;
  devices: any[] = [];
  errorMessage: string = '';
  url: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const output = window.localStorage.getItem('token');
    this.token = output ? JSON.parse(output) : null;
    const output2 = window.localStorage.getItem('user');
    this.user = output2 ? JSON.parse(output2) : null;
    if(this.user.role=='admin'){
      this.url = 'http://localhost:3000/api/offer';
    }else{
      this.url = 'http://localhost:3000/api/offer/salesman';
    }
    axios
      .get(this.url, {
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

  navigateToDeviceScreen(type: any): void {
    if (type === 'Rental') {
      this.router.navigate(['/rentedcontract']);
    } else if (type === 'Trade') {
      this.router.navigate(['/tradedcontract']);
    } else if (type === 'Purchase') {
      this.router.navigate(['/purchasecontract']);
    } else {
      this.router.navigate(['/error-404']);
    }
  }
}
