// pages/Events.jsx

import eventData from "../data/events.json";

export default function Events() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={styles.title}>Events</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        {eventData.map((event) => (
          <div key={event.id} style={{ backgroundColor: "#fff", padding: "16px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <img src={event.img} alt={event.heading} style={{ width: "100%", borderRadius: "8px" }} />
            <h2>{event.heading}</h2>
            <p>{event.date.month} {event.date.year}</p>
            <p>{event.location}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


const styles = {
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    textAlign: 'center',
  }
}