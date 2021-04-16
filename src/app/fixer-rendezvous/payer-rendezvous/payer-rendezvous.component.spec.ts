import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerRendezvousComponent } from './payer-rendezvous.component';

describe('PayerRendezvousComponent', () => {
  let component: PayerRendezvousComponent;
  let fixture: ComponentFixture<PayerRendezvousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayerRendezvousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayerRendezvousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
