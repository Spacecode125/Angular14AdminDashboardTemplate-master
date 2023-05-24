import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export class DevicesComponent implements OnInit {
  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {}
  devices: any[] = [];
  token: any;
  user: any;
  errorMessage: string = '';
  url: string = '';

  ngOnInit(): void {
    const output = window.localStorage.getItem('token');
    this.token = output ? JSON.parse(output) : null;
    const output2 = window.localStorage.getItem('user');
    this.user = output2 ? JSON.parse(output2) : null;
    if(this.user.role=='admin'){
      this.url = 'http://localhost:3000/api/device';
    }else{
      this.url = 'http://localhost:3000/api/device/salesman';
    }
    axios
      .get(this.url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.devices = response.data;
      })
      .catch((error) => {
        this.errorMessage = error.response.data.message;
      });
  }
  deleteDevice(id: any): void {
    const url = `http://localhost:3000/api/device/${id}`;
    console.log(id);
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.router.navigateByUrl('/devices').then(() => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
        this.toastr.success('device deleted successfully');
      })
      .catch((error) => {
        this.toastr.error(error.response.data.message);
      });
  }
  navigateToEditDevice(device: any): void {
    this.router.navigate(['/edit-device'], { queryParams: device });
  }
  navigateToDeviceDetails(device: any): void {
    if (device != null) {
      const queryParams = { ...device, user: JSON.stringify(device.user) };
      this.router.navigate(['/view-device'], { queryParams });
    } else {
      this.router.navigate(['/error-404']);
    }
  }
}
