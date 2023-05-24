import express from 'express';
import {
  deleteHero,
  getAllHeroes,
  getHero,
  postHero,
  updateHero,
} from '../controllers/superheroes';

export const router = express.Router();

router.get('/', getAllHeroes);
router.post('/', postHero);
router.get('/:id', getHero);
router.put('/:id', updateHero);
router.delete('/:id', deleteHero);
