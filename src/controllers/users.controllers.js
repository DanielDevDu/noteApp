import { pool } from '../db.js';

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * from users');
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('SELECT * from users WHERE id = ?', [id]);
    if (result[0]) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUsers = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || typeof username !== 'string') {
      return res
        .status(400)
        .json({ message: 'Username must be a string not null' });
    }

    const [rows] = await pool.query('INSERT INTO users (username) VALUES (?)', [
      username,
    ]);
    res.send({
      id: rows.insertId,
      username,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    const [result] = await pool.query(
      'UPDATE users SET username = IFNULL(?, username) WHERE id = ?',
      [username, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
    }
    const [row] = await pool.query('SELECT * from users WHERE id = ?', [id]);
    res.json(row[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE from users WHERE id = ?', [
      req.params.id,
    ]);
    if (result.affectedRows <= 0) {
      res.status(404).json({ message: 'User not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Adictional Controllers

export const getUserNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const [user] = await pool.query('SELECT * from users WHERE id = ?', [id]);
    if (user[0]) {
      const [result] = await pool.query(
        'SELECT * from notes WHERE user_id = ?',
        [id]
      );
      if (result[0]) {
        res.json(result);
      } else {
        res.status(404).json({ message: "User doesn't have notes" });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
