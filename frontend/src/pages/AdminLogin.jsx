import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../components/Auth';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthAPI.post('/login', { username, password });
      localStorage.setItem("token", res.data.token);
      console.log("Token:", localStorage.getItem("token"));
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      console.log("Login failed")
    }
  };

  return (
    <div class="min-h-screen bg-gray-100 flex space-y-3 flex-col items-center justify-center p-8">
      <div class="bg-white p-4 rounded-lg shadow-md w-full items-center justify-center max-w-sm space-y-4">
        <h1 class="text-center font-bold text-2xl">
          Admin Login
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
          <button class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" onClick={handleSubmit}>Log In</button>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
