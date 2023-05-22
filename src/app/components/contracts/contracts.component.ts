import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {
  user: any;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../assets/js/main.js';
    this.elementRef.nativeElement.appendChild(s);
    const output = window.localStorage.getItem('user');
    this.user = output ? JSON.parse(output) : null;
  }

}
