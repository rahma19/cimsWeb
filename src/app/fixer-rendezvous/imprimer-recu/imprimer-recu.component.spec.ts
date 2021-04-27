import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimerRecuComponent } from './imprimer-recu.component';

describe('ImprimerRecuComponent', () => {
  let component: ImprimerRecuComponent;
  let fixture: ComponentFixture<ImprimerRecuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimerRecuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimerRecuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
