import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-traded-contract',
  templateUrl: './traded-contract.component.html',
  styleUrls: ['./traded-contract.component.css'],
})
export class TradedContractComponent implements OnInit {
  constructor(private router: Router, private toastr: ToastrService) {}
  tradedContracts: any[] = [];
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
      this.url = 'http://localhost:3000/api/tradedContract';
    }else{
      this.url = 'http://localhost:3000/api/tradedContract/salesman';
    }
    axios
      .get(this.url, {
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
        this.router.navigateByUrl('/tradedcontract').then(() => {
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
