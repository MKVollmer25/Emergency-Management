import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import API from '../components/API';

// 🔹 Marker that updates on map click
function LocationMarker({ onSelect, selectedLocation }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    }
  });

  return selectedLocation ? <Marker position={selectedLocation} /> : null;
}

// 🔹 Button that uses the map instance
function LocateControl({ shouldLocate, onLocated, clearTrigger }) {
  const map = useMap();

  useEffect(() => {
    if (!shouldLocate) return;

    if (!navigator.geolocation) {
      alert('Geolocation not supported.');
      clearTrigger();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latlng = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        map.flyTo(latlng, 16);
        onLocated(latlng);
        clearTrigger();
      },
      (err) => {
        alert('Failed to retrieve location.');
        console.error(err);
        clearTrigger();
      }
    );
  }, [shouldLocate, map, onLocated, clearTrigger]);

  return null;
}

function NewComplaint() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [severity, setSeverity] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [shouldLocate, setShouldLocate] = useState(false);
  const navigate = useNavigate();

  const handleLocate = () => setShouldLocate(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const raw_date = new Date()
    const date = raw_date.toISOString().slice(0,19).replace('T', ' ')
    const status = "Open"
    console.log("Category:")
    console.log(category)
    try {
      await API.post('/post_data',
        {
          name,
          phone,
          category,
          severity,
          location,
          date,
          description,
          status
        }
      )
      console.log("Submission successful")
    } catch (err) {
      setError(err.response?.data?.error || 'Submission failed');
      console.log("Submission failed")
    }
  };

  const handlePhone = (e) => {
    const input = e.target.value;
    const filtered = input.replace(/[^0-9]/g, ''); // allow letters and spaces only
    setPhone(filtered);
  };

  const handleMapLoad = (mapInstance) => {
    mapRef.current = mapInstance
    console.log("Map load function")
  }

  const severityFilter = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  }

  const handleSeverity = (e) => {
    const val = e.target.value;
    // Allow blank input
    if (val == "") {
      setSeverity("");
    } else {
      // Convert to number and clamp between 1 and 5
      const num = Number(val);
      if (!isNaN(num) && Number.isInteger(num) && num >= 1 && num <= 5) {
        setSeverity(num);
      }
    }
  };

  return (
    <div class="min-h-screen bg-gray-100 flex space-y-3 flex-col items-center justify-center p-8">
      <div class="bg-white p-4 rounded-lg shadow-md w-full items-center justify-center max-w-sm space-y-4">
        <h1 class="text-center font-bold text-2xl">
          File New Report
        </h1>
        <div>
          <label class="block text-sm font-semibold">Name</label>
          <input class="w-full px-4 py-2 border rounded" 
          name="user"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required />
        </div>
        <div>
          <label class="block text-sm font-semibold">Phone Number</label>
          <input class="w-full px-4 py-2 border rounded"
          name="phone"
          value={phone}
          onChange={handlePhone}
          required/>
        </div>
        <div>
          <label class="block text-sm font-semibold">Category</label>
          <select class="w-full px-4 py-2 border rounded"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required>
            <option value="">---Select---</option>
            <option value="Flood">Flood</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Sewer">Sewer</option>
            <option value="Electrical">Electrical</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold">Severity</label>
          <input class="w-full px-4 py-2 border rounded"
          name="severity"
          type="number"
          min="1"
          max="5"
          step="1"
          value={severity}
          onChange={handleSeverity}
          onKeyDown={severityFilter}
          required />
        </div>
        <div>
          <label class="block text-sm font-semibold">Description</label>
          <textarea class="w-full px-4 py-2 border rounded"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required />
        </div>
        <div>
          <label class="block text-sm font-semibold">Location Description</label>
          <textarea class="w-full px-4 py-2 border rounded"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required />
        </div>
        <div>
          <label class="block text-sm font-semibold">Map Location</label>
          <button onClick={handleLocate}>
            📍 Find My Location
          </button>
          <MapContainer
          center={[37.7749, -122.4194]}
          zoom={13}
          style={{ height: '400px', width: '100%' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker onSelect={setSelectedLocation} />
            {selectedLocation && <Marker position={selectedLocation} />}
            <LocateControl
              shouldLocate={shouldLocate}
              onLocated={setSelectedLocation}
              clearTrigger={() => setShouldLocate(false)}
            />
          </MapContainer>
        </div>
        <div>
          <button class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default NewComplaint

