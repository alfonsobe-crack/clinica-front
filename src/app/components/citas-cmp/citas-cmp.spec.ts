import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasCmp } from './citas-cmp';

describe('CitasCmp', () => {
  let component: CitasCmp;
  let fixture: ComponentFixture<CitasCmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasCmp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasCmp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
