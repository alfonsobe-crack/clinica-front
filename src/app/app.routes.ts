import { Routes, RouterModule } from '@angular/router';
import { Home } from './components/home/home';
import { CitasCmp } from './components/citas-cmp/citas-cmp';
import { DoctoresCmp } from './components/doctores-cmp/doctores-cmp';
import { PacientesCmp } from './components/pacientes-cmp/pacientes-cmp';
import { PacientesForm } from './components/pacientes-form/pacientes-form';
import { DoctoresForm } from './components/doctores-form/doctores-form';
import { CitasForm } from './components/citas-form/citas-form';

export const routes: Routes = [
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path:'pacientes', component: PacientesCmp},
    {path:'pacientesform', component: PacientesForm},    
    {path:'doctores', component: DoctoresCmp},
    {path:'doctoresform', component: DoctoresForm}, 
    {path:'citas', component: CitasCmp},
    {path:'citasform', component: CitasForm}, 
    {path:'home', component: Home},
    {path: '**', redirectTo: '/home'}
];
