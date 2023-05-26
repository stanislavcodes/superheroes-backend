import { Request, Response } from 'express';
import {
  CreateSuperheroInput,
  ReadSuperheroInput,
  UpdateSuperheroInput,
} from '../schema/superhero.schema';
import {
  createSuperhero,
  deleteSuperhero,
  findSuperhero,
  findSuperheroes,
  getSuperheroCount,
  updateSuperhero,
} from '../services/superhero.service';

export async function createSuperheroHandler(
  req: Request<any, any, CreateSuperheroInput['body']>,
  res: Response,
) {
  const body = req.body;
  const superhero = await createSuperhero(body);

  return res.send(superhero);
}

export async function getSuperheroHandler(
  req: Request<ReadSuperheroInput['params']>,
  res: Response,
) {
  const superheroId = req.params.id;
  const superhero = await findSuperhero(superheroId);

  if (!superhero) {
    return res.sendStatus(404);
  }

  return res.send(superhero);
}

export async function updateSuperheroHandler(
  req: Request<UpdateSuperheroInput['params']>,
  res: Response,
) {
  const superheroId = req.params.id;
  const update = req.body;
  const superhero = await findSuperhero(superheroId);

  if (!superhero) {
    return res.sendStatus(404);
  }
  const updatedSuperhero = await updateSuperhero(superheroId, update);

  return res.send(updatedSuperhero);
}

export async function deleteSuperheroHandler(
  req: Request<UpdateSuperheroInput['params']>,
  res: Response,
) {
  const superheroId = req.params.id;
  const superhero = await findSuperhero(superheroId);

  if (!superhero) {
    return res.sendStatus(404);
  }

  await deleteSuperhero(superheroId);

  return res.sendStatus(200);
}

export async function getSuperheroesHandler(req: Request, res: Response) {
  const { page = 1, limit = 5 } = req.query;
  const superheroes = await findSuperheroes(Number(page), Number(limit));

  if (!superheroes.length) {
    return res.sendStatus(404);
  }

  return res.send(superheroes);
}

export async function getSuperheroesCountHandler(req: Request, res: Response) {
  const count = await getSuperheroCount();

  return res.send({ count });
}

// export const getAllHeroes = async (req: Request, res: Response) => {
//   const { page = 1, limit = 5 } = req.query;

//   if (Array.isArray(page) || Array.isArray(limit)) {
//     res.sendStatus(400);

//     return;
//   }

//   try {
//     const heroes = await getHeroes(Number(page), Number(limit));

//     res.send(heroes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to get Superheroes' });
//   }
// };

// export const getHero = async (req: Request, res: Response) => {
//   const superheroId = req.params.id;

//   try {
//     const heroes = await getHeroById(superheroId);

//     res.send(heroes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to get Superheroes' });
//   }
// };

// export const postHero = async (req: Request, res: Response) => {
//   const {
//     nickname,
//     real_name,
//     origin_description,
//     superpowers,
//     catch_phrase,
//     images,
//   } = req.body;

//   // Check if all required fields are present
//   if (
//     !nickname ||
//     !real_name ||
//     !origin_description ||
//     !superpowers ||
//     !catch_phrase ||
//     !Array.isArray(images)
//   ) {
//     return res
//       .status(400)
//       .json({ error: 'Superhero is missing required fields' });
//   }

//   try {
//     // Create superhero
//     const result = await createHero({
//       nickname,
//       real_name,
//       origin_description,
//       superpowers,
//       catch_phrase,
//       images,
//     });

//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create a Superhero' });
//   }
// };

// export const updateHero = async (req: Request, res: Response) => {
//   const superheroId = req.params.id;
//   const {
//     nickname,
//     real_name,
//     origin_description,
//     superpowers,
//     catch_phrase,
//     images,
//   } = req.body;

//   // Validate the input data
//   if (
//     !nickname ||
//     !real_name ||
//     !origin_description ||
//     !superpowers ||
//     !catch_phrase ||
//     !Array.isArray(images)
//   ) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     // Update the superhero
//     const updatedSuperhero = await updateHeroById(superheroId, {
//       nickname,
//       real_name,
//       origin_description,
//       superpowers,
//       catch_phrase,
//       images,
//     });

//     res.json(updatedSuperhero);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to update superhero' });
//   }
// };

// export const deleteHero = async (req: Request, res: Response) => {
//   const superheroId = req.params.id;

//   try {
//     // Delete the superhero
//     await deleteHeroById(superheroId);

//     res.json({ message: 'Superhero deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to delete superhero' });
//   }
// };

// export const getHeroesCount = async (req: Request, res: Response) => {
//   try {
//     const count = await getCount();

//     res.json({ count });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to get count' });
//   }
// };
