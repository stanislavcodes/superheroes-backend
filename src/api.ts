import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';

const prisma = new PrismaClient();
export const app = express();

app.use(cors());
app.use(express.json());

app.get('/superheroes', async (req, res) => {
  const superheroes = await prisma.superhero.findMany();
  res.json(superheroes);
});

app.post(`/superheroes`, async (req, res) => {
  try {
    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
    } = req.body;

    // Check if all required fields are present
    if (
      !nickname ||
      !real_name ||
      !origin_description ||
      !superpowers ||
      !catch_phrase
    ) {
      return res.status(400).json({ error: 'Superhero is missing required fields' });
    }

    // Create superhero
    const result = await prisma.superhero.create({
      data: {
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
      },
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a Superhero' });
  }
});

app.put(`/superheroes/:id`, async (req, res) => {
  try {
    const superheroId = req.params.id;
    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
    } = req.body;

    // Validate the input data
    if (
      !nickname ||
      !real_name ||
      !origin_description ||
      !superpowers ||
      !catch_phrase
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Update the superhero
    const updatedSuperhero = await prisma.superhero.update({
      where: { id: superheroId },
      data: {
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
      },
    });

    res.json(updatedSuperhero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update superhero' });
  }
});

app.delete(`/superheroes/:id`, async (req, res) => {
  try {
    const superheroId = req.params.id;

    // Delete the superhero
    await prisma.superhero.delete({
      where: { id: superheroId },
    });

    res.json({ message: 'Superhero deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete superhero' });
  }
});
