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
    const { title, description, user_id } = req.body;

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

    if (!user_id || typeof user_id !== 'number') {
      return res
        .status(400)
        .json({ message: 'user_id must be a number not null' });
    }

    const [user] = await pool.query('SELECT * from users WHERE id = ?', [
      user_id,
    ]);
    if (user[0]) {
      const [rows] = await pool.query(
        'INSERT INTO notes (title, description, user_id) VALUES (?,?,?)',
        [title, description, user_id]
      );
      const username = user[0].username;
      res.send({
        id: rows.insertId,
        title,
        description,
        user_id,
        username,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, user_id } = req.body;

    if (user_id) {
      return res.json({ message: "You can't change the user_id" });
    }

    const [result] = await pool.query(
      'UPDATE notes SET title = IFNULL(?, title), description = IFNULL(?, description) WHERE id = ?',
      [title, description, id]
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
