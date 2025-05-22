import React from 'react';
import './EventSummary.css';

const EventSummary = () => {
  return (
    <section className="event-summary">
      <p className="event-heading">
        Your event is happening in <strong>about 1 month</strong>
      </p>
      <div className="event-box">
        <div className="event-date">JUL<br /><span>03</span></div>
        <div className="event-info">
          <p><strong>Bookclubgather</strong></p>
          <p className="status">On Sale • Starts Jul 03, 2025 at 10:00 AM</p>
          <p>0/100 Tickets sold</p>
        </div>
        <button className="promote-btn">Promote</button>
      </div>
    </section>
  );
};

export default EventSummary;
