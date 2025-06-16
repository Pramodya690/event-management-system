import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to register organizer
app.post('/api/organizers', async (req, res) => {
  try {
    const { username, password, email, phone, address, categories } = req.body;

    const result = await pool.query(
      'INSERT INTO organizer (username, password, email, phone, address, categories) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [username, password, email, phone, address, categories]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
});


// Endpoint to register attendee
app.post('/api/auth/attendee/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // OPTIONAL: Check if email already exists
    const existingUser = await pool.query('SELECT * FROM attendee WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const result = await pool.query(
      'INSERT INTO attendee (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password] // 👈 You can hash password later
    );

    res.status(201).json({ message: 'Attendee registered successfully', attendee: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Database error' });
  }
});

// vendor  
app.post('/api/vendors', async (req, res) => {
  try {
    const { name, category, email, phone, address, cities } = req.body;

    // Optional: check if vendor already exists
    const existingVendor = await pool.query('SELECT * FROM vendor WHERE email = $1', [email]);
    if (existingVendor.rows.length > 0) {
      return res.status(400).json({ message: 'Vendor with this email already exists.' });
    }

    const result = await pool.query(
      'INSERT INTO vendor (name, category, email, phone, address, cities) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, category, email, phone, address, cities]
    );

    res.status(201).json({ message: 'Vendor registered successfully', vendor: result.rows[0] });

  } catch (err) {
    console.error('Vendor Registration Error:', err.message);
    res.status(500).json({ message: 'Server error during vendor registration' });
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
