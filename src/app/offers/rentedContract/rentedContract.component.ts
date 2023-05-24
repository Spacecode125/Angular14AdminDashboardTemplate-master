import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
@Component({
  selector: 'app-rentedContract',
  templateUrl: './rentedContract.component.html',
  styleUrls: ['./rentedContract.component.css'],
})
export class RentedContractComponent implements OnInit {
  token: any;
  devices: any[] = [];
  errorMessage: String = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const output = window.localStorage.getItem('token');
    this.token = output ? JSON.parse(output) : null;
    const url = 'http://localhost:3000/api/rentedContract/salesman';
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

  navigateToDeviceDetails(device: any): void {
    if(device!=null){
      const queryParams = { ...device, user: JSON.stringify(device.user) };
    this.router.navigate(['/view-device'], { queryParams });
    }else{
      this.router.navigate(['/error-404'])
    }
  }
}
