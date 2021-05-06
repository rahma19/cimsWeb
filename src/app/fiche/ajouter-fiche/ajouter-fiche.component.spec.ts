import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterFicheComponent } from './ajouter-fiche.component';

describe('AjouterFicheComponent', () => {
  let component: AjouterFicheComponent;
  let fixture: ComponentFixture<AjouterFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterFicheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
