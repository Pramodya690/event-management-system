import express from 'express';
import cors from 'cors';
import pool from './db.js';
import multer from 'multer';
import bcrypt from 'bcrypt';

const port = 5000;
const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// REGISTRATION ENDPOINTS
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
    const { name, email, gender, age, city, password } = req.body;

    // ✅ Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // OPTIONAL: Check if email already exists
    const existingUser = await pool.query('SELECT * FROM attendee WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const result = await pool.query(
      'INSERT INTO attendee (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, gender, age, city, hashedPassword] // ✅ Use hashedPassword here!
    );

    res.status(201).json({ message: 'Attendee registered successfully', attendee: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Database error' });
  }
});

// Endpoint to register vendor with the image as well
app.post('/api/vendors', upload.single('bannerImage'), async (req, res) => {
  try {

    console.log('req.file:', req.file); //check if file is received
    console.log("BODY:", req.body);           
    console.log("FILE:", req.file);           
    const { name, category, email, phone, address, cities, password, capacity, min_budget, max_budget } = req.body;

    // for the image
    const bannerImage = req.file ? req.file.buffer : null;

    //Validate password presence
    if (!password) {
      return res.status(400).json({ message: 'Password is required.' });
    }

    //Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    //check if vendor already exists
    const existingVendor = await pool.query('SELECT * FROM vendor WHERE email = $1', [email]);
    if (existingVendor.rows.length > 0) {
      return res.status(400).json({ message: 'Vendor with this email already exists.' });
    }

    const result = await pool.query(
      'INSERT INTO vendor (name, category, email, phone, address, cities, password, capacity, min_budget, max_budget, banner_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [name, category, email, phone, address, cities, hashedPassword, capacity, min_budget, max_budget, bannerImage]
    );

    res.status(201).json({ message: 'Vendor registered successfully', vendor: result.rows[0] });

  } catch (err) {
    console.error('Vendor Registration Error:', err.message);
    res.status(500).json({ message: 'Server error during vendor registration' });
  }
});

// LOGIN ENDPOINT
//login
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


