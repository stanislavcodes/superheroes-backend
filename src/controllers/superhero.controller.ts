import { Request, Response } from 'express';
import {
  CreateSuperheroInput,
  DeleteSuperheroInput,
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
  req: Request<DeleteSuperheroInput['params']>,
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
    return res.send([]);
  }

  return res.send(superheroes);
}

export async function getSuperheroesCountHandler(req: Request, res: Response) {
  const count = await getSuperheroCount();

  return res.send({ count });
}
