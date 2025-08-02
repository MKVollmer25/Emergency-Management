import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../components/API';

function capitalizeWords(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function fahrenheit(temp) {
  return (Math.round((temp * (9 / 5) + 32) * 100) / 100)
}

function Dashboard() {
  const [is_visible, setIsVisible] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    API.get('/get_alerts')
      .then(response => {
        setAlerts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    API.get('/weather')
      .then(response => {
        setWeather(response.data);
        console.log(response.data)
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const formatted_date = date.toLocaleDateString("en-US", date_options)
  const formatted_time = date.toLocaleTimeString("en-US", time_options)

  return (
    <>
      <header className="bg-blue-900 text-white shadow-md px-6 py-4 md:py-6">
        San Francisco Emergency Management
      </header>
      <div className="max-w-7xl mx-auto flex justify-between px-4 py-4 items-center">
        <div>{formatted_date}, {formatted_time}</div>
        <Link to='/' className="hover:underline">Back to Login</Link>
      </div>
      <main className="max-w-7xl mx-auto px-4 pb-16 items-center">
        <div>
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-900 p-4 rounded mb-6">
            <p className="text-lg font-semibold">Weather in San Francisco:</p>
            {weather?.data?.main ? (
              <>
                <p>Temperature: {fahrenheit(weather.data.main.temp)} °F ({weather.data.main.temp} °C)</p>
                <p>Conditions: {capitalizeWords(weather.data.weather?.[0]?.description) || 'N/A'}</p>
              </>
            ) : (
              <p>Loading weather data...</p>
            )}
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <a href="/new_report" class="bg-white border-t-4 border-blue-600 rounded-2xl p-6 shadow hover:bg-blue-50">
            <h3 class="text-lg font-bold text-blue-700 mb-2">File a New Report</h3>
            <p class="text-gray-600">Report emergencies quickly and easily.</p>
          </a>
          <a href="/report_tracking" class="bg-white border-t-4 border-green-600 rounded-2xl p-6 shadow hover:bg-green-50">
            <h3 class="text-lg font-bold text-green-700 mb-2">View Your Complaints</h3>
            <p class="text-gray-600">Track the status of your past complaints and get updates.</p>
          </a>
        </div>
        <div class="bg-white p-6 rounded-lg shadow overflow-x-auto mb-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-700">Active Alerts</h2>
          <div className="space-y-4">
            {alerts.map(alert => {
            console.log(alert.severity)
            if (alert.severity == "Minor") {
              return (
              <div key={alert.id} class="bg-white border-t-4 border-amber-500 rounded-2xl p-6 shadow">
                <div className="flex justify-between items-center">
                  <h3 class="text-lg font-bold text-amber-500 mb-2">{alert.headline}</h3>
                  <p>Severity: Minor</p>
                </div>
                <p>{alert.description}</p>
              </div>
              )
            } else if (alert.severity == "Moderate") {
              return (
              <div key={alert.id} class="bg-white border-t-4 border-orange-500 rounded-2xl p-6 shadow">
                <div className="flex justify-between items-center">
                  <h3 class="text-lg font-bold text-orange-500 mb-2">{alert.headline}</h3>
                  <p>Severity: Moderate</p>
                </div>
                <p>{alert.description}</p>
              </div>
              )
            } else {
              return (
              <div key={alert.id} class="bg-white border-t-4 border-red-600 rounded-2xl p-6 shadow">
                <div className="flex justify-between items-center">
                  <h3 class="text-lg font-bold text-red-600 mb-2">{alert.headline}</h3>
                  <p>Severity: Major</p>
                </div>
                <p>{alert.description}</p>
              </div>
              )
            }
            })}
          </div>
        </div>
      </main>
    </>
  )
}

export default Dashboard
