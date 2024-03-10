import { MedicalOffice } from './MedicalOffice';
import { Patient } from './Patient';

export interface Appointment {
    id: string,
    date: Date,
    state: string,
    patient: Patient,
    medicalOffice: MedicalOffice
}