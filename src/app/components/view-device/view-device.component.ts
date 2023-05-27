import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-device',
  templateUrl: './view-device.component.html',
  styleUrls: ['./view-device.component.css'],
})
export class ViewDeviceComponent implements OnInit {
  deviceDetailsObj: any = {};
  user: any;
  token: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const output = window.localStorage.getItem('user');
    this.user = output ? JSON.parse(output) : null;
    const output2 = window.localStorage.getItem('token');
    this.token = output2 ? JSON.parse(output2) : null;
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      const user = params['user'] ? JSON.parse(params['user']) : null;
      this.deviceDetailsObj = {
        brand: params['brand'],
        type: params['type'],
        deviceId: params['_id'],
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

  purchaseButton(deviceId: any): void {
    console.log(this.token);
    console.log(deviceId);
    const url = `http://localhost:3000/api/purchaseContract/${deviceId}`;
    axios
      .post(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.toastr.success(
          'A purchase request sent to the owner wait for his response'
        );
      })
      .catch((error) => {
        this.toastr.error(error.response.data.message);
      });
  }
  navigateToAddRentedContract(deviceId: any): void {
    this.router.navigate(['/rentedcontract-add'], {
      queryParams: { deviceId },
    });
  }
  navigateToAddTradedContract(deviceId: any): void {
    this.router.navigate(['/add-tradedContract'], {
      queryParams: { deviceId },
    });
  }
}
