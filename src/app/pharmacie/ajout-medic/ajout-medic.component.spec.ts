import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutMedicComponent } from './ajout-medic.component';

describe('AjoutMedicComponent', () => {
  let component: AjoutMedicComponent;
  let fixture: ComponentFixture<AjoutMedicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutMedicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutMedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
