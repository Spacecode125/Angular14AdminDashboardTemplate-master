import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import axios from 'axios';

@Component({
  selector: 'app-rentedContract-add',
  templateUrl: './rentedContract-add.component.html',
  styleUrls: ['./rentedContract-add.component.css'],
})
export class AddRentedcontractComponent {
  deviceId: any = {};
  token: any;
  rentedContractObj: any = {
    validFrom: '',
    validTo: '',
  };

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const output = window.localStorage.getItem('token');
    this.token = output ? JSON.parse(output) : null;
    this.route.queryParams.subscribe((params) => {
      this.deviceId = params['deviceId'];
    });
    console.log(this.deviceId);
  }

  addRentedContract(): void {
    const url = `http://localhost:3000/api/rentedContract/${this.deviceId}`;
    const { validFrom, validTo } = this.rentedContractObj;
    axios
      .post(
        url,
        { validFrom, validTo },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        this.toastr.success(
          'Rental request sent to the owner wait for his response'
        );
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.error(error);
        this.toastr.error(error.response.data.message);
      });
  }
}
