export interface Entry {

}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type NonSensitivePatientData = Omit<PatientEntry, 'ssn' | 'entries'>

export type NewPatientEntry = Omit<PatientEntry, 'id'>

export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}
