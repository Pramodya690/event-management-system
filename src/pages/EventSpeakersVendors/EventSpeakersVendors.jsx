import React, { useState } from 'react';
import './EventSpeakersVendors.css';

const EventSpeakersVendors = () => {
  // Which tab is currently selected
  const [activeTab, setActiveTab] = useState('speakers');

  // Speaker‑specific UI state
  const [findSpeakersWebscrape, setFindSpeakersWebscrape] = useState(false);
  const [findSpeakersOpenAI, setFindSpeakersOpenAI] = useState(false);

  // Vendor‑specific UI state
  const [findVendorsWebscrape, setFindVendorsWebscrape] = useState(false);
  const [findVendorsOpenAI, setFindVendorsOpenAI] = useState(false);

  return (
    <div className="container">
      {/* ---------- LEFT SIDEBAR ---------- */}
      <aside className="sidebar">
        <h3>Create</h3>
        <nav>
          <div className="nav-item active">Events</div>
          <div className="nav-item">Speakers</div>
          <div className="nav-item">Vendors</div>
          <div className="nav-item">Team</div>
        </nav>

        <button className="new-event-btn">New event</button>

        <div className="search-section">
          <input
            type="text"
            placeholder="Search events"
            className="search-input"
          />
          <div className="event-list">
            <div className="event-item">
              Tech Expo <div className="event-date">May 4th, 2023</div>
            </div>
            <div className="event-item">
              Health and Wellness <div className="event-date">Jun 12th, 2023</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ---------- MAIN PANEL ---------- */}
      <main className="main-content">
        <h2>Find speakers and vendors for your event</h2>

        {/* ---- Tabs ---- */}
        <div className="tab-buttons">
          <button
            className={`tab ${activeTab === 'speakers' ? 'active' : ''}`}
            onClick={() => setActiveTab('speakers')}
          >
            Speakers
          </button>
          <button
            className={`tab ${activeTab === 'vendors' ? 'active' : ''}`}
            onClick={() => setActiveTab('vendors')}
          >
            Vendors
          </button>
        </div>

        {/* ---- Speakers Form ---- */}
        {activeTab === 'speakers' && (
          <section>
            <h3>Invite your own speakers</h3>
            <input
              type="email"
              placeholder="Enter email address"
              className="input-field"
            />

            <div className="button-group">
              <button className="action-button">+ Add another speaker</button>
              <button className="action-button">Upload a list of speakers</button>
              <button className="action-button">Invite your team</button>
            </div>

            <div>
              <h4>Find speakers with Webscrape Bot</h4>
              <label>
                <input
                  type="radio"
                  name="ws-speaker"
                  checked={!findSpeakersWebscrape}
                  onChange={() => setFindSpeakersWebscrape(false)}
                />{' '}
                No
              </label>
              <label>
                <input
                  type="radio"
                  name="ws-speaker"
                  checked={findSpeakersWebscrape}
                  onChange={() => setFindSpeakersWebscrape(true)}
                />{' '}
                Yes, I want to find speakers
              </label>
            </div>

            <div>
              <h4>Find speakers with OpenAI</h4>
              <label>
                <input
                  type="radio"
                  name="ai-speaker"
                  checked={!findSpeakersOpenAI}
                  onChange={() => setFindSpeakersOpenAI(false)}
                />{' '}
                No
              </label>
              <label>
                <input
                  type="radio"
                  name="ai-speaker"
                  checked={findSpeakersOpenAI}
                  onChange={() => setFindSpeakersOpenAI(true)}
                />{' '}
                Yes, I want to find speakers
              </label>
            </div>
          </section>
        )}

        {/* ---- Vendors Form ---- */}
        {activeTab === 'vendors' && (
          <section className="vendor-section">
            <h3>Invite your own vendors</h3>
            <input
              type="email"
              placeholder="Enter email address"
              className="input-field"
            />

            <div className="button-group">
              <button className="action-button">+ Add another vendor</button>
              <button className="action-button">Upload a list of vendors</button>
              <button className="action-button">Invite your team</button>
            </div>

            <div>
              <h4>Find vendors with Webscrape Bot</h4>
              <label>
                <input
                  type="radio"
                  name="ws-vendor"
                  checked={!findVendorsWebscrape}
                  onChange={() => setFindVendorsWebscrape(false)}
                />{' '}
                No
              </label>
              <label>
                <input
                  type="radio"
                  name="ws-vendor"
                  checked={findVendorsWebscrape}
                  onChange={() => setFindVendorsWebscrape(true)}
                />{' '}
                Yes, I want to find vendors
              </label>
            </div>

            <div>
              <h4>Find vendors with OpenAI</h4>
              <label>
                <input
                  type="radio"
                  name="ai-vendor"
                  checked={!findVendorsOpenAI}
                  onChange={() => setFindVendorsOpenAI(false)}
                />{' '}
                No
              </label>
              <label>
                <input
                  type="radio"
                  name="ai-vendor"
                  checked={findVendorsOpenAI}
                  onChange={() => setFindVendorsOpenAI(true)}
                />{' '}
                Yes, I want to find vendors
              </label>
            </div>
          </section>
        )}

        <button className="save-button">Save</button>
      </main>
    </div>
  );
};

export default EventSpeakersVendors;
