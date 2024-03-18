import { Entry, Gender, NewPatientEntry } from "./types/Patient/types"

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
}

const parseName = (name: unknown): string => {
    if(!isString(name)) {
        throw new Error('Incorrect name')
    }
    return name
}

const parseSSN = (ssn: unknown): string => {
    if(!isString(ssn)) {
        throw new Error('Incorrect ssn')
    }
    return ssn
}

const parseOccupation = (occupation: unknown): string => {
    if(!isString(occupation)) {
        throw new Error('Incorrect occupation')
    }
    return occupation
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect date: ' + dateOfBirth)
    }
    return dateOfBirth
}

const isValidGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param)
}

const parseGender = (gender: unknown): Gender => {
    if(!isString(gender) || !isValidGender(gender)) {
        throw new Error('Incorrect gender: ' + gender)
    }
    return gender
}
  
// It worked
const parseEntries = (entries: any): Entry[] => {
    return entries.map((entry: any) => {
        switch(entry.type) {
            case 'Hospital':
                return {id: entry.id, date: entry.date, description: entry.description, specialist: entry.specialist, diagnosisCode: entry.diagnosisCodes, discharge: entry.discharge, type: entry.type}
            case 'OccupationalHealthcare':
                return {id: entry.id, date: entry.date, description: entry.description, specialist: entry.specialist, diagnosisCode: entry.diagnosisCodes, employerName: entry.employerName, sickLeave: entry.sickLeave, type: entry.type}
            case 'HealthCheck':
                return {id: entry.id, date: entry.date, description: entry.description, specialist: entry.specialist, diagnosisCode: entry.diagnosisCodes, healthCheckRating: entry.healthCheckRating, type: entry.type}
            default:
                throw new Error(`Invalid entry type: ${entry.type}`)
        }
    })
}

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data')
    }

    if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object && 'entries' in object) {
        const newEntry: NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            ssn: parseSSN(object.ssn),
            entries: parseEntries(object.entries) 
        }
        return newEntry
    }
    throw new Error('Incorrect data: some fields are missing')
}

export default toNewPatientEntry