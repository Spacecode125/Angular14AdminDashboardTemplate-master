import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.css'],
})
export class EditDeviceComponent implements OnInit {
  token: any;
  selectedImage: any;
  editDeviceObj: any = {};

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  handleFileInput(event: any) {
    this.selectedImage = event.target.files[0];
  }

  editDevice(): void {
    const url = `http://localhost:3000/api/device/update/${this.editDeviceObj._id}`;
    const {
      brand,
      type,
      description,
      purchacePrice,
      rentalPrice,
      yearOfManufacture,
    } = this.editDeviceObj;
    const formData = new FormData();
    formData.append('description', description);
    formData.append('type', type);
    formData.append('brand', brand);
    formData.append('rentalPrice', rentalPrice);
    formData.append('purchacePrice', purchacePrice);

    if (yearOfManufacture) {
      formData.append('yearOfManufacture', yearOfManufacture);
    } else {
      formData.append(
        'yearOfManufacture',
        this.editDeviceObj.yearOfManufacture
      );
    }
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    } else {
      formData.append('image', this.editDeviceObj.image);
    }

    axios
      .put(url, formData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response);
        this.toastr.success('Device updated successfully');
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
    this.route.queryParams.subscribe((params) => {
      this.editDeviceObj = {
        brand: params['brand'],
        type: params['type'],
        description: params['description'],
        purchacePrice: params['purchacePrice'],
        rentalPrice: params['rentalPrice'],
        yearOfManufacture: params['yearOfManufacture'],
        image: params['image'],
        _id: params['_id'],
      };
    });
  }
}
