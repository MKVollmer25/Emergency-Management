import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import ProtectedRoute from './components/ProtectedRoute'
import NewReport from './pages/NewReport'
import CategoryDashboard from './pages/CategoryDashboard'
import ReportPage from './pages/ReportPage'
import ReportTracking from './pages/ReportTracking'
import NewAlert from './pages/NewAlert';
import NewUser from './pages/NewUser';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      <Route path="/new_report" element={<NewReport />} />
      <Route path="/report_tracking" element={<ReportTracking />} />
      <Route path="/category/:category" element={<ProtectedRoute><CategoryDashboard /></ProtectedRoute>} />
      <Route path="/report/:id" element={<ProtectedRoute><ReportPage /></ProtectedRoute>} />
      <Route path="/new_alert" element={<ProtectedRoute><NewAlert /></ProtectedRoute>} />
      <Route path="/new_user" element={<ProtectedRoute><NewUser /></ProtectedRoute>} />
    </Routes>
  )
}

export default App
