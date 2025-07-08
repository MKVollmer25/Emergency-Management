import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const userPage = () => {navigate('/dashboard')}
  const adminPage = () => {navigate('/adminlogin')}

  return (
    <>
      <h1>Emergency Management System</h1>
      <div>
        <button onClick={userPage}>
          User Dashboard
        </button>
      </div>
      <div>
        <button onClick={adminPage}>
          Admin Dashboard
        </button>
      </div>
    </>
  )
}

export default Home
