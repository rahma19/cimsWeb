import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeHopitalComponent } from './liste-hopital.component';

describe('ListeHopitalComponent', () => {
  let component: ListeHopitalComponent;
  let fixture: ComponentFixture<ListeHopitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeHopitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeHopitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
