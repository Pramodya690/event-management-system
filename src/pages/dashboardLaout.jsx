import React from 'react';
import Sidebar from '../component/sidebar';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div style={styles.dashboard}>
      <Sidebar />
      <div style={styles.main}>
        
        <div style={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const styles = {
  dashboard: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  main: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: '20px',
    overflowY: 'auto',
  },
  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: '600',
  },
  profile: {
    backgroundColor: '#e2e8f0',
    padding: '8px 16px',
    borderRadius: '8px',
    fontWeight: '500',
  },
  content: {
    paddingBottom: '20px',
  },
};
