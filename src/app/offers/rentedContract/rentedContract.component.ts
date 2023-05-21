import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-rentedContract',
  templateUrl: './rentedContract.component.html',
  styleUrls: ['./rentedContract.component.css']
})
export class RentedContractComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../assets/js/main.js';
    this.elementRef.nativeElement.appendChild(s);
  }

}
