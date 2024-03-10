export interface User {
    id?: string;
    role?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    medicalOfficeAddress?: string;
    cnp?:string;
    birthDate?:Date;
    specialization?:string;
    medicalOfficeName?: string;
    medicalOfficeId?: string;
    token?:string;
}