import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pages-contact',
  templateUrl: './pages-contact.component.html',
  styleUrls: ['./pages-contact.component.css'],
})
export class PagesContactComponent implements OnInit {
  contactObj: any = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {}

  sendEmail(): void {
    const url = 'http://localhost:3000/api/contact';
    const { name, email, subject, message } = this.contactObj;
    axios
      .post(url, { name, email, subject, message })
      .then((response) => {
        this.toastr.success('Email sent successfully');
        this.contactObj = {
          name: '',
          email: '',
          subject: '',
          message: '',
        };
      })
      .catch((error) => {
        this.toastr.error(error.response.data.message);
      });
  }
}
