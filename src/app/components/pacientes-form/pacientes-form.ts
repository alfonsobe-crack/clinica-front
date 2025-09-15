import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Paciente, patientsex } from '../../interfaces/paciente';
import { PacientesService } from '../../services/pacientes-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pacientes-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pacientes-form.html',
  styleUrl: './pacientes-form.css'
})
export class PacientesForm implements OnInit {

  @Output() addPacientes = new EventEmitter<Paciente>();

  pacienteForm: FormGroup = new FormGroup({});
  mensajeExito: string = '';
  mensajeError: string = '';
  flg_enviando: boolean = false;
  flg_mostrarDebug: boolean = false;

  sexoEnum = patientsex;
  sexoOptions = Object.values(patientsex);

  isUpdate = false;

  constructor(private fb: FormBuilder,
              private pacientesService: PacientesService,
              private router: Router,
              private route: ActivatedRoute
  ){
     this.pacienteForm = fb.group({
       nrodocumento: [null,[Validators.required, , Validators.min(0)]],
       name: ['',[Validators.required]],
       email: ['',[Validators.required, , Validators.email]],
       age: [null,[Validators.required, , Validators.min(0)]],
       weight: [null,[Validators.required, Validators.min(0)]],
       height: [null,[Validators.required, Validators.min(0)]],
       sex: [null,[Validators.required]],
       hasdiagnoses: [false],
       insured: [false],
       createdAt: [Date.now],
       id: [{ value:'', disabled: true}]

     });

  }

  get nrodocumento(){
    return this.pacienteForm.get('nrodocumento');
  }
  get name(){
    return this.pacienteForm.get('name');
  }

  get email(){
    return this.pacienteForm.get('email');
  }

  get age(){
    return this.pacienteForm.get('age');
  }

  get weight(){
    return this.pacienteForm.get('weight');
  }

  get height(){
    return this.pacienteForm.get('height');
  }

  get sex(){
    return this.pacienteForm.get('sex');
  }

  get hasdiagnoses(){
    return this.pacienteForm.get('hasdiagnoses');
  }

  get insured(){
    return this.pacienteForm.get('insured');
  }  

  ngOnInit(){

    const idParam = this.route.snapshot.paramMap.get('id');
    if(idParam){
      this.isUpdate = true;
      const pax = this.pacientesService.getPacientesById(Number(idParam)); 
      if(pax){
        this.pacienteForm.patchValue(pax);
      }    
    }
  }

  onSubmit(){

    this.mensajeError = '';
    this.mensajeExito = '';

    if(this.pacienteForm.valid){
      this.flg_enviando = true;

      console.log('Datos del formulario Pacientes', this.pacienteForm.value);
      const pxt: Paciente = this.pacienteForm.getRawValue();
      
      if(this.isUpdate){
        this.pacientesService.updatePaciente(pxt);
        this.mensajeExito = 'Paciente actulizado correctamente'
      } else {
        this.pacientesService.addPaciente(pxt);
        this.mensajeExito = 'Paciente agregado correctamente';
      }
      this.router.navigate(['/pacientes']);
    
    }else{
      this.pacienteForm.markAllAsTouched();
      this.mensajeError = 'Por favor, completa el formulario correctamente.';
    }
  }
  hasError(ControlName: string, errorType: string): boolean{
    const control = this.pacienteForm.get(ControlName);
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
  }
  isFildInvalid(controlName: string): boolean{
    const control = this.pacienteForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  } 


}
