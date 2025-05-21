import React, { useState } from 'react';

const AddVenueForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    capacity: '',
    contact_email: '',
    contact_phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.address.trim() ||
      !form.capacity.trim() ||
      !form.contact_email.trim() ||
      !form.contact_phone.trim()
    ) {
      alert('Please fill in all fields.');
      return;
    }

    onAdd?.({
      id: Date.now(),
      name: form.name.trim(),
      address: form.address.trim(),
      capacity: Number(form.capacity),
      contact_email: form.contact_email.trim(),
      contact_phone: form.contact_phone.trim(),
      events: [],
    });

    setForm({
      name: '',
      address: '',
      capacity: '',
      contact_email: '',
      contact_phone: '',
    });
  };

  const handleUploadLayout = () => {
    alert('This will open a new page or dialog to upload hall layouts (to be implemented).');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Add New Venue</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Venue Name"
          value={form.name}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={form.capacity}
          onChange={handleInputChange}
          style={styles.input}
          min="0"
        />
        <input
          type="email"
          name="contact_email"
          placeholder="Contact Email"
          value={form.contact_email}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="tel"
          name="contact_phone"
          placeholder="Contact Phone"
          value={form.contact_phone}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button type="submit" style={styles.addBtn}>
          Add Venue
        </button>
      </form>

      <div style={styles.layoutSection}>
        <h2 style={styles.subHeading}>Upload Hall Layouts</h2>
        <button onClick={handleUploadLayout} style={styles.uploadBtn}>
          Upload Layout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#1e293b',
  },
  subHeading: {
    fontSize: '1.25rem',
    marginBottom: '1rem',
    color: '#334155',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '3rem',
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    border: '1.5px solid #cbd5e1',
    fontSize: '1rem',
    outline: 'none',
  },
  addBtn: {
    padding: '0.75rem 2rem',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: '1.1rem',
    alignSelf: 'center',
  },
  layoutSection: {
    textAlign: 'center',
  },
  uploadBtn: {
    padding: '0.75rem 2rem',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#10b981',
    color: '#fff',
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: '1.1rem',
  },
};

export default AddVenueForm;
