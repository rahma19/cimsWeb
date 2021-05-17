import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPharmComponent } from './edit-pharm.component';

describe('EditPharmComponent', () => {
  let component: EditPharmComponent;
  let fixture: ComponentFixture<EditPharmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPharmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPharmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
