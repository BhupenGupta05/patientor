"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnosis_1 = __importDefault(require("./routes/diagnosis"));
const patients_1 = __importDefault(require("./routes/patients"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = 3000;
// use /api before ping so no error comes
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.use('/api/diagnoses', diagnosis_1.default);
app.use('/api/patients', patients_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
