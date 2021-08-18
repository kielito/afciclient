import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeAbmComponent } from './informe-abm.component';

describe('InformeAbmComponent', () => {
  let component: InformeAbmComponent;
  let fixture: ComponentFixture<InformeAbmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeAbmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
