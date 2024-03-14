export type Gender = 'male' | 'female' | 'other'

export type NonSensitivePatientData = Omit<PatientEntry, 'ssn'>

export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
}