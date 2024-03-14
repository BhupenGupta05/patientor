import express from 'express';
import cors from 'cors'

import diagnosisRouter from './routes/diagnosis'
import patientsRouter from './routes/patients'

const app = express();
app.use(cors())
app.use(express.json());

const PORT = 3000;

// use /api before ping so no error comes
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter)
app.use('/api/patients', patientsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});