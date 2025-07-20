import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Dashboard() {
  const [is_visible, setIsVisible] = useState(false);

  const toggleSection = () => {
    setIsVisible((prev) => !prev);
  };

  const date = new Date()

  const date_options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  const time_options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  }

  const formatted_date = date.toLocaleDateString("en-US", date_options)
  const formatted_time = date.toLocaleTimeString("en-US", time_options)

  return (
    <>
      <header className="bg-blue-900 text-white shadow-md px-6 py-4 md:py-6">
        WIP
      </header>
      <div className="max-w-7xl mx-auto flex justify-between px-4 py-4 items-center">
        <div>{formatted_date}, {formatted_time}</div>
        <div>BUTTONS</div>
      </div>
      <main className="max-w-7xl mx-auto px-4 pb-16 items-center">
        <div>
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-900 p-4 rounded mb-6">
            <p className="text-lg font-semibold">Weather in San Francisco:</p>
            <p>Temperature: WIP</p>
            <p>Conditions: WIP</p>
          </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow mb-6">
          <p class="text-lg font-semibold text-gray-700">Total Complaints Filed: WIP</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <a href="/new-complaint" class="bg-white border-t-4 border-blue-600 rounded-2xl p-6 shadow hover:bg-blue-50">
            <h3 class="text-lg font-bold text-blue-700 mb-2">File a New Complaint</h3>
            <p class="text-gray-600">Report emergencies quickly and easily.</p>
          </a>
          <a class="bg-white border-t-4 border-green-600 rounded-2xl p-6 shadow hover:bg-green-50">
            <h3 class="text-lg font-bold text-green-700 mb-2">View Your Complaints</h3>
            <p class="text-gray-600">Track the status of your past complaints and get updates.</p>
          </a>
        </div>
        <div class="bg-white p-6 rounded-lg shadow overflow-x-auto mb-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-700">Report History</h2>
        </div>
        <div class="text-center my-8">
          <button id="toggleTrendsBtn" class="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition" onClick={toggleSection}>
            {is_visible ? 'Hide Past Data' : 'Show Past Data'}
          </button>
        </div>
        {is_visible && (
          <div>
            <div class="bg-white p-6 rounded-lg shadow mb-6">
              <p class="text-lg font-semibold text-gray-700">WIP</p>
            </div>
          </div>
        )}
        <div class="bg-white p-6 rounded-lg shadow overflow-x-auto mb-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-700">Report Map</h2>
          <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-lg">
            <MapContainer center={[47.6062, -122.3321]} zoom={13} className="h-full w-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[47.6062, -122.3321]}>
                <Popup>
                  Seattle, WA
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </main>
    </>
  )
}

export default Dashboard
