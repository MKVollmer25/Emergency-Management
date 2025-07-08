import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()
  const userPage = () => {navigate('/dashboard')}
  const adminPage = () => {navigate('/adminlogin')}

  return (
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Emergency Management
        </h1>
        <p class="text-lg text-gray-600">
          Choose your access level below
        </p>
      </div>
      
      <div class="flex flex-col sm:flex-row gap-6 w-full max-w-md">
        <button 
          onClick={userPage}
          class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          User Dashboard
        </button>
        
        <button 
          onClick={adminPage}
          class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Admin Dashboard
        </button>
      </div>
    </div>
  )
}

export default Home
