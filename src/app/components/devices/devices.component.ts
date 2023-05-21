import { Component, OnInit, ElementRef } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export class DevicesComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}
  devices: any[] = [];
  token: any;

  ngOnInit(): void {
    const output = window.localStorage.getItem('token');
    this.token = output ? JSON.parse(output) : null;
    const url = 'http://localhost:3000/api/device/salesman';
    axios
      .get(url,{
        headers: {
          Authorization: `Bearer ${this.token}`,
        }
      })
      .then((response) => {
        this.devices = response.data;
        console.error(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  }
  deleteDevice(id: any): void {
    const url = `http://localhost:3000/api/device/${id}`;
    console.log(id);
    axios
      .delete(url,{
        headers: {
          Authorization: `Bearer ${this.token}`,
        }
      })
      .then((response) => {
        console.error(response.data.message);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  }
  ngAfterViewInit(): void {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../assets/js/main.js';
    this.elementRef.nativeElement.appendChild(s);
  }
}
