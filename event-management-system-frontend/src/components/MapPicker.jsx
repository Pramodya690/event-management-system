// components/MapPicker.js
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';

const MapEvents = ({ setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const MapPicker = ({ value, onChange }) => {
  const [position, setPosition] = useState(value || [20.5937, 78.9629]); // Default: India

  const handlePositionChange = (pos) => {
    setPosition(pos);
    onChange(pos);
  };

  return (
    <div className="h-64 rounded border overflow-hidden">
      <MapContainer
        center={position}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents setPosition={handlePositionChange} />
        <Marker position={position} icon={L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41] })} />
      </MapContainer>
    </div>
  );
};

export default MapPicker;
