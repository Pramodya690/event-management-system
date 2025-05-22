// src/pages/OrganizerDashboard/Dashboard.jsx
import React from "react";
import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import EventSummary from "../EventSummary/EventSummary";
import Planner from "../Planner/Planner";
import ProfileWidget from "../ProfileWidget/ProfileWidget";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <h1>Hello there, Pramodya</h1>
        <EventSummary />
        <Planner />
      </main>
      <ProfileWidget />
    </div>
  );
};

export default Dashboard;
