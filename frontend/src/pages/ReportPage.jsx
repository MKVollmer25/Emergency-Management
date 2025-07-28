import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API from '../components/API';

function ReportPage() {
  const { id } = useParams()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  API.get(`/get_report/${id}`)
    .then(response => {
      setData(response.data[0]);
      console.log(response.data[0]);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, []);

  return (
    <div class="min-h-screen bg-gray-100 flex space-y-3 flex-col items-center justify-center p-8">
      <Link to="/admin">Back</Link>
      <div class="bg-white p-4 rounded-lg shadow-md w-full items-center justify-center max-w-sm space-y-4">
        <p><strong>ID:</strong> {data.id}</p>
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Category:</strong> {data.category}</p>
        <p><strong>Description:</strong> {data.description}</p>
        <p><strong>Date:</strong> {data.date}</p>
        <p><strong>Location:</strong> {data.location}</p>
        <p><strong>Status:</strong> {data.status}</p>
      </div>
    </div>
  )
}

export default ReportPage
