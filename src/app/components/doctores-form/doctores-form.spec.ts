import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctoresForm } from './doctores-form';

describe('DoctoresForm', () => {
  let component: DoctoresForm;
  let fixture: ComponentFixture<DoctoresForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctoresForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctoresForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
