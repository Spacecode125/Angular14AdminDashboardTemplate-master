import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-purchase-contract',
  templateUrl: './purchase-contract.component.html',
  styleUrls: ['./purchase-contract.component.css']
})
export class PurchaseContractComponent implements OnInit {
  constructor(
    private router: Router, private toastr: ToastrService
  ) {}

  purchaseContracts: any[] = [];
  errorMessage: string = '';
  url: string = '';
  token: any;
  user: any;

  ngOnInit(): void {
    const output = window.localStorage.getItem('token');
    this.token = output ? JSON.parse(output) : null;
    const output2 = window.localStorage.getItem('user');
    this.user = output2 ? JSON.parse(output2) : null;
    if(this.user.role=='admin'){
      this.url = 'http://localhost:3000/api/purchaseContract';
    }else{
      this.url = 'http://localhost:3000/api/purchaseContract/salesman';
    }
    axios.get(this.url, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
      .then(response => {
        this.purchaseContracts = response.data;
      })
      .catch(error => {
        console.error(error);
        this.errorMessage = error.response.data.message;
      });
  }

  navigateToDeviceDetails(device: any): void {
    if (device != null) {
      const queryParams = { ...device, user: JSON.stringify(device.user) };
      this.router.navigate(['/view-device'], { queryParams });
    } else {
      this.router.navigate(['/error-404']);
    }
  }

  acceptPurchase(purchaseId: string): void {
    const url = `http://localhost:3000/api/purchaseContract/accept/${purchaseId}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.router.navigateByUrl('/purchasecontract').then(() => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
        this.toastr.success('purchase accepted successfully');
      })
      .catch((error) => {
        this.toastr.error(error.response.data.message);
      });
  }

  declinePurchase(purchaseId: string): void {
    const url = `http://localhost:3000/api/purchaseContract/cancel/${purchaseId}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.router.navigateByUrl('/purchasecontract').then(() => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
        this.toastr.success('purchase accepted successfully');
      })
      .catch((error) => {
        this.toastr.error(error.response.data.message);
      });
  }

}
