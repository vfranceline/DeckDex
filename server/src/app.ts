import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('DeckDex API tá no ar');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Rodando o servidor na porta ${PORT}`);
});
