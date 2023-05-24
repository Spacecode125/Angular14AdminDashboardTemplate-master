import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-device',
  templateUrl: './view-device.component.html',
  styleUrls: ['./view-device.component.css'],
})
export class ViewDeviceComponent implements OnInit {
  deviceDetailsObj: any = {};
  user: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const output = window.localStorage.getItem('user');
    this.user = output ? JSON.parse(output) : null;
    this.route.queryParams.subscribe((params) => {
      console.log(params)
      const user = params['user'] ? JSON.parse(params['user']) : null;
      this.deviceDetailsObj = {
        brand: params['brand'],
        type: params['type'],
        description: params['description'],
        purchacePrice: params['purchacePrice'],
        rentalPrice: params['rentalPrice'],
        yearOfManufacture: params['yearOfManufacture'],
        image: params['image'],
        phone: user ? user['phone'] : null,
        owner: user ? user['firstName'] + ' ' + user['lastName'] : null,
        address: user ? user['address'] : null,
      };
    });
  }
}
