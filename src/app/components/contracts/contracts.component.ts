import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {
  token: any;
  user: any;
  contracts: any[]=[];
  errorMessage: string = '';
  url: string = '';

  constructor(private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    const output = window.localStorage.getItem('token');
    this.token = output ? JSON.parse(output) : null;
    const output2 = window.localStorage.getItem('user');
    this.user = output2 ? JSON.parse(output2) : null;
    if(this.user.role=='admin'){
      this.url = 'http://localhost:3000/api/contract';
    }else{
      this.url = 'http://localhost:3000/api/contract/salesman';
    }
    axios
      .get(this.url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.contracts = response.data;
      })
      .catch((error) => {
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

  deleteContract(contractId:any): void{
    const url = `http://localhost:3000/api/contract/${contractId}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.router.navigateByUrl('/contracts').then(() => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
        this.toastr.success('Contract deleted successfully');
      })
      .catch((error) => {
        this.toastr.error(error.response.data.message);
      });
  }

}
