import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-traded-contract',
  templateUrl: './traded-contract.component.html',
  styleUrls: ['./traded-contract.component.css']
})
export class TradedContractComponent implements OnInit {
  constructor(
    private router: Router,
  ) {}
  tradedContracts: any[] = [];
  errorMessage: string = '';
  token :any;


  ngOnInit(): void {
    const url = 'http://localhost:3000/api/tradedContract/salesman';
    const output = window.localStorage.getItem('token');
    this.token = output ? JSON.parse(output) : null;
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
      .then(response => {
        this.tradedContracts = response.data;
      })
      .catch(error => {
        console.error(error);
        this.errorMessage = 'Failed to fetch traded contracts.';
      });
  }

  viewtradeddevice(contract: any): void {
    const queryParams = { ...contract, user: JSON.stringify(contract.id) };
    this.router.navigate(['/view-device'], { queryParams });
  }

  deleteContract(contractId: string): void {
    console.log(`Delete contract with ID: ${contractId}`);
  }

  viewContractById(contractId: string): void {
    console.log(`View contract by ID: ${contractId}`);
  }
}
