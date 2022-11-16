import { pool } from '../db.js';

export const ping = async (req, res) => {
  const result = await pool.query('SELECT * from notes');
  res.json(result[0]);
};
