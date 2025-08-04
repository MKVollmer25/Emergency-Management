import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../components/API';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/login', { username, password });
      localStorage.setItem("token", res.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex space-y-3 flex-col items-center justify-center p-8">
      <Link to="/" className="hover:underline">Back</Link>
      <div className="bg-white p-4 rounded-lg shadow-md w-full items-center justify-center max-w-sm space-y-4">
        <h1 className="text-center font-bold text-2xl">
          Admin Login
        </h1>
        <div>
          <input className="w-full px-4 py-2 border rounded" 
          type="user" placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required />
        </div>
        <div>
          <input className="w-full px-4 py-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required/>
        </div>
        <div>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" onClick={handleSubmit}>Log In</button>
        </div>
        {error && <p className="text-red-500 text-sm text-center">Login failed</p>}
      </div>
    </div>
  )
}

export default AdminLogin
