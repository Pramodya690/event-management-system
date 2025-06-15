import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fixing the default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function LocationMarker({ setCoordinates }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const coords = e.latlng;
      setPosition(coords);
      setCoordinates(coords);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function MapPicker({ setCoordinates }) {
  return (
    <div style={{ height: '300px', width: '100%', marginTop: '1rem' }}>
      <MapContainer
        center={[20.5937, 78.9629]} // India center by default
        zoom={5}
        style={{ height: '100%', width: '100%', borderRadius: '8px' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker setCoordinates={setCoordinates} />
      </MapContainer>
    </div>
  );
}
