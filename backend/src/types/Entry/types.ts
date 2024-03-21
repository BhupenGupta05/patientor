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

// export interface NewHealthCheckEntry extends Omit<HealthCheckEntry, 'id'> {}

// export interface NewHospitalEntry extends Omit<HospitalEntry, 'id'> {}

// export interface NewOccupationalHealthcareEntry extends Omit<OccupationalHealthcareEntry, 'id'> {}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never

export type EntryWithoutId = UnionOmit<Entry, 'id'>