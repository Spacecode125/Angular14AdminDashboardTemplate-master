import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-view-contract',
  templateUrl: './view-contract.component.html',
  styleUrls: ['./view-contract.component.css'],
})
export class ViewContractComponent implements OnInit {
  contractObj: any = {};
  isDownloaded: boolean = false;

  constructor(private route: ActivatedRoute) {}

  @ViewChild('container', { static: false }) el!: ElementRef;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.contractObj = {
        owner: params['signedbyOwner']
          ? JSON.parse(params['signedbyOwner'])
          : null,
        client: params['signedbyPartner']
          ? JSON.parse(params['signedbyPartner'])
          : null,
        rent: params['RentedContract']
          ? JSON.parse(params['RentedContract'])
          : null,
        trade: params['TradedContract']
          ? JSON.parse(params['TradedContract'])
          : null,
        purchase: params['PurchaseContract']
          ? JSON.parse(params['PurchaseContract'])
          : null,
        type: params['type'],
        createdAt: params['createdAt'],
        reference: params['reference'],
      };
    });
  }

  printPDFContract() {
    const options = {
      margin: 10,
      filename: 'contract.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    const element = this.el.nativeElement;

    html2pdf().set(options).from(element).save();
    this.isDownloaded = true;
  }
}
