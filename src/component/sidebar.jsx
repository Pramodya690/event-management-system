import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MdDashboard,
  MdEvent,
  MdPeople,
  MdStore,
  MdRecordVoiceOver,
  MdLocationOn,
  MdSettings,
  MdLogout,
} from 'react-icons/md';

const menuItems = [
  { icon: <MdDashboard />, label: 'Dashboard', path: '/dashboard' },
  { icon: <MdEvent />, label: 'Events', path: '/events' },
  { icon: <MdPeople />, label: 'Organizers', path: '/organizers' },
  { icon: <MdStore />, label: 'Vendors', path: '/vendors' },
  { icon: <MdRecordVoiceOver />, label: 'Speakers', path: '/speakers' },
  { icon: <MdLocationOn />, label: 'Venues', path: '/venues' },
  // { icon: <MdSettings />, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    // TODO: Add your sign out logic here
    alert('Signing out...');
    // For example: clear auth tokens, redirect to login page
    navigate('/login');
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>EventSphere</h2>
      <ul style={styles.navList}>
        {menuItems.map(({ icon, label, path }, index) => (
          <li
            key={index}
            style={{
              ...styles.navItem,
              ...(path && location.pathname === path ? styles.navItemActive : {}),
            }}
            onClick={() => {
              if (path) navigate(path);
            }}
          >
            <span style={styles.icon}>{icon}</span>
            {label}
          </li>
        ))}
      </ul>

      {/* Sign Out button at bottom */}
      <div
        style={{ ...styles.navItem, marginTop: 'auto', cursor: 'pointer' }}
        onClick={handleSignOut}
      >
        <MdLogout style={styles.icon} />
        Sign Out
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: '200px',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    color: '#fff',
    padding: '20px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    fontSize: '22px',
    marginBottom: '30px',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    flexGrow: 1, // so Sign Out sticks at bottom
  },
  navItem: {
    padding: '10px 0',
    cursor: 'pointer',
    color: '#cbd5e1',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderRadius: '6px',
    transition: 'background-color 0.3s, color 0.3s',
  },
  navItemActive: {
    backgroundColor: '#2563eb',
    color: '#fff',
    fontWeight: '600',
  },
  icon: {
    fontSize: '20px',
  },
};
