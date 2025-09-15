import { Injectable } from '@angular/core';
import { caremode, clinicasede, Doctor, doctorspecialty } from '../interfaces/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctoresService {

  private doc: Doctor[] = [

    {
      id: 1,
      name: 'Paulo Gonzales',
      age: 38,
      specialty: doctorspecialty.TRAUMATOLOGIA,
      cmp: 28292,
      mode: caremode.PRESENCIAL,
      sede: clinicasede.SANBORJA,
      createdAt: new Date('2025-08-01')

    },
    {
      id: 2,
      name: 'Scarlet Alvarez',
      age: 36,
      specialty: doctorspecialty.NEUMOLOGIA,
      cmp: 28302,
      mode: caremode.VIRTUAL,
      sede: clinicasede.SURCO,
      createdAt: new Date('2025-08-01')

    },   
    {
      id: 3,
      name: 'Luis Alan Sanchez',
      age: 38,
      specialty: doctorspecialty.GERIATRIA,
      cmp: 20002,
      mode: caremode.VIRTUAL,
      sede: clinicasede.LIMA,
      createdAt: new Date('2025-08-01')

    }    
    
  ];

  getDoctors(): Doctor[]{
    return this.doc;
  }

  getDoctoresById(Id: number): Doctor | undefined{
    return this.doc.find(d => d.id === Id);
  }

  getDoctorsByEspecialidad(especialidad: string): Doctor[]{
     const result = this.doc.filter(d => d.specialty === especialidad);

     if(!result){
      alert("Especialidad no existe");
     }
     return result;

  }

  getDoctorsBySede(sede: string): Doctor[]{
     const result = this.doc.filter(d => d.sede === sede);

     if(!result){
      alert("Sede no existe");
     }
     return result;

  }

   getDoctorsByModalidad(modalidad: string): Doctor[]{
     const result = this.doc.filter(d => d.mode === modalidad);

     if(!result){
      alert("Modalidad no existe");
     }
     return result;

  } 

  addDoctor(doc: Omit<Doctor, 'id'>): void{
    console.log('agregando doc');
    const existeCMP = this.doc.find(d => d.cmp === doc.cmp);

    if(existeCMP){
      alert('Ya existe un doctor registrado con ese CMP');
      return;
    }
    const newDoctor: Doctor={
      ...doc,
      id: this.generateId(),
      createdAt: new Date()
    };
    this.doc.push(newDoctor);
  }

  private generateId(): number {

    return this.doc.length > 0 ? Math.max(...this.doc.map(p => p.id)) + 1 : 1;
  }

  updateDoctor(docActualizado:Doctor): void{
    const i = this.doc.findIndex(p => p.id === docActualizado.id);
    console.log('Index encontrado',i);
    if(i !== -1){
      this.doc[i] = {
        ...this.doc[i],
        ...docActualizado,
      }
    }
  }

  deletedoc(id: number): void{
    this.doc = this.doc.filter(d => d.id !== id);
  }


  
}
