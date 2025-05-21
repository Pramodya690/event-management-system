import React, { useState } from 'react';
import eventsData from '../data/events.json';
import vendorsData from '../data/vendors.json';

const Vendors = () => {
  // Map vendorId => vendor + events
  const vendorMapById = vendorsData.reduce((acc, vendor) => {
    acc[vendor.id] = { ...vendor, events: [] };
    return acc;
  }, {});

  eventsData.forEach((event) => {
    if (event.vendors && event.vendors.length) {
      event.vendors.forEach((vendorId) => {
        if (vendorMapById[vendorId]) {
          vendorMapById[vendorId].events.push(event);
        }
      });
    }
  });

  const [vendorStatus, setVendorStatus] = useState(
    Object.keys(vendorMapById).reduce((acc, id) => {
      acc[id] = 'active';
      return acc;
    }, {})
  );

  const [search, setSearch] = useState('');

  const toggleStatus = (id) => {
    setVendorStatus((prev) => ({
      ...prev,
      [id]: prev[id] === 'active' ? 'blocked' : 'active',
    }));
  };

  const filteredVendors = Object.values(vendorMapById).filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(search.toLowerCase()) ||
      vendor.email.toLowerCase().includes(search.toLowerCase()) ||
      vendor.phone.includes(search)
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Vendors Dashboard</h1>

      <input
        type="text"
        placeholder="Search by name, email, or phone"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchInput}
      />

      {filteredVendors.length === 0 ? (
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>No vendors found.</p>
      ) : (
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Events Contributed</th>
              <th style={styles.th}>Event Titles</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor) => (
              <tr
                key={vendor.id}
                style={{
                  ...styles.tr,
                  ...(vendorStatus[vendor.id] === 'blocked' ? styles.blockedRow : {}),
                }}
              >
                <td style={styles.td}>{vendor.name}</td>
                <td style={{ ...styles.td, color: '#2a72d9' }}>{vendor.email}</td>
                <td style={styles.td}>{vendor.phone}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.statusBadge,
                      backgroundColor:
                        vendorStatus[vendor.id] === 'active' ? '#d4edda' : '#f8d7da',
                      color: vendorStatus[vendor.id] === 'active' ? '#155724' : '#721c24',
                    }}
                  >
                    {vendorStatus[vendor.id]}
                  </span>
                </td>
                <td style={styles.td}>{vendor.events.length}</td>
                <td style={{ ...styles.td, maxWidth: '220px' }}>
                  <ul style={styles.eventList}>
                    {vendor.events.map((event) => (
                      <li key={event.id} title={event.heading} style={styles.eventListItem}>
                        {event.heading.length > 25
                          ? event.heading.substring(0, 22) + '...'
                          : event.heading}
                      </li>
                    ))}
                  </ul>
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() => toggleStatus(vendor.id)}
                    style={{
                      ...styles.statusBtn,
                      backgroundColor:
                        vendorStatus[vendor.id] === 'active' ? '#dc3545' : '#28a745',
                    }}
                    title={vendorStatus[vendor.id] === 'active' ? 'Block Vendor' : 'Unblock Vendor'}
                  >
                    {vendorStatus[vendor.id] === 'active' ? 'Block' : 'Unblock'}
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
    backgroundColor: '#2563eb',
    color: '#fff',
    fontWeight: '700',
  },
  th: {
    padding: '1rem 1.2rem',
    textAlign: 'left',
    fontSize: '1rem',
    userSelect: 'none',
  },
  tr: {
    transition: 'background-color 0.3s ease',
    cursor: 'default',
  },
  blockedRow: {
    backgroundColor: '#fde2e1',
  },
  td: {
    padding: '1rem 1.2rem',
    verticalAlign: 'middle',
    fontSize: '0.95rem',
    color: '#374151',
  },
  statusBadge: {
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    fontWeight: '600',
    textTransform: 'capitalize',
    fontSize: '0.85rem',
    display: 'inline-block',
  },
  eventList: {
    margin: 0,
    paddingLeft: '1rem',
    maxHeight: '120px',
    overflowY: 'auto',
  },
  eventListItem: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: '0.25rem',
  },
  statusBtn: {
    padding: '0.45rem 1rem',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: '700',
    fontSize: '0.9rem',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgb(0 0 0 / 0.15)',
    transition: 'background-color 0.3s ease',
  },
};

export default Vendors;
