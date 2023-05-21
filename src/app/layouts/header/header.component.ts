import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(@Inject(DOCUMENT) private document: Document,private router: Router) { }

  ngOnInit(): void {
    const output = window.localStorage.getItem('user');
    this.user = output ? JSON.parse(output) : null;
  }

  signOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/').then(() => {
      location.reload();
    });
  }

  sidebarToggle(): void {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
}