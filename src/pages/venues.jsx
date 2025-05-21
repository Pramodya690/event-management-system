import React, { useState } from 'react';
import venuesData from '../data/venues.json';
import eventsData from '../data/events.json';
import { Link } from 'react-router-dom';

const Venues = () => {
  const venueMapById = venuesData.reduce((acc, venue) => {
    acc[venue.id] = { ...venue, events: [] };
    return acc;
  }, {});

  eventsData.forEach((event) => {
    if (event.venue && venueMapById[event.venue]) {
      venueMapById[event.venue].events.push(event);
    }
  });

  const initialVenues = Object.values(venueMapById);
  const [venues, setVenues] = useState(initialVenues);
  const [search, setSearch] = useState('');

  const removeVenue = (id) => {
    setVenues((prev) => prev.filter((venue) => venue.id !== id));
  };

  const filteredVenues = venues.filter(
    (venue) =>
      venue.name.toLowerCase().includes(search.toLowerCase()) ||
      venue.address.toLowerCase().includes(search.toLowerCase()) ||
      venue.contact_email.toLowerCase().includes(search.toLowerCase()) ||
      venue.contact_phone.includes(search)
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Venues Dashboard</h1>

      {/* New Button to Navigate to Form Page */}
      <Link to="/addVenueForm">
        <button style={styles.addBtn}>+ Add New Venue</button>
      </Link>

      <input
        type="text"
        placeholder="Search by name, address, email or phone"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchInput}
      />

      {filteredVenues.length === 0 ? (
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>No venues found.</p>
      ) : (
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Capacity</th>
              <th style={styles.th}>Contact Email</th>
              <th style={styles.th}>Contact Phone</th>
              <th style={styles.th}>Events Hosted</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVenues.map((venue) => (
              <tr key={venue.id} style={styles.tr}>
                <td style={styles.td}>{venue.name}</td>
                <td style={styles.td}>{venue.address}</td>
                <td style={styles.td}>{venue.capacity}</td>
                <td style={{ ...styles.td, color: '#2a72d9' }}>{venue.contact_email}</td>
                <td style={styles.td}>{venue.contact_phone}</td>
                <td style={{ ...styles.td }}>{venue.events.length}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => removeVenue(venue.id)}
                    style={styles.removeBtn}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem 4rem',
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  searchInput: {
    padding: '0.75rem 1.25rem',
    width: '100%',
    maxWidth: '450px',
    margin: '1rem auto 2rem auto',
    display: 'block',
    borderRadius: '12px',
    border: '1.5px solid #cbd5e1',
    fontSize: '1rem',
    outline: 'none',
  },
  addBtn: {
    display: 'block',
    margin: '0 auto 1rem auto',
    padding: '0.75rem 1.5rem',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 10px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  thead: {
    backgroundColor: '#3b82f6',
    color: '#fff',
  },
  th: {
    padding: '1rem',
    fontWeight: '700',
  },
  tr: {
    borderBottom: '1px solid #e5e7eb',
  },
  td: {
    padding: '1rem',
    verticalAlign: 'middle',
  },
  removeBtn: {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: 'none',
    color: '#fff',
    backgroundColor: '#dc3545',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default Venues;
