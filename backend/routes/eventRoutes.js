//to fetch data to the EventPage, in the homepage
app.get('api/event/:id', async (req, res) => {
  const eventId = req.params.id;

  try {
    const eventQuery = `
      SELECT *, encode(banner_image, 'base64') as banner_image
      FROM event WHERE id = $1
    `;
    const ticketsQuery = `SELECT * FROM tickets WHERE event_id = $1`;

    const eventResult = await pool.query(eventQuery, [eventId]);
    const ticketsResult = await pool.query(ticketsQuery, [eventId]);

    if (eventResult.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const event = eventResult.rows[0];

    // Organize tickets by type
    const ticketGroups = {
      paid: [],
      free: [],
      donation: [],
    };

    for (const ticket of ticketsResult.rows) {
      ticketGroups[ticket.type]?.push(ticket);
    }

    const data = {
      id: event.id,
      eventName: event.event_title,
      date: {
        day: new Date(event.date).getDate(),
        month: new Date(event.date).toLocaleString('default', { month: 'long' }),
        year: new Date(event.date).getFullYear(),
        fullDate: event.date,
      },
      time: event.time,
      location: event.location,
      description: event.description,
      stalls: event.headcount,
      hasAuthorMeet: false, // You can replace this with a real flag if needed
      coordinates: [event.coordinates.x, event.coordinates.y],
      tags: event.tags?.split(',') || [],
      faqs: event.faqs,
      bannerImage: `data:image/jpeg;base64,${event.banner_image}`,
      tickets: ticketGroups,
    };

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


