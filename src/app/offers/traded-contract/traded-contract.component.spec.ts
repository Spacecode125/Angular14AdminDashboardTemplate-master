import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradedContractComponent } from './traded-contract.component';

describe('TradedContractComponent', () => {
  let component: TradedContractComponent;
  let fixture: ComponentFixture<TradedContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradedContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradedContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
