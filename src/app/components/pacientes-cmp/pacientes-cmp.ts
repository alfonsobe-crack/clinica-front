  import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PacientesService } from '../../services/pacientes-service';
import { Paciente } from '../../interfaces/paciente';
import { Router} from '@angular/router';
@Component({
  selector: 'app-pacientes-cmp',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './pacientes-cmp.html',
  styleUrl: './pacientes-cmp.css'
})
export class PacientesCmp implements OnInit{
  private PacientesService = inject(PacientesService);
  private router = inject(Router);
  pacientes: Paciente[] =[];
  
  ngOnInit(): void {
    this.pacientes = this.PacientesService.getPacientes();
  }

  agregarPaciente(): void {
    this.router.navigate(['/pacientesform']);
  }


}