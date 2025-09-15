import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DoctoresService } from '../../services/doctores-service';
import { Router } from '@angular/router';
import { Paciente } from '../../interfaces/paciente';
import { Doctor } from '../../interfaces/doctor';

@Component({
  selector: 'app-doctores-cmp',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './doctores-cmp.html',
  styleUrl: './doctores-cmp.css'
})
export class DoctoresCmp {
  private DoctoresService = inject(DoctoresService);
  private router = inject(Router);
  doctores: Doctor[] =[];
  
  ngOnInit(): void {
    this.doctores = this.DoctoresService.getDoctors();
  }

  agregarDoctor(): void {
    this.router.navigate(['/doctoresform']);
  }

}
