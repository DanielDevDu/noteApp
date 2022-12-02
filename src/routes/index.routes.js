import { Router } from 'express';
import { home } from '../controllers/index.controllers.js';

const router = Router();

router.get('/', home);

export default router;
