import { Injectable } from '@angular/core';
import { Paciente, patientsex } from '../interfaces/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private pcte: Paciente[] = [

    {
      id: 1,
      nrodocumento: '44990657',
      name: 'Alfonso Bernabe',
      email: 'alfonso.bernabe.05@gmail.com',
      age: 37,
      weight: 83,
      height: 176,
      sex: patientsex.MALE,
      hasdiagnoses: false,
      insured: true,
      insurancecompany: 'Rimac Seguros',
      activeAppointments: 0,
      createdAt: new Date('2025-08-01')
    },

    {
      id: 2,
      nrodocumento: '10293844',
      name: 'Carlos Zegarra',
      email: 'cazesa@gmail.com',
      age: 33,
      weight: 100,
      height: 173,
      sex: patientsex.MALE,
      hasdiagnoses: false,
      insured: true,
      insurancecompany: 'Rimac Seguros',
      activeAppointments: 0,
      createdAt: new Date('2025-08-01')
    },    

    {
      id: 3,
      nrodocumento: '44938444',
      name: 'Monica Espino',
      email: 'monas@gmail.com',
      age: 37,
      weight: 60,
      height: 150,
      sex: patientsex.FEMALE,
      hasdiagnoses: false,
      insured: true,
      insurancecompany: 'Rimac Seguros',
      activeAppointments: 0,
      createdAt: new Date('2025-08-01')
    }    

  ];


  getPacientes(): Paciente[]{
    return this.pcte;
  }

  getPacientesById(Id: number): Paciente | undefined{
    return this.pcte.find(px => px.id === Id);
  }

  addPaciente(pt: Omit<Paciente, 'id'>): void{
    
    const existeDoc = this.pcte.find(d => d.nrodocumento === pt.nrodocumento);
    if(existeDoc){
      alert('Ya existe un paciente registrado con ese Documento');
      return;
    }
    const newPcte: Paciente={
      ...pt,
      id: this.generateId(),
      createdAt: new Date()
    };
    this.pcte.push(newPcte);
  }

  private generateId(): number {

    return this.pcte.length > 0 ? Math.max(...this.pcte.map(p => p.id)) + 1 : 1;
  }

  updatePaciente(pcteActualizado: Paciente): void {
    const i = this.pcte.findIndex(p => p.id === pcteActualizado.id);
    console.log('Index encontrado',i);
    if(i !== -1){
      this.pcte[i] = {
        ...this.pcte[i],
        ...pcteActualizado,
      };
    }
  }

  deletepcte(id: number): void{
    this.pcte = this.pcte.filter(p => p.id !== id);
  }
  
}
