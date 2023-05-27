import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-rentedContract',
  templateUrl: './rentedContract.component.html',
  styleUrls: ['./rentedContract.component.css'],
})
export class RentedContractComponent implements OnInit {
  token: any;
  user: any;
  rentedDevices: any[] = [];
  errorMessage: string = '';
  url: string = '';

  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    const output = window.localStorage.getItem('token');
    this.token = output ? JSON.parse(output) : null;
    const output2 = window.localStorage.getItem('user');
    this.user = output2 ? JSON.parse(output2) : null;
    if (this.user.role == 'admin') {
      this.url = 'http://localhost:3000/api/rentedContract';
    } else {
      this.url = 'http://localhost:3000/api/rentedContract/salesman';
    }
    axios
      .get(this.url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.rentedDevices = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        this.errorMessage = error.response.data.message;
      });
  }

  navigateToDeviceDetails(device: any): void {
    console.log(device);
    if (device != null) {
      const queryParams = { ...device, user: JSON.stringify(device.user) };
      this.router.navigate(['/view-device'], { queryParams });
    } else {
      this.router.navigate(['/error-404']);
    }
  }

  navigateToAddDeviceStatus(deviceId: any): void {
    if (deviceId != null) {
      this.router.navigate(['/add-devicestatus'], {
        queryParams: { deviceId },
      });
    } else {
      this.router.navigate(['/error-404']);
    }
  }

  navigateToViewDeviceStatus(devicesStatus: any): void {
    console.log(devicesStatus);
    if (devicesStatus != null) {
      this.router.navigate(['/view-deviceStatus'], {
        queryParams:  devicesStatus ,
      });
    } else {
      this.router.navigate(['/error-404']);
    }
  }

  deleteRentedDevice(id: any): void {
    const url = `http://localhost:3000/api/rentedContract/${id}`;
    console.log(id);
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.router.navigateByUrl('/rentedcontract').then(() => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
        this.toastr.success('rented device deleted successfully');
      })
      .catch((error) => {
        this.toastr.error(error.response.data.message);
      });
  }
}
