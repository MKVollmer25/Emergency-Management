import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater } from '@fortawesome/free-solid-svg-icons';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { faToilet } from '@fortawesome/free-solid-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../components/API';

function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    API.get('/get_data')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const date = new Date()
  const navigate = useNavigate()

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

  const isAuthenticated = () => {
    const token = localStorage.getItem('token')
    console.log(token)
    return token != null // or add extra checks like token expiration
  };

  const handleLogout = () => {
    console.log("Token before logout:", localStorage.getItem("token"));
    console.log(isAuthenticated())
    localStorage.removeItem('token')
    console.log("Logout request")
    console.log("Token after logout:", localStorage.getItem("token"));
  }

  const viewReport = (id) => {
    navigate("/report/" + id)
  }

  const formatted_date = date.toLocaleDateString("en-US", date_options)
  const formatted_time = date.toLocaleTimeString("en-US", time_options)

  return (
    <>
      <header className="bg-blue-900 text-white shadow-md px-6 py-4 md:py-6">
        {isAuthenticated() ? "Valid login" : "Invalid login"}
      </header>
      <div className="max-w-7xl mx-auto flex justify-between px-4 py-4">
        <div>{formatted_date}, {formatted_time}</div>
        <div>
          <Link to='/' className="hover:underline" onClick={handleLogout}>Log out</Link>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 pb-16">
        <div>
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-900 p-4 rounded mb-6">
            <p className="text-lg font-semibold">Weather in San Francisco:</p>
            <p>Temperature: WIP</p>
            <p>Conditions: WIP</p>
          </div>
        </div>
        <div className="grid grid-cols-3 grid-rows-2 gap-6 mb-8">
          <a href="/category/flood" class="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg hover:border-blue-500 transition-all duration-300 group">
            <div class="mb-2 text-center">
              <FontAwesomeIcon icon={faWater} size="2x" color="#999999" />
              <h2 class="text-lg font-semibold text-gray-800 group-hover:text-blue-600">Flood Dashboard</h2>
              <p class="text-sm text-gray-600">Live flood incident tracking</p>
            </div>
            <div class="mt-2 text-right">
              <span class="text-sm text-blue-500 font-medium group-hover:underline">View →</span>
            </div>
          </a>
          <a href="/category/fire" class="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg hover:border-blue-500 transition-all duration-300 group">
            <div class="mb-2 text-center">
              <FontAwesomeIcon icon={faFire} size="2x" color="#FF7700" />
              <h2 class="text-lg font-semibold text-gray-800 group-hover:text-blue-600">Fire Dashboard</h2>
              <p class="text-sm text-gray-600">Live fire incident tracking</p>
            </div>
            <div class="mt-2 text-right">
              <span class="text-sm text-blue-500 font-medium group-hover:underline">View →</span>
            </div>
          </a>
          <a href="/category/water" class="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg hover:border-blue-500 transition-all duration-300 group">
            <div class="mb-2 text-center">
              <FontAwesomeIcon icon={faDroplet} size="2x" color="#0000FF" />
              <h2 class="text-lg font-semibold text-gray-800 group-hover:text-blue-600">Water Dashboard</h2>
              <p class="text-sm text-gray-600">Live water incident tracking</p>
            </div>
            <div class="mt-2 text-right">
              <span class="text-sm text-blue-500 font-medium group-hover:underline">View →</span>
            </div>
          </a>
          <a href="/category/sewer" class="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg hover:border-blue-500 transition-all duration-300 group">
            <div class="mb-2 text-center">
              <FontAwesomeIcon icon={faToilet} size="2x" color="#993333" />
              <h2 class="text-lg font-semibold text-gray-800 group-hover:text-blue-600">Sewer Dashboard</h2>
              <p class="text-sm text-gray-600">Live sewer incident tracking</p>
            </div>
            <div class="mt-2 text-right">
              <span class="text-sm text-blue-500 font-medium group-hover:underline">View →</span>
            </div>
          </a>
          <a href="/category/electrical" class="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg hover:border-blue-500 transition-all duration-300 group">
            <div class="mb-2 text-center">
              <FontAwesomeIcon icon={faBolt} size="2x" color="#D8D800" />
              <h2 class="text-lg font-semibold text-gray-800 group-hover:text-blue-600">Electrical Dashboard</h2>
              <p class="text-sm text-gray-600">Live electrical incident tracking</p>
            </div>
            <div class="mt-2 text-right">
              <span class="text-sm text-blue-500 font-medium group-hover:underline">View →</span>
            </div>
          </a>
          <a href="/category/misc" class="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg hover:border-blue-500 transition-all duration-300 group">
            <div class="mb-2 text-center">
              <FontAwesomeIcon icon={faCircleQuestion} size="2x" color="#555555" />
              <h2 class="text-lg font-semibold text-gray-800 group-hover:text-blue-600">Miscellaneous Dashboard</h2>
              <p class="text-sm text-gray-600">Live miscellaneous incident tracking</p>
            </div>
            <div class="mt-2 text-right">
              <span class="text-sm text-blue-500 font-medium group-hover:underline">View →</span>
            </div>
          </a>
        </div>
        <div class="bg-white p-4 rounded shadow mb-6 text-lg font-semibold">
          Total Incidents: <span class="text-blue-600">WIP</span>
        </div>
        <div class="grid grid-cols-2 grid-rows-2 gap-6 mb-6">
          <div class="bg-white p-4 rounded shadow">
            <h2 class="text-lg font-semibold mb-2">By Category</h2>
          </div>
          <div class="bg-white p-4 rounded shadow">
            <h2 class="text-lg font-semibold mb-2">Over Time</h2>
          </div>
          <div class="bg-white p-4 rounded shadow">
            <h2 class="text-lg font-semibold mb-2">By Status</h2>
          </div>
          <div class="bg-white p-4 rounded shadow">
            <h2 class="text-lg font-semibold mb-2">By Location</h2>
          </div>
        </div>
        <div class="bg-white p-4 rounded shadow mb-6 text-lg font-semibold">
          <h2 class="text-lg font-semibold mb-2">Recent Reports</h2>
          <table className="table-auto border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Severity</th>
                <th className="border px-4 py-2">Location</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">View</th>
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr key={row.id}>
                  <td className="border px-4 py-2">{row.id}</td>
                  <td className="border px-4 py-2">{row.name}</td>
                  <td className="border px-4 py-2">{row.phone}</td>
                  <td className="border px-4 py-2">{row.category}</td>
                  <td className="border px-4 py-2">{row.severity}</td>
                  <td className="border px-4 py-2">{row.location}</td>
                  <td className="border px-4 py-2">{row.date}</td>
                  <td className="border px-4 py-2">{row.description}</td>
                  <td className="border px-4 py-2">{row.status}</td>
                  <td className="border px-4 py-2">
                    <Link className="hover:underline" to={"/report/" + row.id}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export default Admin
