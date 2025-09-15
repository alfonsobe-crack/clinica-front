import { Injectable } from '@angular/core';
import { ApptmStatus, Cita } from '../interfaces/cita';
import { caremode, clinicasede, Doctor, doctorspecialty } from '../interfaces/doctor';
import { Paciente, patientsex } from '../interfaces/paciente';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private citas: Cita[] = [
    {
      id: 1,
      doctorId:{
        id: 1,
        name: 'Paulo Gonzales',
        age: 38,
        specialty: doctorspecialty.TRAUMATOLOGIA,
        cmp: 28292,
        mode: caremode.PRESENCIAL,
        sede: clinicasede.SANBORJA

      } as Doctor,
      patientId:{
        id: 2,
        name: 'Carlos Zegarra',
        email: 'cazesa@gmail.com',
        age: 33,
        weight: 100,
        height: 173,
        sex: patientsex.MALE,
        hasdiagnoses: false,
        insured: true,
        insurancecompany: 'Rimac Seguros'
      } as Paciente,
      fechahora: new Date('2025-09-15'),
      specialty: 'Cardiologia',
      sede: 'San Borja',
      mode: 'Presencial',
      status: ApptmStatus.SCHEDULED,
      createdAt: new Date('2025-09-14')
    }

  ];

  private apptSubject = new BehaviorSubject<Cita[]>([...this.citas]);
  citas$ = this.apptSubject.asObservable();

  getCitas(): Cita[]{
    return this.citas;
  }

  getCitasById(Id: number): Cita | undefined{
    return this.citas.find(d => d.id === Id);
  }


  registrarCita(pcte: Paciente, doc: Doctor, fecha: Date){

  
     const fechaCita = fecha instanceof Date ? fecha : new Date(fecha);

     const ahora = new Date();
     if(fechaCita.getTime() < ahora.getTime()){
       alert('No se puede registrar citas en fechas pasadas');
       return;
     }

     const dia = fechaCita.getDay();
     const hora = fechaCita.getHours();

     const esLaboral = dia >= 1 && dia <= 6 && hora >= 8 && hora < 18;
     console.log('Es Laboral', esLaboral);

     if(!esLaboral){
      alert('Horario de atención: Lun-Vie 8:00 - 18:00');
      return;   
     }

     const conflicto = this.citas.some(c => c.doctorId.id && c.fechahora.getTime() === fechaCita.getTime());

     if (conflicto){
      alert(`El doctor ${doc.name} ya tiene una cita en esa fecha y hora`);
      return;
     }


    const nuevo: Cita = {
      id: this.citas.length + 1,
      patientId: pcte,
      doctorId: doc,
      fechahora: fechaCita,
      specialty: doc.specialty,
      sede: doc.sede,
      mode: doc.mode,
      status: ApptmStatus.SCHEDULED,
      createdAt: new Date()
    };
    this.citas.push(nuevo);
    this.apptSubject.next(this.citas);
  }

  cancelarCita(id: number){
    const cita = this.citas.find(p => p.id === id);
    if (!cita) return;

    cita.status = ApptmStatus.CANCELLED;
    this.apptSubject.next(this.citas);
  }

    updateCita(citaActualizado:Cita): void{
    const i = this.citas.findIndex(p => p.id === citaActualizado.id);
    console.log('Index encontrado',i);
    if(i !== -1){
      this.citas[i] = {
        ...this.citas[i],
        ...citaActualizado,
      }
    }
  }
  
}
