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
app.post('/testDecrypt', decrypt, (req, res) => {
    res.send(req.decrypt);
});

app.post('/testEncrypt', encrypt, (req, res) => {
    res.send(req.encrypt);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});