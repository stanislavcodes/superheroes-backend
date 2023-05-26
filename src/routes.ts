import { Express, Request, Response } from 'express';
import {
  createSuperheroHandler,
  deleteSuperheroHandler,
  getSuperheroesCountHandler,
  getSuperheroesHandler,
  getSuperheroHandler,
  updateSuperheroHandler,
} from './controllers/superhero.controller';
import validate from './middleware/validate';
import {
  createSuperheroSchema,
  deleteSuperheroSchema,
  getSuperheroSchema,
  updateSuperheroSchema,
} from './schema/superhero.schema';

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.get('/api/superheroes', getSuperheroesHandler);

  app.get('/api/superheroes/count', getSuperheroesCountHandler);

  app.post(
    '/api/superheroes',
    validate(createSuperheroSchema),
    createSuperheroHandler,
  );

  app.get(
    '/api/superheroes/:id',
    validate(getSuperheroSchema),
    getSuperheroHandler,
  );

  app.put(
    '/api/superheroes/:id',
    validate(updateSuperheroSchema),
    updateSuperheroHandler,
  );

  app.delete(
    '/api/superheroes/:id',
    validate(deleteSuperheroSchema),
    deleteSuperheroHandler,
  );
};

export default routes;
