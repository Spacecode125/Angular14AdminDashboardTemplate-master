import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-view-device-status',
  templateUrl: './view-device-status.component.html',
  styleUrls: ['./view-device-status.component.css'],
})
export class ViewDeviceStatusComponent implements OnInit {
  deviceStatusDetailsObj: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params)
      this.deviceStatusDetailsObj = {
        descriptionBeforeRent: params['descriptionBeforeRent'],
        descriptionAfterRent: params['descriptionAfterRent'],
        pictureBeforeRent: params['pictureBeforeRent'],
        pictureAfterRent: params['pictureAfterRent'],
      };
    });
  }
}
