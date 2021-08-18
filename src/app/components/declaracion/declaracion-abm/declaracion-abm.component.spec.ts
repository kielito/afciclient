import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaracionAbmComponent } from './declaracion-abm.component';

describe('DeclaracionAbmComponent', () => {
  let component: DeclaracionAbmComponent;
  let fixture: ComponentFixture<DeclaracionAbmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclaracionAbmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclaracionAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
