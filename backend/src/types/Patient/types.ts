import { DiagnosisEntry } from "../Diagnosis/types"

export interface BaseEntry {
    id: string,
    date: string,
    description: string,
    specialist: string,
    diagnosisCodes?: Array<DiagnosisEntry['code']>
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}
export interface HealthCheckEntry extends BaseEntry {
    healthCheckRating: HealthCheckRating,
    type: "HealthCheck"
}

export interface HospitalEntry extends BaseEntry {
    discharge: {
        date: string,
        criteria: string
    }
    type: "Hospital"
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    employerName: string,
    sickLeave: {
        startDate: string,
        endDate: string,
    },
    type: "OccupationalHealthcare"
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry

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

