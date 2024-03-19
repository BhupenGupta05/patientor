import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { validateHealthCheckEntry, validateHospitalEntry, validateOccupationalHealthcareEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientData());
})

router.get('/:id', (req, res) => {
  const {id} = req.params
  const patient = patientService.getPatientById(id)

  if(patient) {
    res.send(patient)
  } else {
    res.status(404).send({ error: 'Patient not found' })
  }
})


router.post('/:id/entries', (req, res) => {
  const {id} = req.params
  const{type, ...entryData} = req.body

  try {
    let validatedEntry

    switch(type) {
      case 'Hospital':
        validatedEntry = validateHospitalEntry(entryData)
        break
      case 'OccupationalHealthcare':
        validatedEntry = validateOccupationalHealthcareEntry(entryData)
        break
      case 'HealthCheck':
        validatedEntry = validateHealthCheckEntry(entryData)
        break
      default:
        throw new Error(`Invalid entry type: ${type}`)
    }

    const newEntry = patientService.addPatientEntry(id, validatedEntry)
    console.log("validated entry: ",validatedEntry);
    res.status(201).json(newEntry)
    
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
})

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body)
    const addedPatient = patientService.addPatientData(newPatientEntry)
    res.json(addedPatient)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

export default router