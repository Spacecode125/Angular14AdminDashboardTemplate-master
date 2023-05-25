import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css']
})
export class AddContractComponent implements OnInit {
  showRentedContractDiv = false;
  showTradedContractDiv = false;
  showPurchaseContractDiv = false;
  rentedContractIdRequired: boolean | undefined;
  tradedContractIdRequired: boolean | undefined;
  purchaseContractIdRequired: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  onContractTypeChange(event: any) {
    const selectedContractType = event.target.value;
    this.showRentedContractDiv = selectedContractType === 'RentedContract';
    this.showTradedContractDiv = selectedContractType === 'TradedContract';
    this.showPurchaseContractDiv = selectedContractType === 'PurchaseContract';

    this.rentedContractIdRequired = selectedContractType === 'RentedContract';
    this.tradedContractIdRequired = selectedContractType === 'TradedContract';
    this.purchaseContractIdRequired = selectedContractType === 'PurchaseContract';
  }





}
