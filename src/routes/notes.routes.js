import { Router } from 'express';
import {
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes,
} from '../controllers/notes.controllers.js';

const router = Router();

router.get('/notes', getNotes);

router.post('/notes', createNotes);

router.put('/notes', updateNotes);

router.delete('/notes', deleteNotes);

export default router;
