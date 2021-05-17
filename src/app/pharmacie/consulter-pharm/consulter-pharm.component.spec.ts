import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterPharmComponent } from './consulter-pharm.component';

describe('ConsulterPharmComponent', () => {
  let component: ConsulterPharmComponent;
  let fixture: ComponentFixture<ConsulterPharmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterPharmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterPharmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
