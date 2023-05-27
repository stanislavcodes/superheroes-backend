import supertest, { SuperTest, Test } from 'supertest';
import {
  createSuperhero,
  deleteSuperhero,
  findSuperheroes,
  getSuperheroCount
} from '../src/services/superhero.service';
import createServer from '../src/utils/server';
import { Superhero } from '@prisma/client';

const app = createServer();

const superheroPayload = {
  nickname: 'SuperHero Test',
  real_name: 'SuperHero Test',
  origin_description: 'SuperHero Test',
  superpowers: 'SuperHero Test',
  catch_phrase: 'SuperHero Test',
  images: ['https://imgur.com/7ReLo9i'],
};

const deleteAllSuperheroes = async () => {
  const superheroCount = await getSuperheroCount();
  const superheroes = await findSuperheroes(1, superheroCount + 1);

  await Promise.all(
    superheroes.map(superhero => deleteSuperhero(superhero.id)),
  );
};

describe('Superhero', () => {
  const existingSuperheroes: Superhero[] = [];
  let api: SuperTest<Test>;

  beforeAll(async () => {
    const superheroCount = await getSuperheroCount();
    const superheroes = await findSuperheroes(1, superheroCount + 1);

    existingSuperheroes.push(...superheroes);
  });

  afterAll(async () => {
    await deleteAllSuperheroes();

    await Promise.all(
      existingSuperheroes.map(superhero => createSuperhero(superhero)),
    );
  });

  beforeEach(async () => {
    api = supertest(app);
  });

  describe('GET /healthcheck route', () => {
    it('should return a 200 status', async () => {
      const { statusCode } = await api.get('/healthcheck');

      expect(statusCode).toBe(200);
    });
  });

  describe('GET /superheroes/:id route', () => {
    it('should return a 404', async () => {
      const superheroId = '123';

      await api.get(`/api/superheroes/${superheroId}`).expect(404);
    });

    it('should return the superhero and return a 200 status', async () => {
      const superhero = await createSuperhero(superheroPayload);

      const { body } = await api
        .get(`/api/superheroes/${superhero.id}`)
        .expect(200);

      expect(body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          ...superheroPayload,
        }),
      );

      await deleteSuperhero(superhero.id);
    });
  });

  describe('POST /superheroes route', () => {
    it('should create and return a new superhero', async () => {
      const { body } = await api
        .post('/api/superheroes')
        .send(superheroPayload);

      expect(body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          ...superheroPayload,
        }),
      );

      await deleteSuperhero(body.id);
    });

    it('should return a 400 status when required fields are missing', async () => {
      const invalidPayload = {
        // missing required fields
      };

      await api.post('/api/superheroes/').send(invalidPayload).expect(400);
    });
  });

  describe('PUT /superheroes/:id route', () => {
    it('should return a 404 status when superhero does not exist', async () => {
      const superheroId = '123';

      await api
        .put(`/api/superheroes/${superheroId}`)
        .send(superheroPayload)
        .expect(404);
    });

    it('should return a 400 status when required fields are missing', async () => {
      const createdSuperhero = await createSuperhero(superheroPayload);

      const invalidPayload = {
        // missing required fields
      };

      await api
        .put(`/api/superheroes/${createdSuperhero.id}`)
        .send(invalidPayload)
        .expect(400);

      await deleteSuperhero(createdSuperhero.id);
    });

    it('should update the superhero and return a 200 status', async () => {
      const createdSuperhero = await createSuperhero(superheroPayload);
      const updatedPayload = {
        ...superheroPayload,
        nickname: 'Updated Batman Test',
      };

      const { body } = await api
        .put(`/api/superheroes/${createdSuperhero.id}`)
        .send(updatedPayload)
        .expect(200);

      expect(body).toEqual(
        expect.objectContaining({
          id: createdSuperhero.id,
          ...updatedPayload,
        }),
      );

      await deleteSuperhero(createdSuperhero.id);
    });
  });

  describe('DELETE /superheroes/:id route', () => {
    it('should delete the superhero and return a 200 status', async () => {
      const createdSuperhero = await createSuperhero(superheroPayload);

      await api.delete(`/api/superheroes/${createdSuperhero.id}`).expect(200);

      await api.get(`/api/superheroes/${createdSuperhero.id}`).expect(404);
    });

    it('should return a 404 status when superhero does not exist', async () => {
      const superheroId = '123';

      await api.delete(`/api/superheroes/${superheroId}`).expect(404);
    });
  });

  describe('GET /superheroes route', () => {
    beforeAll(async () => {
      await deleteAllSuperheroes();
      await createSuperhero({ ...superheroPayload, nickname: 'Superhero1' });
      await createSuperhero({ ...superheroPayload, nickname: 'Superhero2' });
      await createSuperhero({ ...superheroPayload, nickname: 'Superhero3' });
      await createSuperhero({ ...superheroPayload, nickname: 'Superhero4' });
      await createSuperhero({ ...superheroPayload, nickname: 'Superhero5' });
    });

    it('should return a list of superheroes without pagination', async () => {
      const { body, statusCode } = await api.get('/api/superheroes');

      expect(statusCode).toBe(200);
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThanOrEqual(1);
    });

    it('should return the first page of superheroes with a default limit', async () => {
      const { body, statusCode } = await api.get('/api/superheroes');

      expect(statusCode).toBe(200);
      expect(Array.isArray(body)).toBe(true);
      // assuming default limit is 5
      expect(body.length).toBe(5);
      // Assert the first superhero is the most recently updated
      expect(body[0].nickname).toBe('Superhero5');
    });

    it('should return the second page of superheroes with a custom limit', async () => {
      const page = 2;
      const limit = 3;

      const { body, statusCode } = await api
        .get('/api/superheroes')
        .query({ page, limit });

      expect(statusCode).toBe(200);
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBe(2);
      // assert the first superhero is the most recently updated on the second page
      expect(body[0].nickname).toBe('Superhero2');
    });

    it('should return an empty array if page exceeds total number of superheroes', async () => {
      const page = 2;
      const limit = 5;

      const { body, statusCode } = await api
        .get('/api/superheroes')
        .query({ page, limit });

      expect(statusCode).toBe(200);
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBe(0);
    });

    it('should return an empty array when no superheroes are found', async () => {
      await deleteAllSuperheroes();

      const { body } = await api.get('/api/superheroes');

      expect(Array.isArray(body)).toBe(true);
      expect(body).toHaveLength(0);
    });
  });

  describe('GET /superheroes/count route', () => {
    it('should return the count of superheroes', async () => {
      const { body } = await api.get('/api/superheroes/count').expect(200);

      expect(body).toEqual(
        expect.objectContaining({
          count: expect.any(Number),
        }),
      );
    });
  });
});
