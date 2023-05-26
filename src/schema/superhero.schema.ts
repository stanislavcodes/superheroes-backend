import { array, number, object, string, TypeOf } from 'zod';

const payload = {
  body: object({
    nickname: string({
      required_error: 'Nickname is required',
    }),
    real_name: string({
      required_error: 'Real name is required',
    }),
    origin_description: string({
      required_error: 'Origin description is required',
    }),
    superpowers: string({
      required_error: 'Superpowers is required',
    }),
    catch_phrase: string({
      required_error: 'Catch phrase is required',
    }),
    images: array(string()).min(0),
  }),
};

const params = {
  params: object({
    id: string({
      required_error: 'id is required',
    }),
  }),
};

export const createSuperheroSchema = object({
  ...payload,
});

export const updateSuperheroSchema = object({
  ...payload,
  ...params,
});

export const deleteSuperheroSchema = object({
  ...params,
});

export const getSuperheroSchema = object({
  ...params,
});

export type CreateSuperheroInput = TypeOf<typeof createSuperheroSchema>;
export type UpdateSuperheroInput = TypeOf<typeof updateSuperheroSchema>;
export type ReadSuperheroInput = TypeOf<typeof getSuperheroSchema>;
export type DeleteSuperheroInput = TypeOf<typeof deleteSuperheroSchema>;
