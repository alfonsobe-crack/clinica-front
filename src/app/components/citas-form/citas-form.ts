import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Doctor, doctorspecialty, caremode, clinicasede } from '../../interfaces/doctor';
import { DoctoresService } from '../../services/doctores-service';
import { Cita } from '../../interfaces/cita';
import { CitasService } from '../../services/citas-service';
import { PacientesService } from '../../services/pacientes-service';
import { Paciente } from '../../interfaces/paciente';



@Component({
  selector: 'app-citas-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './citas-form.html',
  styleUrl: './citas-form.css'
})
export class CitasForm implements OnInit{

  citaForm!: FormGroup;
  doctors : Doctor[] = [];
  patients: Paciente[] = [];

  constructor(
    private fb: FormBuilder,
    private citasService: CitasService,
    private doctorsService: DoctoresService,
    private patientsService: PacientesService,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.doctors = this.doctorsService.getDoctors();
    this.patients = this.patientsService.getPacientes();

    this.citaForm = this.fb.group({
      doctorId: ['', Validators.required],
      patientId: ['', Validators.required],
      fechahora: ['', Validators.required]
    });
  }

  guardarCita(): void {
    if (this.citaForm.valid){
      const docId = this.citaForm.value.doctorId;
      const pcteId = this.citaForm.value.patientId;

      const doctorSel = this.doctors.find(d => d.id === +docId);
      const pacienteSel = this.patients.find(p => p.id === +pcteId);

      if(doctorSel && pacienteSel){
        this.citasService.registrarCita(pacienteSel, doctorSel,this.citaForm.value.fechahora);
        this.router.navigate(['/citas']);
        this.citaForm.reset();
      }else{
        alert('Doctor o paciente no encontrado');
      }
    }
  }

}
