import { Router } from 'express';
import {
  getNotes,
  getNote,
  createNotes,
  updateNotes,
  deleteNotes,
} from '../controllers/notes.controllers.js';

const router = Router();

router.get('/notes', getNotes);

router.get('/notes/:id', getNote);

router.post('/notes', createNotes);

router.put('/notes/:id', updateNotes);

router.delete('/notes/:id', deleteNotes);

export default router;
