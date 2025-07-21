import React, { useState } from "react";
import {
  FiEdit,
  FiSave,
  FiX,
  FiUpload,
  FiCalendar,
  FiDollarSign,
  FiUsers,
  FiHome,
  FiClock,
} from "react-icons/fi";

const OrganizerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Pramodya Piyumanthi",
    email: "pramodya@example.com",
    phone: "+94 76 123 4567",
    organization: "CodeFest Ltd.",
    position: "Event Director",
    bio: "Passionate about creating engaging tech conferences and fostering developer communities. With over 5 years of experience in event management, I specialize in large-scale tech conferences with 1000+ attendees.",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    eventsCreated: 12,
    revenueGenerated: 125000,
    ticketsSold: 4300,
    stallCount: 32,
    seatCount: 1210,
    memberSince: "2018-06-15",
    rating: 4.8,
    socialMedia: {
      twitter: "@pramodya",
      linkedin: "pramodya-piyumanthi",
    },
  });

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialMediaChange = (platform, value) => {
    setProfile((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value,
      },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // TODO: Add API call here
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto my-10 p-8 bg-white rounded-xl shadow-lg">
      {/* Header with edit button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Organizer Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiEdit /> Edit Profile
          </button>
        )}
      </div>

      {/* Main profile section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left column - Profile image and stats */}
        <div className="md:w-1/3 space-y-6">
          <div className="relative">
            <img
              src={profile.profileImage}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
            />
            {isEditing && (
              <div className="mt-4 text-center">
                <label className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer transition-colors">
                  <FiUpload /> Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Stats card */}
          <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FiCalendar /> Event Statistics
            </h3>
            <div className="space-y-4">
              <ProfileStat
                label="Events Created"
                value={profile.eventsCreated}
                icon={<FiCalendar className="text-sky-500" />}
              />
              <ProfileStat
                label="Revenue Generated"
                value={`LKR ${profile.revenueGenerated.toLocaleString()}`}
                icon={<FiDollarSign className="text-green-500" />}
              />
              <ProfileStat
                label="Tickets Sold"
                value={profile.ticketsSold.toLocaleString()}
                icon={<FiUsers className="text-purple-500" />}
              />
              <ProfileStat
                label="Stalls Allocated"
                value={profile.stallCount}
                icon={<FiHome className="text-amber-500" />}
              />
              <ProfileStat
                label="Seats Allocated"
                value={profile.seatCount.toLocaleString()}
                icon={<FiClock className="text-red-500" />}
              />
            </div>
          </div>

          {/* Member since */}
          <div className="text-center text-sm text-gray-500">
            <p>
              Member since {new Date(profile.memberSince).toLocaleDateString()}
            </p>
            <div className="flex items-center justify-center mt-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(profile.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-gray-600">{profile.rating}</span>
            </div>
          </div>
        </div>

        {/* Right column - Profile details */}
        <div className="md:w-2/3 space-y-6">
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    value={profile.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="block w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    value={profile.position}
                    onChange={(e) => handleChange("position", e.target.value)}
                    className="block w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    value={profile.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="block w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    value={profile.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="block w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization
                </label>
                <input
                  value={profile.organization}
                  onChange={(e) => handleChange("organization", e.target.value)}
                  className="block w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Twitter
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 bg-gray-100 text-gray-500 text-sm">
                      @
                    </span>
                    <input
                      value={profile.socialMedia.twitter.replace("@", "")}
                      onChange={(e) =>
                        handleSocialMediaChange("twitter", `@${e.target.value}`)
                      }
                      className="flex-1 min-w-0 block w-full border rounded-r-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 bg-gray-100 text-gray-500 text-sm">
                      linkedin.com/in/
                    </span>
                    <input
                      value={profile.socialMedia.linkedin}
                      onChange={(e) =>
                        handleSocialMediaChange("linkedin", e.target.value)
                      }
                      className="flex-1 min-w-0 block w-full border rounded-r-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  rows="4"
                  className="block w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  <FiSave /> Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg transition-colors"
                >
                  <FiX /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {profile.name}
                </h2>
                <p className="text-lg text-sky-600 font-medium">
                  {profile.position}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Organization
                  </h3>
                  <p className="text-gray-800">{profile.organization}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                  <p className="text-gray-800">{profile.email}</p>
                  <p className="text-gray-800">{profile.phone}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Social Media
                </h3>
                <div className="flex gap-4 mt-1">
                  {profile.socialMedia.twitter && (
                    <a
                      href={`https://twitter.com/${profile.socialMedia.twitter.replace(
                        "@",
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-600"
                    >
                      Twitter: {profile.socialMedia.twitter}
                    </a>
                  )}
                  {profile.socialMedia.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${profile.socialMedia.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-900"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">About</h3>
                <p className="text-gray-700 mt-1 leading-relaxed">
                  {profile.bio}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileStat = ({ label, value, icon }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

export default OrganizerProfile;
