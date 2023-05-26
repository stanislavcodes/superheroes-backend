import { Superhero } from '@prisma/client';
import { prisma } from '../database';

export const findSuperhero = (superheroId: string) => {
  return prisma.superhero.findUnique({
    where: { id: superheroId },
  });
};

export const findSuperheroes = (page: number, limit: number) => {
  return prisma.superhero.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      updated_at: 'desc',
    },
  });
};

export const createSuperhero = (
  input: Omit<Superhero, 'id' | 'updated_at' | 'created_at'>,
) => {
  return prisma.superhero.create({
    data: input,
  });
};

export const updateSuperhero = (
  superheroId: string,
  input: Omit<Superhero, 'id' | 'updated_at' | 'created_at'>,
) => {
  return prisma.superhero.update({
    where: { id: superheroId },
    data: input
  });
};

export const deleteSuperhero = (superheroId: string) => {
  return prisma.superhero.delete({
    where: { id: superheroId },
  });
};

export const getSuperheroCount = () => {
  return prisma.superhero.count();
};
