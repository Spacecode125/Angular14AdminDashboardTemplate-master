import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-traded-contract-add',
  templateUrl: './traded-contract-add.component.html',
  styleUrls: ['./traded-contract-add.component.css'],
})
export class TradedContractAddComponent implements OnInit {
  deviceId: any = {};
  token: any;
  user: any;
  tradeInOffer: any = null;
  url: string = '';
  devices: any[] = [];
  errorMessage: string = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const output = window.localStorage.getItem('token');
    this.token = output ? JSON.parse(output) : null;
    const output2 = window.localStorage.getItem('user');
    this.user = output2 ? JSON.parse(output2) : null;
    this.route.queryParams.subscribe((params) => {
      this.deviceId = params['deviceId'];
    });
    if (this.user.role == 'admin') {
      this.url = 'http://localhost:3000/api/device';
    } else {
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
        console.log(this.devices);
      })
      .catch((error) => {
        this.errorMessage = error.response.data.message;
      });
  }

  addRentedContract(): void {
    const url = 'http://localhost:3000/api/tradedContract';
    if (this.tradeInOffer==null) {
      this.toastr.error('You have to select a product first');
    } else {
      axios
        .post(
          url,
          { tradedDevice: this.deviceId, tradeInOffer: this.tradeInOffer },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.toastr.success(
            'Trade request sent to the owner wait for his response'
          );
          this.router.navigate(['/dashboard']);
        })
        .catch((error) => {
          console.error(error);
          this.toastr.error(error.response.data.message);
        });
    }
  }
}
