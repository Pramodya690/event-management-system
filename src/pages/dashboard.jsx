import React from 'react';
import data from '../data/data.json';

export default function DashboardHome() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>
      <div style={styles.cardContainer}>
      {data.map((item, index) => (
        <div key={index} style={styles.card}>
          <h3>{item.title}</h3>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
    </div>
    
  );
}

const styles = {
  // container: {
  //   width: '100%',
  //   minHeight: '100vh',  // full viewport height
  //   backgroundImage: 'linear-gradient(135deg, rgba(37, 39, 42, 0.7), rgba(41, 45, 51, 0.7)), url("zzzzz")',
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   padding: '2rem',
  //   boxSizing: 'border-box',
  // },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(5, 5, 5, 0.05)',
    textAlign: 'center',
  },
};
