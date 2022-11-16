import { pool } from '../db.js';

export const getNotes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * from notes');
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('SELECT * from notes WHERE id = ?', [id]);
    if (result[0]) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createNotes = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, author } = req.body;
    const [result] = await pool.query(
      'UPDATE notes SET title = IFNULL(?, title), description = IFNULL(?, description), author = IFNULL(?, author) WHERE id = ?',
      [title, description, author, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Note not found' });
    }
    const [row] = await pool.query('SELECT * from notes WHERE id = ?', [id]);
    res.json(row[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE from notes WHERE id = ?', [
      req.params.id,
    ]);
    if (result.affectedRows <= 0) {
      res.status(404).json({ message: 'Note not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
