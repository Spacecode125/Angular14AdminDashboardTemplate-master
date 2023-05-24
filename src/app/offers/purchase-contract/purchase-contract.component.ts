import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-contract',
  templateUrl: './purchase-contract.component.html',
  styleUrls: ['./purchase-contract.component.css']
})
export class PurchaseContractComponent implements OnInit {
  constructor(
    private router: Router,
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
        this.errorMessage = 'Failed to fetch purchase contracts.';
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

  deleteContract(contractId: string): void {
    console.log(`Delete contract with ID: ${contractId}`);
  }
}
