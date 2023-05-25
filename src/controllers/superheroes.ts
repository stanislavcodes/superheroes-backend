import { Request,Response } from 'express';
import {
  createHero,
  deleteHeroById,
  getCount,
  getHeroById,
  getHeroes,
  updateHeroById
} from '../services/superheroes';

export const getAllHeroes = async (req: Request, res: Response) => {
  const { page = 1, limit = 5 } = req.query;

  if (Array.isArray(page) || Array.isArray(limit)) {
    res.sendStatus(400);

    return;
  }

  try {
    const products = await getHeroes(Number(page), Number(limit));

    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get Superheroes' });
  }
};

export const getHero = async (req: Request, res: Response) => {
  const superheroId = req.params.id;

  try {
    const products = await getHeroById(superheroId);

    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get Superheroes' });
  }
};

export const postHero = async (req: Request, res: Response) => {
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
    return res
      .status(400)
      .json({ error: 'Superhero is missing required fields' });
  }

  try {
    // Create superhero
    const result = await createHero({
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images: [],
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a Superhero' });
  }
};

export const updateHero = async (req: Request, res: Response) => {
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

  try {
    // Update the superhero
    const updatedSuperhero = await updateHeroById(superheroId, {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images: [],
    });

    res.json(updatedSuperhero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update superhero' });
  }
};

export const deleteHero = async (req: Request, res: Response) => {
  const superheroId = req.params.id;

  try {
    // Delete the superhero
    await deleteHeroById(superheroId);

    res.json({ message: 'Superhero deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete superhero' });
  }
};

export const getHeroesCount = async (req: Request, res: Response) => {
  try {
    const count = await getCount();

    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get count' });
  }
}