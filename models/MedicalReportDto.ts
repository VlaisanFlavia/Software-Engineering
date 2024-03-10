import { PrescriptionDto } from "./PrescriptionDto";
export class MedicalReportDto {
    appointmentId: string;
    description: string;
    recipe: PrescriptionDto[];
}