import { pool } from '../db.js';

export const getNotes = async (req, res) => {
  const result = await pool.query('SELECT * from notes');
  res.json(result[0]);
};

export const createNotes = async (req, res) => {
  const { title, description, author } = req.body;

  if (!title || typeof title !== 'string') {
    return res
      .status(400)
      .json({ message: 'String must be a string not null' });
  }

  if (!description || typeof description !== 'string') {
    return res
      .status(400)
      .json({ message: 'Description must be a string not null' });
  }

  if (!author || typeof author !== 'string') {
    return res
      .status(400)
      .json({ message: 'Author must be a string not null' });
  }

  const [rows] = await pool.query(
    'INSERT INTO notes (title, description, author) VALUES (?,?,?)',
    [title, description, author]
  );
  res.send({
    id: rows.insertId,
    title,
    description,
    author,
  });
};

export const updateNotes = (req, res) => {
  res.send('Update a note');
};

export const deleteNotes = (req, res) => {
  res.send('Delete a note');
};
