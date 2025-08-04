import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()
  const userPage = () => {navigate('/dashboard')}
  const adminPage = () => {navigate('/admin')}

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-4xl w-full border border-gray-200">
        <div className="text-center mb-10">
          <div className="flex justify-center items-center space-x-6 mb-6">
            <img src="/rexus.png" className="h-16"></img>
            <div className="h-12 w-px bg-gray-400"></div>
            <img src="/amptier.png" className="h-16"></img>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">RexusOps360<sup className="text-sm">™</sup></h1>
          <p className="text-sm text-gray-500 italic mt-1">Enterprise Emergency &amp; Operations Management</p>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">
            Emergency Management System
          </h1>
          <h2 className="text-2xl font-bold text-gray-500 mb-4">
            City & County of San Francisco
          </h2>
        </div>
        <p className="text-lg text-center text-gray-600">
            Choose your desired dashboard below:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <a href="/dashboard" className="bg-gray-50 hover:bg-green-50 border border-gray-200 rounded-xl p-6 transition shadow-sm hover:shadow-md">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-green-700 mb-2">User Dashboard</h3>
              <p className="text-sm text-gray-600">File a new report or check the status of your previous reports.</p>
            </div>
          </a>
          <a href="/admin" className="bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-xl p-6 transition shadow-sm hover:shadow-md">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Admin Dashboard</h3>
              <p className="text-sm text-gray-600">Manage complaints, monitor data, and oversee operations. (Account required)</p>
            </div>
          </a>
          
        </div>
      </div>
    </div>
  )
}

export default Home
