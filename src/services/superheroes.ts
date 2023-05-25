import { Superhero } from '@prisma/client';
import { prisma } from '../database';

export const getHeroById = (superheroId: string) => {
  return prisma.superhero.findUnique({
    where: { id: superheroId },
  });
};

export const getHeroes = (page: number, limit: number) => {
  return prisma.superhero.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      updated_at: 'desc',
    }
  });
};

export const createHero = (
  data: Omit<Superhero, 'id' | 'updated_at' | 'created_at'>
) => {
  return prisma.superhero.create({
    data,
  });
};

export const updateHeroById = (
  superheroId: string,
  data: Omit<Superhero, 'id' | 'updated_at' | 'created_at'>,
) => {
  return prisma.superhero.update({
    where: { id: superheroId },
    data,
  });
};

export const deleteHeroById = (superheroId: string) => {
  return prisma.superhero.delete({
    where: { id: superheroId },
  });
};

export const getCount = () => {
  return prisma.superhero.count();
};