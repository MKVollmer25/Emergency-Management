import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/userlogin" element={<UserLogin />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
    </Routes>
  )
}

export default App
