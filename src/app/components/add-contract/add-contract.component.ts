import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import axios from 'axios';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css'],
})
export class AddContractComponent implements OnInit {
  addContractObj: any = {};

  constructor(private router: Router, private toastr: ToastrService) {}

  addContract(): void {
    const url = 'http://localhost:3000/api/contract';
    const { reference, signedbyPartner, purchaseContractId } = this.addContractObj;

    const data = {
      reference,
      signedbyPartner,
      purchaseContractId,
    };

    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        this.toastr.success('Contract added successfully');
        this.router.navigate(['/contracts']);
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error(error.response.data.message);
      });
  }

  ngOnInit(): void {}
}
