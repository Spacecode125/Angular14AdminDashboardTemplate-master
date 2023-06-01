import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css'],
})
export class AddContractComponent implements OnInit {
  url: string = '';
  reference: string = '';
  contractType: string = '';
  errorMessage: string = '';
  contracts: any[] = [];
  user: any;
  token: any;
  product: any = null;

  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    const output = window.localStorage.getItem('token');
    this.token = output ? JSON.parse(output) : null;
    const output2 = window.localStorage.getItem('user');
    this.user = output2 ? JSON.parse(output2) : null;
  }

  checkSelectedValue(): void {
    if (this.contractType === 'Trade') {
      if (this.user.role === 'admin') {
        this.url = 'http://localhost:3000/api/tradedContract';
      } else {
        this.url = 'http://localhost:3000/api/tradedContract/salesman';
      }
    } else if (this.contractType === 'Rent') {
      if (this.user.role === 'admin') {
        this.url = 'http://localhost:3000/api/rentedContract';
      } else {
        this.url = 'http://localhost:3000/api/rentedContract/salesman';
      }
    } else if (this.contractType === 'Purchase') {
      if (this.user.role === 'admin') {
        this.url = 'http://localhost:3000/api/purchaseContract';
      } else {
        this.url = 'http://localhost:3000/api/purchaseContract/salesman';
      }
    } else {
      this.url = '';
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
        console.error(error);
        this.errorMessage = error.response.data.message;
      });
  }

  addContract(): void {
    const contractURL = 'http://localhost:3000/api/contract';
    if (this.product === null) {
      this.toastr.error('You have to select a product first');
    } else {
      const requestBody: any = {
        reference: this.reference,
        signedbyPartner: this.product.client._id,
      };

      if (this.contractType === 'Trade') {
        requestBody.tradedContractId = this.product._id;
      } else if (this.contractType === 'Purchase') {
        requestBody.purchaseContractId = this.product._id;
      } else if (this.contractType === 'Rent') {
        requestBody.rentedContractId = this.product._id;
      }

      console.log(requestBody)
      axios
        .post(contractURL, requestBody, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.toastr.success('Your contract successfully created');
          this.router.navigate(['/contracts']);
        })
        .catch((error) => {
          console.error(error);
          this.toastr.error(error.response.data.message);
        });
    }
  }
}
