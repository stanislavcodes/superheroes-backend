import cors from 'cors';
import express from 'express';
import { router as superheroesRouter } from './routes/superheroes';

export const app = express();

app.use(cors());
app.use(express.json());
app.use('/superheroes', superheroesRouter);
