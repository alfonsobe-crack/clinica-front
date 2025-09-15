export enum patientsex{
    MALE = 'Masculino',
    FEMALE = 'Femenino',
    OTHER = 'Otro',
}

export interface Paciente {

    id: number;
    nrodocumento: string;
    name: string;
    email: string;
    age: number;
    weight: number;
    height: number;
    sex: patientsex;
    hasdiagnoses: boolean;
    diagnoses?: string;
    insured: boolean;
    insurancecompany?: string;
    activeAppointments: number;
    createdAt: Date;

}
