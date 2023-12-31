// Entry Point
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import decrypt from './modules/caesarCipherDecryptMiddleware.js';
import encrypt from './modules/caesarCipherEncryptMiddleware.js';

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());
app.use(express.json());

//routes
app.post('/testDecrypt/:shift', decrypt, (req, res) => {
    res.send(req.body);
});

app.post('/testEncrypt/:shift', encrypt, (req, res) => {
    res.send(req.body);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});