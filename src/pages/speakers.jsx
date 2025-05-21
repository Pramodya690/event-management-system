import React, { useState } from 'react';
import eventsData from '../data/events.json';
import speakersData from '../data/speakers.json';

const Speakers = () => {
  // Map speakerId => speaker + events
  const speakerMapById = speakersData.reduce((acc, speaker) => {
    acc[speaker.id] = { ...speaker, events: [] };
    return acc;
  }, {});

  eventsData.forEach((event) => {
    if (event.speakers && event.speakers.length) {
      event.speakers.forEach((speakerId) => {
        if (speakerMapById[speakerId]) {
          speakerMapById[speakerId].events.push(event);
        }
      });
    }
  });

  const [speakerStatus, setSpeakerStatus] = useState(
    Object.keys(speakerMapById).reduce((acc, id) => {
      acc[id] = speakerMapById[id].active ? 'active' : 'blocked';
      return acc;
    }, {})
  );

  const [search, setSearch] = useState('');

  const toggleStatus = (id) => {
    setSpeakerStatus((prev) => ({
      ...prev,
      [id]: prev[id] === 'active' ? 'blocked' : 'active',
    }));
  };

  const filteredSpeakers = Object.values(speakerMapById).filter(
    (speaker) =>
      speaker.name.toLowerCase().includes(search.toLowerCase()) ||
      speaker.email.toLowerCase().includes(search.toLowerCase()) ||
      speaker.phone.includes(search)
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Speakers Dashboard</h1>

      <input
        type="text"
        placeholder="Search by name, email, or phone"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchInput}
      />

      {filteredSpeakers.length === 0 ? (
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>No speakers found.</p>
      ) : (
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Events Participated</th>
              <th style={styles.th}>Event Titles</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSpeakers.map((speaker) => (
              <tr
                key={speaker.id}
                style={{
                  ...styles.tr,
                  ...(speakerStatus[speaker.id] === 'blocked' ? styles.blockedRow : {}),
                }}
              >
                <td style={styles.td}>{speaker.name}</td>
                <td style={{ ...styles.td, color: '#2a72d9' }}>{speaker.email}</td>
                <td style={styles.td}>{speaker.phone}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.statusBadge,
                      backgroundColor:
                        speakerStatus[speaker.id] === 'active' ? '#d4edda' : '#f8d7da',
                      color:
                        speakerStatus[speaker.id] === 'active' ? '#155724' : '#721c24',
                    }}
                  >
                    {speakerStatus[speaker.id]}
                  </span>
                </td>
                <td style={styles.td}>{speaker.events.length}</td>
                <td style={{ ...styles.td, maxWidth: '220px' }}>
                  <ul style={styles.eventList}>
                    {speaker.events.map((event) => (
                      <li
                        key={event.id}
                        title={event.heading}
                        style={styles.eventListItem}
                      >
                        {event.heading.length > 25
                          ? event.heading.substring(0, 22) + '...'
                          : event.heading}
                      </li>
                    ))}
                  </ul>
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() => toggleStatus(speaker.id)}
                    style={{
                      ...styles.statusBtn,
                      backgroundColor:
                        speakerStatus[speaker.id] === 'active' ? '#dc3545' : '#28a745',
                    }}
                    title={
                      speakerStatus[speaker.id] === 'active'
                        ? 'Block Speaker'
                        : 'Unblock Speaker'
                    }
                  >
                    {speakerStatus[speaker.id] === 'active' ? 'Block' : 'Unblock'}
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
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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
    margin: '0 auto 2rem auto',
    display: 'block',
    borderRadius: '12px',
    border: '1.5px solid #cbd5e1',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  thead: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    textAlign: 'left',
  },
  th: {
    padding: '1rem',
    fontWeight: '700',
    fontSize: '1.1rem',
  },
  tr: {
    borderBottom: '1px solid #e5e7eb',
  },
  blockedRow: {
    opacity: 0.5,
    fontStyle: 'italic',
  },
  td: {
    padding: '1rem',
    verticalAlign: 'middle',
  },
  statusBadge: {
    padding: '0.35rem 0.75rem',
    borderRadius: '20px',
    fontWeight: '600',
    fontSize: '0.9rem',
    display: 'inline-block',
  },
  eventList: {
    margin: 0,
    paddingLeft: '1.2rem',
    maxHeight: '70px',
    overflowY: 'auto',
  },
  eventListItem: {
    listStyleType: 'disc',
    marginBottom: '4px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '200px',
  },
  statusBtn: {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem',
    transition: 'background-color 0.25s ease',
  },
};

export default Speakers;
