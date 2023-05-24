import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-traded-contract',
  templateUrl: './traded-contract.component.html',
  styleUrls: ['./traded-contract.component.css'],
})
export class TradedContractComponent implements OnInit {
  toastr: any;
  constructor(private router: Router) {}
  tradedContracts: any[] = [];
  errorMessage: string = '';
  token: any;

  ngOnInit(): void {
    const url = 'http://localhost:3000/api/tradedContract/salesman';
    const output = window.localStorage.getItem('token');
    this.token = output ? JSON.parse(output) : null;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.tradedContracts = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        this.errorMessage = 'Failed to fetch traded contracts.';
      });
  }

  deleteContract(contractId: string): void {
    const url = `http://localhost:3000/api/tradedContract/${contractId}`;
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
        this.toastr.success('traded product deleted successfully');
      })
      .catch((error) => {
        this.toastr.error(error.response.data.message);
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
}
