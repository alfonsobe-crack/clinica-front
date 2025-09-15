import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctoresCmp } from './doctores-cmp';

describe('DoctoresCmp', () => {
  let component: DoctoresCmp;
  let fixture: ComponentFixture<DoctoresCmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctoresCmp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctoresCmp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
