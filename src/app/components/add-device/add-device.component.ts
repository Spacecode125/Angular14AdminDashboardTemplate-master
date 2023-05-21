import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css'],
})
export class AddDeviceComponent implements OnInit {
  token: any;
  addDeviceObj: any = {
    description: '',
    type: '',
    brand: '',
    serialNumber: '',
    purchacePrice: '',
    rentalPrice: '',
    yearOfManufacture: '',
    image: '',
  };

  constructor(private router: Router) {}

  onLogin(): void {
    const url = 'http://localhost:3000/api/device';
    const {
      description,
      type,
      brand,
      serialNumber,
      purchacePrice,
      rentalPrice,
      yearOfManufacture,
      image,
    } = this.addDeviceObj;

    axios
      .post(
        url,
        {
          description,
          type,
          brand,
          serialNumber,
          purchacePrice,
          rentalPrice,
          yearOfManufacture,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        this.router.navigate(['/device']);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  }

  ngOnInit(): void {
    const output = window.localStorage.getItem('token');
    this.token = output ? JSON.parse(output) : null;
  }
}
