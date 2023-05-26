import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css'],
})
export class UsersProfileComponent implements OnInit {
  user: any;
  token: any;
  selectedImage: any;
  profileObj: any;
  passwordObj: any = {
    oldPassword: '',
    newPassword: '',
    renewPassword: '',
  };

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private toastr: ToastrService
  ) {}
  handleFileInput(event: any) {
    this.selectedImage = event.target.files[0];
  }

  getImageSource(): SafeUrl {
    if (this.selectedImage) {
      return this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(this.selectedImage)
      );
    } else if (this.user && this.user.image) {
      const imageUrl = 'http://localhost:3000/api/' + this.user.image;
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    } else {
      return '';
    }
  }

  onEditProfile(): void {
    const url = 'http://localhost:3000/api/user/update';
    const { firstName, lastName, phone, address, about } = this.profileObj;
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('about', about);

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
    axios
      .put(url, formData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        this.toastr.success('Profile updated successfully');
        this.router.navigateByUrl('/').then(() => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
      })
      .catch((error) => {
        this.toastr.error(error.response.data.message);
      });
  }

  deleteImage(): void {
    this.selectedImage = null;
  }

  ngOnInit(): void {
    const output = window.localStorage.getItem('user');
    this.user = output ? JSON.parse(output) : null;
    const output2 = window.localStorage.getItem('token');
    this.token = output2 ? JSON.parse(output2) : null;

    this.profileObj = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phone: this.user.phone,
      address: this.user.address,
      about: this.user.about,
    };
  }
  changePassword(): void {
    const url = 'http://localhost:3000/api/user/updatePass';
    const { oldPassword, newPassword, renewPassword } = this.passwordObj;
    if (newPassword !== renewPassword) {
      this.toastr.error("The password doesn't match the new password");
    } else {
      axios
        .put(
          url,
          { oldPassword, newPassword },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          this.toastr.success('Password successfully updated');
          this.passwordObj = {
            oldPassword: '',
            newPassword: '',
            renewPassword: '',
          };
        })
        .catch((error) => {
          this.toastr.error(error.response.data.message);
        });
    }
  }
}
