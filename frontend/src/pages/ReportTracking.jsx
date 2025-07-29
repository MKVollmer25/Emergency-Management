import { useState } from 'react';
import { Link,useParams } from 'react-router-dom';
import API from '../components/API';

function ReportTracking() {
  const [phone, setPhone] = useState('')
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const handlePhone = (e) => {
    const input = e.target.value;
    const filtered = input.replace(/[^0-9]/g, ''); // allow letters and spaces only
    setPhone(filtered);
  };

  const getReports = () => {
    API.get(`/get_user_reports/${phone}`)
    .then(response => {
      setData(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setError(error);
      setLoading(false);
    });
  }

  return (
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
    <Link to="/admin">Back</Link>
    <div class="bg-white p-4 space-y-3 rounded shadow mb-6 text-lg font-semibold">
      <div>
        <input class="w-full px-4 py-2 border rounded" 
        type="phone" placeholder="Phone Number"
        value={phone}
        onChange={handlePhone}
        required />
      </div>
      <div>
        <button class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" onClick={getReports}>Get Reports</button>
      </div>
      <h2 class="text-lg font-semibold mb-2">Reports</h2>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default ReportTracking
