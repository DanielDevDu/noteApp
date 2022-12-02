import { pool } from '../db.js';

export const home = async (req, res) => {
  res.json({ message: 'Home Page' });
};
