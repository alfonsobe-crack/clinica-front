export enum doctorspecialty{
    PEDIATRIA = 'Pediatria',
    CARDIOLOGIA = 'Cardiologia',
    UROLOGIA = 'Urologia',
    INTERNA = 'Interna',
    GERIATRIA = 'Geriatria',
    NEUMOLOGIA = 'Neumologia',
    NEUROLOGIA = 'Neurologia',
    TRAUMATOLOGIA = 'Traumatologia',
    OTRO = 'Otro',
}

export enum caremode{
    PRESENCIAL = 'Presencial',
    VIRTUAL = 'Virtual',
}

export enum clinicasede{
    SANBORJA = 'San Borja',
    LIMA = 'Lima',
    SURCO = 'Surco',
}


export interface Doctor {

    id: number;
    name: string;
    age: number;
    specialty: doctorspecialty;
    cmp: number;
    mode: caremode;
    sede: clinicasede;
    createdAt: Date;
}
