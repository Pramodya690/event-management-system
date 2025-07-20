import express from 'express';
import cors from 'cors';
import pool from './db.js';
import multer from 'multer';
import bcrypt from 'bcrypt';

const port = 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Endpoint to register organizer
app.post('/api/organizers', async (req, res) => {
  try {
    const { username, password, email, phone, address, categories } = req.body;

    // ✅ Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO organizer (username, password, email, phone, address, categories) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [username, hashedPassword, email, phone, address, categories] // ✅ Use hashedPassword here!
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

    // ✅ Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // OPTIONAL: Check if email already exists
    const existingUser = await pool.query('SELECT * FROM attendee WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const result = await pool.query(
      'INSERT INTO attendee (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword] // ✅ Use hashedPassword here!
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

    // ✅ Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

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

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  

  try {
    const checkUserInTable = async (tableName, roleField) => {
      const allowedTables = ['organizer', 'vendor', 'attendee'];
      if (!allowedTables.includes(tableName)) throw new Error('Invalid table');

      const query = `SELECT * FROM ${tableName} WHERE email = $1`;
      const result = await pool.query(query, [email]);

      if (result.rows.length > 0) {
        const user = result.rows[0];

        // ✅ Compare input password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name || user.username,
          role: roleField
        };
      }

      return null;
    };

    // Check all user roles
    const userChecks = [
      checkUserInTable('organizer', 'organizer'),
      checkUserInTable('attendee', 'attendee'),
      // checkUserInTable('vendor', 'vendor') // Add back if needed
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

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/createEvent', upload.single('bannerImage'), async (req, res) => {
  try {
    console.log('req.file:', req.file); // ✅ See if file is received

    const {
      event_title,
      date,
      time,
      location,
      description,
      tags,
      faqs
    } = req.body;

    const bannerImage = req.file ? req.file.buffer : null;

    const result = await pool.query(
      `INSERT INTO event 
      (event_title, date, time, location, description, tags, faqs, banner_image)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [event_title, date, time, location, description, tags, faqs, bannerImage]
    ); 

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error saving event:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
});


// Fetch all created events
app.get('/api/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM event ORDER BY date ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
