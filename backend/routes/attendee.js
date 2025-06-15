// routes/attendee.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // You should create a db.js with pg pool, I’ll show below
// const bcrypt = require('bcrypt');

// POST /api/auth/attendee/signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if user exists
    const existing = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into users table with user_type = 'attendee'
    const userInsert = await db.query(
      `INSERT INTO users (email, password_hash, user_type, created_at, updated_at)
       VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id`,
      [email, hashedPassword, 'attendee']
    );

    const user_id = userInsert.rows[0].id;

    // Insert into attendees table
    await db.query(
      `INSERT INTO attendees (user_id, name) VALUES ($1, $2)`,
      [user_id, name]
    );

    return res.status(201).json({ message: 'Attendee registered successfully' });
  } catch (error) {
    console.error('Error registering attendee:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
