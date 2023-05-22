import { Component, OnInit, ElementRef } from '@angular/core';
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
    private elementRef: ElementRef,
    private toastr: ToastrService
  ) {}
  devices: any[] = [];
  token: any;
  errorMessage: string = '';

  ngOnInit(): void {
    const output = window.localStorage.getItem('token');
    this.token = output ? JSON.parse(output) : null;
    const url = 'http://localhost:3000/api/device/salesman';
    axios
      .get(url, {
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
    this.router.navigate(['/view-device'], { queryParams: device });
  }
  ngAfterViewInit(): void {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../assets/js/main.js';
    this.elementRef.nativeElement.appendChild(s);
  }
}
