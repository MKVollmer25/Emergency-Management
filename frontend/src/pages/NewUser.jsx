import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../components/API';

function NewUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/register', {username, password})
      setSubmitted(true)
      console.log("Registration successful")
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      console.log("Registration failed")
    }
  };

  return (
    <div>
      {submitted ? (
        <div className="min-h-screen bg-gray-100 flex space-y-3 flex-col items-center justify-center p-8">
          <p>User Created</p>
          <Link to="/admin" className="hover:underline">Back</Link>
        </div>
      ) : (
      <div class="min-h-screen bg-gray-100 flex space-y-3 flex-col items-center justify-center p-8">
        <Link to="/admin" className="hover:underline">Back</Link>
        <div class="bg-white p-4 rounded-lg shadow-md w-full items-center justify-center max-w-sm space-y-4">
          <h1 class="text-center font-bold text-2xl">
            Create New User
          </h1>
          <div>
            <input class="w-full px-4 py-2 border rounded" 
            type="user" placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required />
          </div>
          <div>
            <input class="w-full px-4 py-2 border rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required/>
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

export default NewUser
