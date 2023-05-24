import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeviceStatusComponent } from './view-device-status.component';

describe('ViewDeviceStatusComponent', () => {
  let component: ViewDeviceStatusComponent;
  let fixture: ComponentFixture<ViewDeviceStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDeviceStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDeviceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
