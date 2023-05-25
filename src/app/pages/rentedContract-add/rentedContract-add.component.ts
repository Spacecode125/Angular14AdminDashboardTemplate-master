import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import axios from 'axios';

@Component({
  selector: 'app-rentedContract-add',
  templateUrl: './rentedContract-add.component.html',
  styleUrls: ['./rentedContract-add.component.css']
})
export class AddRentedcontractComponent {
  validFrom: any;
  validTo: any;
  deviceId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.route.queryParams.subscribe(params => {
      this.deviceId = params['deviceId'];
    });
  }

  validFromChange(value: Date): void {
    this.validFrom = value;
  }

  validToChange(value: Date): void {
    this.validTo = value;
  }

  onSubmit(): void {
    const formData = {
      validFrom: this.validFrom,
      validTo: this.validTo
    };

    axios.post(`/api/rentedcontract/${this.deviceId}`, formData)
      .then((response) => {
        console.log(response.data);
        this.toastr.success('Rented contract submitted successfully!', 'Success');
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.error(error);
        this.toastr.error('An error occurred while submitting the rented contract.', 'Error');
      });
  }
}
