import { createPool } from 'mysql2/promise';

export const pool = createPool({
  host: 'localhost',
  user: 'riodev',
  password: 'riodev1305',
  database: 'notesdb',
  port: 3306,
});
