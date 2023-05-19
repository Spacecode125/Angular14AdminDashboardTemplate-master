import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css'],
})

export class UsersProfileComponent implements OnInit {
  user: any;
  selectedImage: any;
  constructor(private sanitizer: DomSanitizer) {}
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

  deleteImage(): void {
    this.selectedImage = null;
  }
  ngOnInit(): void {
    const output = window.localStorage.getItem('user');
    this.user = output ? JSON.parse(output) : null;
  }
}




