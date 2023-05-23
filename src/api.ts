import { Prisma, PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';

const prisma = new PrismaClient();
export const app = express();

app.use(cors());
app.use(express.json());
