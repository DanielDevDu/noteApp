import { Router } from 'express';
import {
  getUsers,
  getUser,
  createUsers,
  updateUsers,
  deleteUsers,
  getUserNotes,
} from '../controllers/users.controllers.js';

const router = Router();

// Simple CRUD
router.get('/users', getUsers);

router.get('/users/:id', getUser);

router.post('/users', createUsers);

router.patch('/users/:id', updateUsers);

router.delete('/users/:id', deleteUsers);

// Adictional Routes
router.get('/users/:id/notes', getUserNotes);

export default router;
