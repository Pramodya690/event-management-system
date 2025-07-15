import express from 'express';
import cors from 'cors';
import pool from './db.js';

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

//login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUserInTable = async (tableName, roleField) => {
      // Validate table name
      const allowedTables = ['organizer', 'vendor', 'attendee'];
      if (!allowedTables.includes(tableName)) throw new Error('Invalid table');

      const query = `SELECT * FROM ${tableName} WHERE email = $1 AND password = $2`;
      const result = await pool.query(query, [email, password]);
      
      if (result.rows.length > 0) {
        const user = result.rows[0];
        return {
          id: user.id,
          email: user.email,
          name: user.name || user.username,
          role: roleField
        };
      }
      return null;
    };

    const userChecks = [
      checkUserInTable('organizer', 'organizer'),
      checkUserInTable('attendee', 'attendee'),
      // checkUserInTable('vendor', 'vendor')
    ];

    const users = await Promise.all(userChecks);
    const validUser = users.find(user => user !== null);

    if (validUser) {
      return res.status(200).json({ user: validUser });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});


// to save the events
app.post('/api/createEvent', async (req, res) => {
  try {
    const { event_title, date, time, location, description, tags, faqs } = req.body;

    const result = await pool.query(
      'INSERT INTO event (event_title, date, time, location, description, tags, faqs) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [event_title,  date, time, location, description, tags, faqs]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
