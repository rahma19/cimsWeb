import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquePaieComponent } from './historique-paie.component';

describe('HistoriquePaieComponent', () => {
  let component: HistoriquePaieComponent;
  let fixture: ComponentFixture<HistoriquePaieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriquePaieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriquePaieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
