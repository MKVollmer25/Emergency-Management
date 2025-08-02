import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../components/API';

function NewAlert() {
  const [severity, setSeverity] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const raw_date = new Date()
    const date = raw_date.toISOString().slice(0,19).replace('T', ' ')
    try {
      await API.post('/new_alert',
        {
          severity,
          headline,
          description
        }
      )
      setSubmitted(true)
      console.log("Submission successful")
    } catch (err) {
      setError(err.response?.data?.error || 'Submission failed');
      console.log("Submission failed")
    }
  };

  return (
    <div>
      {submitted ? (
        <div className="min-h-screen bg-gray-100 flex space-y-3 flex-col items-center justify-center p-8">
          <p>Alert Submitted</p>
          <Link to="/admin" className="hover:underline">Back</Link>
        </div>
      ) : (
      <div class="min-h-screen bg-gray-100 flex space-y-3 flex-col items-center justify-center p-8">
        <Link to="/admin" className="hover:underline">Back</Link>
        <div class="bg-white p-4 rounded-lg shadow-md w-full items-center justify-center max-w-sm space-y-4">
          <h1 class="text-center font-bold text-2xl">
            Create New Alert
          </h1>
          <div>
            <label class="block text-sm font-semibold">Severity</label>
            <select class="w-full px-4 py-2 border rounded"
            name="severity"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            required>
              <option value="">---Select---</option>
              <option value="Minor">Minor</option>
              <option value="Moderate">Moderate</option>
              <option value="Major">Major</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold">Headline</label>
            <input class="w-full px-4 py-2 border rounded"
            name="headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
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
            <button class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" onClick={handleSubmit}>Create</button>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default NewAlert
