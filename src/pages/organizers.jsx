import React, { useState } from 'react';
import eventsData from '../data/events.json';

const Organizers = () => {
  // Group events by organizer
  const organizersMap = eventsData.reduce((acc, event) => {
    if (!acc[event.organizer]) {
      acc[event.organizer] = [];
    }
    acc[event.organizer].push(event);
    return acc;
  }, {});

  // Store status of organizers (active/blocked)
  const [organizersStatus, setOrganizersStatus] = useState(
    Object.keys(organizersMap).reduce((acc, organizer) => {
      acc[organizer] = 'active'; // default status
      return acc;
    }, {})
  );

  const handleBlock = (organizer) => {
    setOrganizersStatus((prev) => ({
      ...prev,
      [organizer]: prev[organizer] === 'blocked' ? 'active' : 'blocked',
    }));
  };

  const handleRemove = (organizer) => {
    setOrganizersStatus((prev) => {
      const updated = { ...prev };
      delete updated[organizer];
      return updated;
    });
    delete organizersMap[organizer];
  };

  const handleAdminAccess = (organizer) => {
    alert(`Admin Panel Access for ${organizer}`);
    // Navigate to admin panel if required
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Organizers Dashboard</h1>

      {Object.entries(organizersMap).map(([organizer, orgEvents]) => {
        // Skip removed organizers
        if (!organizersStatus[organizer]) return null;

        return (
          <div key={organizer} style={styles.card}>
            <div style={styles.header}>
              <div>
                <h2>{organizer}</h2>
                <p>Status: <strong>{organizersStatus[organizer]}</strong></p>
                <p>Events Conducted: {orgEvents.length}</p>
              </div>
              <div>
                <button onClick={() => handleAdminAccess(organizer)} style={styles.primaryBtn}>
                  View Events
                </button>
                <button onClick={() => handleBlock(organizer)} style={styles.blockBtn}>
                  {organizersStatus[organizer] === 'blocked' ? 'Unblock' : 'Block'}
                </button>
                <button onClick={() => handleRemove(organizer)} style={styles.removeBtn}>
                  Remove
                </button>
              </div>
            </div>
            <ul>
              {orgEvents.map((event) => (
                <li key={event.id}>🎟️ {event.heading}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '1rem',
  },
  primaryBtn: {
    marginRight: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(55, 93, 204, 0.72)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  blockBtn: {
    marginRight: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(183, 101, 255, 0.7)',
    color: 'black',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  removeBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(0, 46, 38, 0.7)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default Organizers;
