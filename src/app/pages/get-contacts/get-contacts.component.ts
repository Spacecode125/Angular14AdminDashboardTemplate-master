import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-get-contacts',
  templateUrl: './get-contacts.component.html',
  styleUrls: ['./get-contacts.component.css'],
})
export class GetContactsComponent implements OnInit {
  token: any;
  mails: any[] = [];
  errorMessage: string = '';
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  maxSize: number = 5;
  allMails: any[] = [];

  pageChanged(event: PageChangedEvent): void {
    this.currentPage = event.page;
    this.loadMails();
  }

  constructor() {}

  ngOnInit(): void {
    const output = window.localStorage.getItem('token');
    this.token = output ? JSON.parse(output) : null;
    this.loadMails();
  }
  loadMails(): void {
    const url = 'http://localhost:3000/api/contact';
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.allMails = response.data;
        this.totalItems = this.allMails.length;
        this.applyPagination();
        console.log('Mails:', this.mails);
        console.log('Total Items:', this.totalItems);
      })
      .catch((error) => {
        this.errorMessage = error.response.data.message;
      });
  }
  applyPagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.mails = this.allMails.slice(startIndex, endIndex);
  }
}
