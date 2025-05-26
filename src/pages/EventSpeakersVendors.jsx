import React, { useState } from 'react';

const EventSpeakersVendors = () => {
  const [activeTab, setActiveTab] = useState('speakers');

  const [findSpeakersWebscrape, setFindSpeakersWebscrape] = useState(false);
  const [findSpeakersOpenAI, setFindSpeakersOpenAI] = useState(false);

  const [findVendorsWebscrape, setFindVendorsWebscrape] = useState(false);
  const [findVendorsOpenAI, setFindVendorsOpenAI] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ---------- LEFT SIDEBAR ---------- */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <h3 className="text-xl font-semibold mb-6">Create</h3>
        <ul className="space-y-2 mb-6 list-none pl-0">
          <li>
            <div className="cursor-pointer text-blue-600 font-semibold px-3 py-2 rounded bg-blue-100">
              Events
            </div>
          </li>
          <li>
            <div className="cursor-pointer px-3 py-2 rounded hover:bg-gray-100">Speakers</div>
          </li>
          <li>
            <div className="cursor-pointer px-3 py-2 rounded hover:bg-gray-100">Vendors</div>
          </li>
          <li>
            <div className="cursor-pointer px-3 py-2 rounded hover:bg-gray-100">Team</div>
          </li>
        </ul>

        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mb-6 transition-colors duration-200">
          New event
        </button>

        <div>
          <input
            type="text"
            placeholder="Search events"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-4 space-y-3 text-gray-700">
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span>Tech Expo</span>
              <span className="text-sm text-gray-500">May 4th, 2023</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span>Health and Wellness</span>
              <span className="text-sm text-gray-500">Jun 12th, 2023</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ---------- MAIN PANEL ---------- */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold mb-6">Find speakers and vendors for your event</h2>

        {/* ---- Tabs ---- */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 'speakers'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('speakers')}
          >
            Speakers
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 'vendors'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('vendors')}
          >
            Vendors
          </button>
        </div>

        {/* ---- Speakers Form ---- */}
        {activeTab === 'speakers' && (
          <section>
            <h3 className="text-xl font-semibold mb-3">Invite your own speakers</h3>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex flex-wrap gap-3 mb-6">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded transition">
                + Add another speaker
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded transition">
                Upload a list of speakers
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded transition">
                Invite your team
              </button>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Find speakers with Webscrape Bot</h4>
              <label className="mr-6 inline-flex items-center space-x-2">
                <input
                  type="radio"
                  name="ws-speaker"
                  checked={!findSpeakersWebscrape}
                  onChange={() => setFindSpeakersWebscrape(false)}
                  className="form-radio"
                />
                <span>No</span>
              </label>
              <label className="inline-flex items-center space-x-2">
                <input
                  type="radio"
                  name="ws-speaker"
                  checked={findSpeakersWebscrape}
                  onChange={() => setFindSpeakersWebscrape(true)}
                  className="form-radio"
                />
                <span>Yes, I want to find speakers</span>
              </label>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Find speakers with OpenAI</h4>
              <label className="mr-6 inline-flex items-center space-x-2">
                <input
                  type="radio"
                  name="ai-speaker"
                  checked={!findSpeakersOpenAI}
                  onChange={() => setFindSpeakersOpenAI(false)}
                  className="form-radio"
                />
                <span>No</span>
              </label>
              <label className="inline-flex items-center space-x-2">
                <input
                  type="radio"
                  name="ai-speaker"
                  checked={findSpeakersOpenAI}
                  onChange={() => setFindSpeakersOpenAI(true)}
                  className="form-radio"
                />
                <span>Yes, I want to find speakers</span>
              </label>
            </div>
          </section>
        )}

        {/* ---- Vendors Form ---- */}
        {activeTab === 'vendors' && (
          <section>
            <h3 className="text-xl font-semibold mb-3">Invite your own vendors</h3>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex flex-wrap gap-3 mb-6">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded transition">
                + Add another vendor
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded transition">
                Upload a list of vendors
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded transition">
                Invite your team
              </button>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Find vendors with Webscrape Bot</h4>
              <label className="mr-6 inline-flex items-center space-x-2">
                <input
                  type="radio"
                  name="ws-vendor"
                  checked={!findVendorsWebscrape}
                  onChange={() => setFindVendorsWebscrape(false)}
                  className="form-radio"
                />
                <span>No</span>
              </label>
              <label className="inline-flex items-center space-x-2">
                <input
                  type="radio"
                  name="ws-vendor"
                  checked={findVendorsWebscrape}
                  onChange={() => setFindVendorsWebscrape(true)}
                  className="form-radio"
                />
                <span>Yes, I want to find vendors</span>
              </label>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Find vendors with OpenAI</h4>
              <label className="mr-6 inline-flex items-center space-x-2">
                <input
                  type="radio"
                  name="ai-vendor"
                  checked={!findVendorsOpenAI}
                  onChange={() => setFindVendorsOpenAI(false)}
                  className="form-radio"
                />
                <span>No</span>
              </label>
              <label className="inline-flex items-center space-x-2">
                <input
                  type="radio"
                  name="ai-vendor"
                  checked={findVendorsOpenAI}
                  onChange={() => setFindVendorsOpenAI(true)}
                  className="form-radio"
                />
                <span>Yes, I want to find vendors</span>
              </label>
            </div>
          </section>
        )}

        <button className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded transition duration-200">
          Save
        </button>
      </main>
    </div>
  );
};

export default EventSpeakersVendors;
