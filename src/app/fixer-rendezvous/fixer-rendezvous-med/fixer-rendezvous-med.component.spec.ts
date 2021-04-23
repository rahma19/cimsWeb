import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixerRendezvousMedComponent } from './fixer-rendezvous-med.component';

describe('FixerRendezvousMedComponent', () => {
  let component: FixerRendezvousMedComponent;
  let fixture: ComponentFixture<FixerRendezvousMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixerRendezvousMedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixerRendezvousMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
