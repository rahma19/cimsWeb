import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixerRendezvousComponent } from './fixer-rendezvous.component';

describe('FixerRendezvousComponent', () => {
  let component: FixerRendezvousComponent;
  let fixture: ComponentFixture<FixerRendezvousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixerRendezvousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixerRendezvousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
