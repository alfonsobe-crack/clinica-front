import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesCmp } from './pacientes-cmp';

describe('PacientesCmp', () => {
  let component: PacientesCmp;
  let fixture: ComponentFixture<PacientesCmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientesCmp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientesCmp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
