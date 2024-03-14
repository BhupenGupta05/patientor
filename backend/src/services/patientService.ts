import patientData from '../../data/patients'
import { NonSensitivePatientData, PatientEntry } from '../types/Patient/types'

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation
    }))
}

const getPatientData = (): PatientEntry[] => {
    return patientData
}

const addPatientData = () => {
    return null
}

export default {
    getPatientData,
    getNonSensitivePatientData,
    addPatientData
}