// ENDPOINTS RELATED TO EVENT CREATION
//save event data to db, with images
app.post('/api/createEvent', upload.single('bannerImage'), async (req, res) => {
  try {
    console.log('req.file:', req.file); // check if file is received
    console.log("BODY:", req.body);           
    console.log("FILE:", req.file);           
    console.log("VENUE ID:", req.body.venue_id);

    const {
      event_title,
      date,
      time,
      category,
      location,
      venue_id,
      description,
      tags,
      faqs,
      city,
      headcount,
      coordinates,
    } = req.body;

    const bannerImage = req.file ? req.file.buffer : null;

    const result = await pool.query(
  `INSERT INTO event 
  (event_title, date, time, category, location, venue_id, description, tags, faqs, banner_image, city, headcount, coordinates)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
  RETURNING *`,
  [
    event_title,                           
    date,                                  
    time,   
    category,                               
    location,                             
    venue_id || null,                      
    description,                           
    tags,                                  
    faqs,                                  
    bannerImage,                           
    city || null,                          
    headcount || null,                     
    coordinates ? `(${coordinates[0]},${coordinates[1]})` : null 
  ]
);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error saving event:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

//venue suggestion to the event creation
app.get('/api/venues', async (req, res) => {
  const { city, headcount } = req.query;

  if (!city || !headcount) {
    return res.status(400).json({ error: 'City and headcount are required' });
  }

  try {
    // Query venues in city with capacity >= headcount, sorted by capacity ascending
    const result = await pool.query(
      `SELECT * FROM venues
       WHERE  available = true
       AND LOWER(city) = LOWER($1)
       AND capacity >= $2
       ORDER BY capacity ASC
       LIMIT 10`, // Return top 5 matches
      [city, headcount]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// to serve the binary image saved in the db as a real image to be fetched onto the publish event page of the eventform
app.get('/api/eventBanner/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const result = await pool.query(
      `SELECT banner_image FROM event WHERE id = $1`,
      [eventId]
    );

    if (result.rows.length === 0 || !result.rows[0].banner_image) {
      return res.status(404).send('Image not found');
    }

    const imageBuffer = result.rows[0].banner_image;

    res.set('Content-Type', 'image/jpeg'); // or 'image/png' based on your input
    res.send(imageBuffer);
  } catch (err) {
    console.error("Failed to load banner image:", err);
    res.status(500).send("Server error");
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


// find vendors
app.get('/api/findVendors', async (req, res) => {
  try {
    let { category = '', location = '', minBudget, maxBudget, capacity } = req.query;

    // Parse numbers or set to null
    const minBudgetNum = minBudget ? parseInt(minBudget, 10) : null;
    const maxBudgetNum = maxBudget ? parseInt(maxBudget, 10) : null;
    const capacityNum = capacity ? parseInt(capacity, 10) : null;

    const query = `
      SELECT *
      FROM vendor
      WHERE
        ($1 = '' OR category = $1)
        AND (
          $2 = '' OR EXISTS (
            SELECT 1 FROM unnest(cities) AS c WHERE LOWER(c) = LOWER($2)
          )
        )
        AND ($3::int IS NULL OR capacity >= $3::int)
        AND (
          ($4::int IS NULL OR max_budget >= $4::int)
          AND
          ($5::int IS NULL OR min_budget <= $5::int)
        )
    `;

    const values = [category, location, capacityNum, minBudgetNum, maxBudgetNum];

    const result = await pool.query(query, values);

    // Format budgetRange and convert image buffer to base64 data URL
    const formattedVendors = result.rows.map(vendor => {
      let imageUrl = null;
      if (vendor.banner_image) {
        const base64Image = vendor.banner_image.toString('base64');
        // Adjust mime type if needed (jpeg/png/gif)
        imageUrl = `data:image/jpeg;base64,${base64Image}`;
      }

      return {
        ...vendor,
        budgetRange: {
          min: vendor.min_budget,
          max: vendor.max_budget,
        },
        image: imageUrl, // Add image data URL for frontend
      };
    });

    res.json({ vendors: formattedVendors });

  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// saving tickets
app.post('/api/tickets', async (req, res) => {
  const { event_id, type, name, quantity, price, sales_start, sales_end } = req.body;

  try {
    const query = `
      INSERT INTO tickets (event_id, type, name, quantity, price, sales_start, sales_end)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [event_id, type, name, quantity, price, sales_start, sales_end];

    const result = await pool.query(query, values);
    console.log("Received event_id:", event_id);
    console.log("Received ticket:", req.body);
    res.status(200).json({ ticket: result.rows[0] });
  } catch (error) {
    console.error('Ticket insert error:', error);
    res.status(500).json({ error: 'Ticket insert failed' });
  }
});


//HOMEPAGE ENDPOINTS
//to filter according to the city in the homepage
app.get('/api/filterByLocation', async (req, res) => {
  const { city } = req.query;
  console.log("Filtering by city:", city);

  try {
    let result;
    if (city && city.toLowerCase() !== "all") {
      result = await pool.query(
        `SELECT * FROM event WHERE LOWER(TRIM(city)) = LOWER(TRIM($1)) ORDER BY date ASC`,
        [city]
      );
    } else {
      result = await pool.query('SELECT * FROM event ORDER BY date ASC');
    }

    console.log("Events returned:", result.rows.length);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

//to filter according to the category in the homepage
app.get('/api/filterBycategory', async (req, res) => {
  const { category } = req.query;
  console.log("Filtering by category:", category);

  try {
    let result;
    if (category && category.toLowerCase() !== "all") {
      result = await pool.query(
        `SELECT * FROM event WHERE LOWER(TRIM(category)) = LOWER(TRIM($1)) ORDER BY date ASC`,
        [category]
      );
    } else {
      result = await pool.query('SELECT * FROM event ORDER BY date ASC');
    }

    console.log("Events returned by filtered according to category:", result.rows.length);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// filters both category & location
app.get("/api/filterByCategoryAndLocation", async (req, res) => {
  const { category, city } = req.query;

  try {
    const result = await pool.query(
      "SELECT * FROM event WHERE category = $1 AND city = $2 ORDER BY date ASC",
      [category, city]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error filtering by category and location:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// to fetch organizer data from db to Organizer profile
app.get('/api/organizers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM organizer WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Organizer not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
});


// ENDPOINTS OF AI(DILEE'S CODE)

// for those pop ups
//to fetch data to the EventPage, in the homepage
// Fetch event by ID
app.get('/api/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // this selects only from the event table
    // const result = await pool.query('SELECT * FROM event WHERE id = $1', [id]);

    // adding a left join to get ticket information from the ticket table & event table
    const result = await pool.query(`SELECT e.*, json_agg(t.*) FILTER (WHERE t.id IS NOT NULL) AS tickets FROM event e LEFT JOIN tickets t ON t.event_id = e.id WHERE e.id = $1 GROUP BY e.id`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const row = result.rows[0];

// Parse tags before sending
if (typeof row.tags === "string") {
  row.tags = row.tags.split(",").map((tag) => tag.trim());
}

 //Ensure tickets is a valid object
    if (!row.tickets || typeof row.tickets !== 'object') {
      row.tickets = {
        paid: [],
        free: [],
        donation: [],
      };
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// POST /api/purchaseTicket
app.post('/api/purchaseTicket', async (req, res) => {
  const { attendeeId, ticketId, quantity, purchase_time } = req.body;

  try {
    // Get ticket info
    const ticketRes = await pool.query("SELECT price, quantity FROM tickets WHERE id = $1", [ticketId]);
    const ticket = ticketRes.rows[0];

    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    if (ticket.quantity < quantity) return res.status(400).json({ error: "Not enough tickets available" });

    const totalPrice = ticket.price * quantity;

    // Insert into ticket_orders
    await pool.query(
      `INSERT INTO ticket_orders (attendee_id, ticket_id, quantity, total_price, purchase_time)
       VALUES ($1, $2, $3, $4, COALESCE($5, NOW()) )`,
      [attendeeId, ticketId, quantity, totalPrice, purchase_time]
    );

    // Update available tickets
    await pool.query(
      `UPDATE tickets SET availabe_quantity = quantity - $1 WHERE id = $2`,
      [quantity, ticketId]
    );

    res.json({ success: true, message: "Ticket purchased successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

//to display the events in the eventSummary page with teh revenue included 
app.get('/api/eventsummary', async (req, res) => {
  try {
    const query = `
      SELECT
        e.*,
        COALESCE(SUM(t_order.quantity), 0) AS tickets_sold,
        COALESCE(SUM(t_order.quantity * t.price), 0) AS revenue
      FROM event e
      LEFT JOIN tickets t ON t.event_id = e.id
      LEFT JOIN ticket_orders t_order ON t_order.ticket_id = t.id
      GROUP BY e.id
      ORDER BY e.date ASC
    `;

    const result = await pool.query(query);
     console.log("DB result rows:", result.rows); 
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});




//analytics
// Endpoint to get event analytics
// Endpoint to get event analytics
app.get('/api/eventanalytics', async (req, res) => {
  try {
    const eventRes = await pool.query(`SELECT * FROM event`);
    const events = eventRes.rows;

    const analytics = await Promise.all(events.map(async (event) => {
      const ticketData = await pool.query(`
        SELECT 
          SUM(quantity) as tickets_sold,
          SUM(total_price) as revenue
        FROM ticket_orders
        WHERE ticket_id IN (
          SELECT id FROM tickets WHERE event_id = $1
        )
      `, [event.id]);

      const ticketsSold = parseInt(ticketData.rows[0].tickets_sold || 0);
      const revenue = parseFloat(ticketData.rows[0].revenue || 0);

      return {
        id: event.id,
        name: event.event_title,
        type: event.category,
        date: event.date,
        ticketsSold,
        capacity: event.headcount,
        revenue,
        attendees: ticketsSold, // For now assume 1 ticket = 1 attendee
        checkIns: [],           // Populate if you have check-in data
        ticketTypes: [],        // Join with ticket table if you want breakdown
        demographics: {
          age: [],              // Join with attendees if stored
          gender: [],
          location: [{ city: event.city, attendees: ticketsSold }]
        }
      };
    }));

    res.json(analytics);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


// Example with Express and PostgreSQL
app.get('/api/events/:eventId', async (req, res) => {
  const { eventId } = req.params;
  try {
    const eventResult = await pool.query('SELECT * FROM event WHERE id = $1', [eventId]);
    if (eventResult.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const event = eventResult.rows[0];
    res.json(event);
  } catch (err) {
    console.error('Failed to fetch event:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// Save seating layout image to db
app.post(
  '/api/saveLayout/:eventId',
  upload.single('layoutImage'),
  async (req, res) => {
    console.log('req.params.eventId:', req.params.eventId);
    console.log('req.file present:', !!req.file);
    if (!req.file) {
      return res
        .status(400)
        .json({ error: 'No file received—check your form-data key!' });
    }

    const layoutImage = req.file.buffer;
    console.log('layoutImage byte length:', layoutImage.length);

    try {
      // Make sure your eventId is the right type
      const eventId = parseInt(req.params.eventId, 10);
      console.log('parsed eventId:', eventId);

      console.log('running UPDATE query...');
      const result = await pool.query(
        `UPDATE event
         SET seat_arrangement = $1
         WHERE id = $2
         RETURNING id, seat_arrangement IS NOT NULL AS saved`,
        [layoutImage, eventId]
      );
      console.log('query result rows:', result.rows);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Event not found' });
      }
      if (!result.rows[0].saved) {
        return res
          .status(500)
          .json({ error: 'Layout image column stayed NULL' });
      }

      res
        .status(200)
        .json({ message: 'Layout image saved successfully', event: result.rows[0] });
    } catch (err) {
      // Print the full error so we know exactly what’s going on
      console.error('Error saving layout image:', err);
      res.status(500).json({ error: err.message });
    }
  }
);


// save agenda
// Save generated agenda
app.post(
  "/api/saveAgenda/:eventId",
  async (req, res) => {
    const { eventId } = req.params;
    const { agenda } = req.body;

    console.log("🔍 Saving agenda for eventId:", eventId);
    if (!agenda || typeof agenda !== "string") {
      return res.status(400).json({ error: "Agenda text is required" });
    }

    try {
      const result = await pool.query(
        `UPDATE event
           SET agenda = $1
         WHERE id = $2
         RETURNING id, agenda IS NOT NULL AS saved`,
        [agenda, parseInt(eventId, 10)]
      );
      console.log("saveAgenda result:", result.rows);

      if (!result.rows.length) {
        return res.status(404).json({ error: "Event not found" });
      }
      if (!result.rows[0].saved) {
        return res
          .status(500)
          .json({ error: "Agenda column stayed NULL" });
      }

      res.json({ message: "Agenda saved successfully" });
    } catch (err) {
      console.error("saveAgenda error:", err);
      res.status(500).json({ error: err.message });
    }
  }
);




// Fetch or create reservation for event and venue
app.post('/api/reservations', async (req, res) => {
  const { event_id, venue_id, user_email, message } = req.body;
  try {
    // Check if reservation exists
    let result = await pool.query(
      `SELECT rr.id, rr.event_id, rr.venue_id, rr.user_email, rr.message, rr.status, rr.request_id,
              e.event_title, e.date, e.description,
              v.venue_name, v.email, v.address
       FROM public.reservation_requests rr
       JOIN public.event e ON rr.event_id = e.id
       JOIN public.venues v ON rr.venue_id = v.id
       WHERE rr.event_id = $1 AND rr.venue_id = $2`,
      [event_id, venue_id]
    );

    if (result.rows.length === 0) {
      // Create new reservation
      const requestId = uuidv4();
      result = await pool.query(
        `INSERT INTO public.reservation_requests (event_id, venue_id, user_email, message, status, request_id)
         VALUES ($1, $2, $3, $4, 'pending', $5)
         RETURNING id, event_id, venue_id, user_email, message, status, request_id`,
        [event_id, venue_id, user_email || 'user@example.com', message || 'Reservation request', requestId]
      );

      // Fetch full details after insertion
      result = await pool.query(
        `SELECT rr.id, rr.event_id, rr.venue_id, rr.user_email, rr.message, rr.status, rr.request_id,
                e.event_title, e.date, e.description,
              v.venue_name, v.email, v.address
         FROM public.reservation_requests rr
         JOIN public.event e ON rr.event_id = e.id
         JOIN public.venues v ON rr.venue_id = v.id
         WHERE rr.id = $1`,
        [result.rows[0].id]
      );
    }

    const reservation = result.rows[0];
    reservation.venue = {
      venue_name: reservation.venue_name || 'Unknown Venue',
      email: reservation.email || 'unknown@eventsphere.lk',
      address: reservation.address || 'N/A',
      contact_person: reservation.contact_person || 'N/A'
    };
    delete reservation.venue_name;
    delete reservation.email;
    delete reservation.address;
    delete reservation.contact_person;
    res.json(reservation);
  } catch (err) {
    console.error('Error fetching/creating reservation:', err);
    res.status(500).json({ error: 'Server error: Unable to fetch or create reservation' });
  }
});


// Generate email content
app.get('/api/generateEmail/:reservationId', async (req, res) => {
  try {
    const { reservationId } = req.params;
    const result = await pool.query(
      `SELECT rr.id, rr.event_id, rr.venue_id, rr.user_email, rr.message, rr.status, rr.request_id,
              e.event_title, e.date,  e.description,
              v.venue_name, v.email, v.address
       FROM public.reservation_requests rr
       JOIN public.event e ON rr.event_id = e.id
       JOIN public.venues v ON rr.venue_id = v.id
       WHERE rr.id = $1`,
      [reservationId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    const reservation = result.rows[0];

    // Generate or update request_id
    let requestId = reservation.request_id;
    if (!requestId) {
      requestId = uuidv4();
      await pool.query(
        'UPDATE public.reservation_requests SET request_id = $1 WHERE id = $2',
        [requestId, reservationId]
      );
    }

    const emailContent = `
      <h3>Venue Reservation Request</h3>
      <p>Dear ${reservation.contact_person || 'Venue Manager'},</p>
      <p>We are interested in booking <strong>${reservation.venue_name || 'N/A'}</strong> for the event: <strong>${reservation.event_title || 'N/A'}</strong>.</p>
      <p><strong>Event Details:</strong></p>
      <ul>
        <li><strong>Date:</strong> ${new Date(reservation.date).toLocaleDateString()}</li>
        <li><strong>Details:</strong> ${reservation.description || 'N/A'}</li>
        <li><strong>Time:</strong> ${reservation.message || 'N/A'}</li>
      </ul>
      <p>Please confirm or reject this request using the links below:</p>
      <p>
        <a href="http://localhost:5000/api/confirm/${requestId}?status=confirmed">Confirm</a> |
        <a href="http://localhost:5000/api/confirm/${requestId}?status=rejected">Reject</a>
      </p>
      <p>Thank you,<br>EventSphere</p>
    `;

    res.json({ email: emailContent });
  } catch (err) {
    console.error('Error generating email:', err);
    res.status(500).json({ error: 'Failed to generate email' });
  }
});


// Send email to the selected venue
app.post('/api/sendEmail/:reservationId', async (req, res) => {
  const { email } = req.body;
  try {
    const { reservationId } = req.params;
    const result = await pool.query(
      `SELECT rr.id, rr.event_id, rr.venue_id, rr.user_email, rr.message, rr.status, rr.request_id,
              v.email AS venue_email, v.venue_name, e.event_title
       FROM public.reservation_requests rr
       JOIN public.venues v ON rr.venue_id = v.id
       JOIN public.event e ON rr.event_id = e.id
       WHERE rr.id = $1`,
      [reservationId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    const reservation = result.rows[0];
    if (reservation.status !== 'pending') {
      return res.status(400).json({ error: 'Request already processed' });
    }

    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: reservation.venue_email,
      subject: `Venue Reservation Request for ${reservation.venue_name}`,
      html: email
    });

    res.json({ message: 'Email sent successfully to the venue.' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Handle venue confirmation/rejection
app.get('/api/confirm/:requestId', async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.query;

  try {
    const result = await pool.query(
      `SELECT rr.id, rr.status, rr.user_email, e.event_title, v.venue_name, rr.venue_id
       FROM public.reservation_requests rr
       JOIN public.event e ON rr.event_id = e.id
       JOIN public.venues v ON rr.venue_id = v.id
       WHERE rr.request_id = $1`,
      [requestId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Request not found' });
    }
    const reservation = result.rows[0];
    console.log(result.rows[0])
    if (reservation.status !== 'pending') {
      return res.status(400).json({ error: 'Request already processed' });
    }

    await pool.query(
      `UPDATE public.reservation_requests
       SET status = $1, updated_at = NOW()
       WHERE request_id = $2`,
      [status === 'confirmed' ? 'confirmed' : 'rejected', requestId]
    );
console.log(`Updated reservation_requests status to ${status} for requestId: ${requestId}`);

    // If confirmed and venue_id exists, mark venue as unavailable
    if (status === 'confirmed' || reservation.venue_id) {
      console.log(`Updating venue availability for venue_id: ${reservation.venue_id}`);
      const updateResult = await pool.query(
        `UPDATE public.venues
         SET available = FALSE
         WHERE id = $1
         RETURNING id, venue_name, available`,
        [reservation.venue_id]
      );
      if (updateResult.rows.length === 0) {
        console.error(`Failed to update venue availability for venue_id: ${reservation.venue_id}`);
      } else {
        console.log(`Venue updated:`, updateResult.rows[0]);
      }
    }

    await transporter.sendMail({
      from: 'eventsphere.application@gmail.com',
      to: reservation.user_email,
      subject: `Venue Request for ${reservation.event_title} ${status === 'confirmed' ? 'Confirmed' : 'Rejected'}`,
      html: `<p>Your reservation request for ${reservation.venue_name} has been ${status}.</p>`
    });

    res.send(`Request ${status} successfully`);
  } catch (err) {
    console.error('Error processing confirmation:', err);
    res.status(500).json({ error: 'Failed to process confirmation' });
  }
});

// Infer tasks from event description
app.post('/api/infer-tasks', async (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: 'Event description is required' });
  }
  try {
    // Placeholder: Replace with actual task inference logic (e.g., AI service)
    const tasks = [
      `Plan logistics for ${description.slice(0, 20)}...`,
      `Coordinate with vendors`,
      `Confirm event schedule`
    ];
    res.json({ tasks });
  } catch (err) {
    console.error('Error inferring tasks:', err);
    res.status(500).json({ error: 'Failed to infer tasks' });
  }
});


// Save vendors for an event
app.post('/api/saveEventVendors', async (req, res) => {
  const { event_id, vendor_ids } = req.body;
  if (!event_id || !Array.isArray(vendor_ids) || vendor_ids.length === 0) {
    return res.status(400).json({ error: 'Event ID and at least one vendor ID are required' });
  }
  try {
    const values = vendor_ids.map((_, i) => `($1, $${i + 2}, 'pending')`).join(', ');
    const query = `INSERT INTO public.event_vendors (event_id, vendor_id, status) 
                   VALUES ${values} 
                   ON CONFLICT ON CONSTRAINT unique_event_vendor 
                   DO UPDATE SET status = 'pending', created_at = NOW() 
                   RETURNING id, event_id, vendor_id, status`;
    const result = await pool.query(query, [event_id, ...vendor_ids]);
    res.status(201).json({ message: 'Vendors saved successfully', insertedVendors: result.rows });
  } catch (err) {
    console.error('Error saving event vendors:', err.message);
    res.status(500).json({ error: 'Failed to save event vendors' });
  }
});

// Get vendors for an event
app.get('/api/getEventVendors/:eventId', async (req, res) => {
  const { eventId } = req.params;
  try {
    const result = await pool.query(
      `SELECT v.id, v.name, v.email, v.address, v.category, v.capacity, 
    v.min_budget, ev.status
       FROM public.event_vendors ev
       JOIN public.vendor v ON ev.vendor_id = v.id
       WHERE ev.event_id = $1`,
      [eventId]
    );
    res.json({ vendors: result.rows });
  } catch (err) {
    console.error('Error fetching event vendors:', err);
    res.status(500).json({ error: 'Failed to fetch event vendors' });
  }
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
