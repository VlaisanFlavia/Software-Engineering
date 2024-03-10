import { Appointment } from "./Appointment";
import { Prescription } from "./Prescription";

export interface MedicalReport {
    id: string,
    appointment: Appointment,
    description: string,
    recipe: Prescription[] 
}