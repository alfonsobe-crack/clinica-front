import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CitasService } from '../../services/citas-service';
import { Router } from '@angular/router';
import { Paciente } from '../../interfaces/paciente';
import { Cita } from '../../interfaces/cita';

@Component({
  selector: 'app-citas-cmp',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './citas-cmp.html',
  styleUrl: './citas-cmp.css'
})
export class CitasCmp implements OnInit {
  private CitasService = inject(CitasService);
  private router = inject(Router);
  citas: Cita[] =[];
  
  ngOnInit(): void {
    this.citas = this.CitasService.getCitas();
  }

  agregarCita(): void {
    this.router.navigate(['/citasform']);
  }
}
