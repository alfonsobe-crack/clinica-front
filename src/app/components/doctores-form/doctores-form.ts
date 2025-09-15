import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { caremode, clinicasede, Doctor, doctorspecialty } from '../../interfaces/doctor';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctoresService } from '../../services/doctores-service';

@Component({
  selector: 'app-doctores-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctores-form.html',
  styleUrl: './doctores-form.css'
})
export class DoctoresForm implements OnInit{

  @Output() addDoctores = new EventEmitter<Doctor>();

  doctorForm: FormGroup = new FormGroup({});
  mensajeExito: string = '';
  mensajeError: string = '';
  flg_enviando: boolean = false;
  flg_mostrarDebug: boolean = false;

  specialtyOptions = Object.values(doctorspecialty);
  caremodeOptions = Object.values(caremode);
  clinicasedeOptions = Object.values(clinicasede);

  isUpdate = false;


  constructor(private fb: FormBuilder,
              private doctoresService: DoctoresService,
              private router: Router,
              private route: ActivatedRoute
  ){  
     this.doctorForm = fb.group({
       name: ['',[Validators.required]],
       age: [null,[Validators.required, , Validators.min(0)]],
       specialty: [null,[Validators.required]],
       cmp: [null,[Validators.required, Validators.min(0)]],
       mode: [null,[Validators.required]],
       sede: [null,[Validators.required]],
       createdAt: [Date.now],
       id: [{ value:'', disabled: true}]

     });

  }

  get name(){
    return this.doctorForm.get('name');
  }

  get age(){
    return this.doctorForm.get('age');
  }

  get specialty(){
    return this.doctorForm.get('specialty');
  }

  get cmp(){
    return this.doctorForm.get('cmp');
  }

  get mode(){
    return this.doctorForm.get('mode');
  }

  get sede(){
    return this.doctorForm.get('sede');
  }

  ngOnInit(){

    const idParam = this.route.snapshot.paramMap.get('id');
    if(idParam){
      this.isUpdate = true;
      const doc = this.doctoresService.getDoctoresById(Number(idParam)); 
      if(doc){
        this.doctorForm.patchValue(doc);
      }    
    }
  }

  onSubmit(){

    this.mensajeError = '';
    this.mensajeExito = '';

    if(this.doctorForm.valid){
      this.flg_enviando = true;

      console.log('Datos del formulario Doctores', this.doctorForm.value);
      const dc: Doctor = this.doctorForm.getRawValue();
      
      if(this.isUpdate){
        this.doctoresService.updateDoctor(dc);
        this.mensajeExito = 'Doctor actualizado correctamente'
      } else {
        this.doctoresService.addDoctor(dc);
        this.mensajeExito = 'Doctor agregado correctamente';
      }
      this.router.navigate(['/doctores']);
    
    }else{
      this.doctorForm.markAllAsTouched();
      this.mensajeError = 'Por favor, completa el formulario correctamente.';
    }
  } 
  hasError(ControlName: string, errorType: string): boolean{
    const control = this.doctorForm.get(ControlName);
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
  }
  isFildInvalid(controlName: string): boolean{
    const control = this.doctorForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }  

}
