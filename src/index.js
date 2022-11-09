import express from 'express';
import { pool } from './db.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/ping', async (req, res) => {
  const result = await pool.query('SELECT * from notes');
  res.json(result);
});

app.get('/note', (req, res) => {
  res.send('Obtain a note');
});

app.post('/note', (req, res) => {
  res.send('Create a note');
});

app.put('/note', (req, res) => {
  res.send('Update a note');
});

app.delete('/note', (req, res) => {
  res.send('Delete a note');
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
