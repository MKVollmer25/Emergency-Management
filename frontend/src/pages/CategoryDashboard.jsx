import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API from '../components/API';

function CategoryDashboard() {
  const { category } = useParams()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const category_name = category.charAt(0).toUpperCase() + category.slice(1)

  console.log(category_name)

  useEffect(() => {
  API.get(`/category_data/${category_name}`)
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

  return (
  <div class="min-h-screen bg-gray-100 flex space-y-3 flex-col items-center justify-center p-8">
    <Link to="/admin" className="hover:underline">Back</Link>
    <div class="bg-white p-4 rounded shadow mb-6 text-lg font-semibold">
      <h2 class="text-lg font-semibold mb-2">{category_name} Reports</h2>
      <table className="table-auto border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
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
  </div>
  )
}

export default CategoryDashboard
