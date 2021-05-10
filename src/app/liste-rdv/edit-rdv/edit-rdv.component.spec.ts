import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRdvComponent } from './edit-rdv.component';

describe('EditRdvComponent', () => {
  let component: EditRdvComponent;
  let fixture: ComponentFixture<EditRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRdvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
