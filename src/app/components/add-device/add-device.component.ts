import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css'],
})
export class AddDeviceComponent implements OnInit {
  token: any;
  selectedImage: any;
  addDeviceObj: any = {};

  constructor(private router: Router, private toastr: ToastrService) {}

  handleFileInput(event: any) {
    this.selectedImage = event.target.files[0];
  }

  addDevice(): void {
    const url = 'http://localhost:3000/api/device';
    const {
      brand,
      type,
      description,
      serialNumber,
      purchacePrice,
      rentalPrice,
      yearOfManufacture,
    } = this.addDeviceObj;
    const formData = new FormData();
    formData.append('description', description);
    formData.append('type', type);
    formData.append('brand', brand);
    formData.append('serialNumber', serialNumber);
    formData.append('rentalPrice', rentalPrice);
    formData.append('purchacePrice', purchacePrice);
    formData.append('yearOfManufacture', yearOfManufacture);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
    console.log(this.selectedImage);
    console.log(yearOfManufacture);

    axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response);
        this.toastr.success('Device added successfully');
        this.router.navigate(['/devices']);
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error(error.response.data.message);
      });
  }

  ngOnInit(): void {
    const output = window.localStorage.getItem('token');
    this.token = output ? JSON.parse(output) : null;
  }
}
