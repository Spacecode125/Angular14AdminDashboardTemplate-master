import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-view-device-status',
  templateUrl: './view-device-status.component.html',
  styleUrls: ['./view-device-status.component.css'],
})
export class ViewDeviceStatusComponent implements OnInit {
  deviceStatusId: any;
  deviceStatusDetailsObj: any = [];
  errorMessage: String = '';
  token: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.deviceStatusId = params['deviceStatusId'];
    });
    const output = window.localStorage.getItem('token');
    this.token = output ? JSON.parse(output) : null;
    const url = `http://localhost:3000/api/deviceStatus/${this.deviceStatusId}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.deviceStatusDetailsObj = response.data;
      })
      .catch((error) => {
        this.errorMessage = error.response.data.message;
      });
  }
}
