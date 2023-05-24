import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-devicestatus-add',
  templateUrl: './devicestatus-add.component.html',
  styleUrls: ['./devicestatus-add.component.css'],
})
export class AddDevicestatusComponent implements OnInit {
  token: any;
  selectedImageBefore: any;
  selectedImageAfter: any;
  addDeviceObj: any = {};
  deviceId: any = {};

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  handlePictureBeforeRent(event: any) {
    this.selectedImageBefore = event.target.files[0];
  }
  handlePictureAfterRent(event: any) {
    this.selectedImageAfter = event.target.files[0];
  }

  addDeviceStatus(): void {
    const url = `http://localhost:3000/api/deviceStatus/${this.deviceId}`;
    const { descriptionBeforeRent, descriptionAfterRent } = this.addDeviceObj;
    const formData = new FormData();
    formData.append('descriptionAfterRent', descriptionAfterRent);
    formData.append('descriptionBeforeRent', descriptionBeforeRent);
    if (this.selectedImageBefore) {
      formData.append('pictureBeforeRent', this.selectedImageBefore);
    }
    if (this.selectedImageAfter) {
      formData.append('pictureAfterRent', this.selectedImageAfter);
    }

    axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response);
        this.toastr.success('Device status added successfully');
        this.router.navigate(['/rentedcontract']);
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
      this.deviceId = params['deviceId'];
      console.log(params['deviceId']);
    });
  }
}
