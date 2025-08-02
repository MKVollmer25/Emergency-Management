import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API from '../components/API';

function ReportPage() {
  const { id } = useParams()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("")
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)

  useEffect(() => {
  API.get(`/get_report/${id}`)
    .then(response => {
      setData(response.data[0]);
      console.log(response.data[0]);
      setStatus(response.data[0].status);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, []);

  const handleStatus = async (e) => {
    const newStatus = e.target.value
    setStatus(newStatus)
    console.log(newStatus)
    try {
      await API.post('/update_data', { newStatus, id })
      console.log("Update successful")
    } catch (err) {
      setError(err.response?.data?.error || 'Submission failed');
      console.log("Update failed")
    }
  }

  const handleDelete = async () => {
    console.log("Delete")
    try {
      await API.post('/delete_data', { id })
      console.log("Delete successful")
    } catch (err) {
      setError(err.response?.data?.error || 'Delete failed');
      console.log("Delete failed")
    }
  }

  const toggleDelete = () => {
    setDeleteConfirmation(!deleteConfirmation)
  }

  return (
    <div class="min-h-screen bg-gray-100 flex space-y-3 flex-col items-center justify-center p-8">
      <Link to="/admin" className="hover:underline">Back</Link>
      <div class="bg-white p-4 rounded-lg shadow-md w-full items-center justify-center max-w-sm space-y-4">
        <p><strong>ID:</strong> {data.id}</p>
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Category:</strong> {data.category}</p>
        <p><strong>Description:</strong> {data.description}</p>
        <p><strong>Date:</strong> {data.date}</p>
        <p><strong>Location:</strong> {data.location}</p>
        <p><strong>Status:</strong>
        <select class="ml-2 px-4 py-2 border rounded"
          name="status"
          value={status}
          onChange={handleStatus}
          required>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </p>
      </div>
      <div>
      {deleteConfirmation
      ? <div className="flex gap-4">
          <Link to="/admin" className="hover:underline" onClick={handleDelete}>Yes</Link>
          <Link className="hover:underline" onClick={toggleDelete}>No</Link>
        </div>
      : <Link className="hover:underline" onClick={toggleDelete}>Delete Report</Link>}
      </div>
    </div>
  )
}

export default ReportPage
