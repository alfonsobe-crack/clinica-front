import { Doctor } from "./doctor";
import { Paciente } from "./paciente";

export enum ApptmStatus{
    SCHEDULED = 'Programado',
    PENDING = 'Pendiente',
    PAYED = 'Pagado',
    CANCELLED = 'Cancelado'
}

export interface Cita {

    id: number;
    doctorId: Doctor;
    patientId: Paciente;
    fechahora: Date;
    specialty?: string;
    sede?: string;
    mode?: string;
    status: ApptmStatus;
    createdAt: Date;
}
