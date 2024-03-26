"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importStar(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitivePatientData());
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const patient = patientService_1.default.getPatientById(id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.status(404).send({ error: 'Patient not found' });
    }
});
// this one
router.post('/:id/entries', (req, res) => {
    const { id } = req.params;
    const _a = req.body, { type } = _a, entryData = __rest(_a, ["type"]);
    try {
        let validatedEntry;
        switch (type) {
            case 'Hospital':
                validatedEntry = (0, utils_1.validateHospitalEntry)(entryData);
                break;
            case 'OccupationalHealthcare':
                validatedEntry = (0, utils_1.validateOccupationalHealthcareEntry)(entryData);
                break;
            case 'HealthCheck':
                validatedEntry = (0, utils_1.validateHealthCheckEntry)(entryData);
                break;
            default:
                throw new Error(`Invalid entry type: ${type}`);
        }
        validatedEntry.type = type;
        const newEntry = patientService_1.default.addPatientEntry(id, validatedEntry);
        res.status(201).json(newEntry);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = (0, utils_1.default)(req.body);
        const addedPatient = patientService_1.default.addPatientData(newPatientEntry);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
