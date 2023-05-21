import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseContractComponent } from './purchase-contract.component';

describe('PurchaseContractComponent', () => {
  let component: PurchaseContractComponent;
  let fixture: ComponentFixture<PurchaseContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
