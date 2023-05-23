import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  devices: any[] = [];

  constructor(private router: Router) {}
  navigateToDeviceDetails(device: any): void {
    const queryParams = { ...device, user: JSON.stringify(device.user) };
    this.router.navigate(['/view-device'], { queryParams });
  }
  ngOnInit(): void {
    const url = 'http://localhost:3000/api/device';
    axios
      .get(url)
      .then((response) => {
        this.devices = response.data;
        console.error(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  }
}
