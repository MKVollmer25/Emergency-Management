import { useRef } from 'react';

function AdminLogin() {
  const nameRef = useRef();
  const passRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name: nameRef.current.value,
      password: passRef.current.value
    });
  };

  return (
    <div class="min-h-screen bg-gray-100 flex space-y-3 flex-col items-center justify-center p-8">
      <div class="bg-white p-4 rounded-lg shadow-md w-full items-center justify-center max-w-sm space-y-4">
        <h1 class="text-center font-bold text-2xl">
          Admin Login
        </h1>
        <div>
          <input class="w-full px-4 py-2 border rounded" ref={nameRef} type="username" placeholder='Username' />
        </div>
        <div>
          <input class="w-full px-4 py-2 border rounded" ref={passRef} type="password" placeholder='Password' />
        </div>
        <div>
          <button class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" onClick={handleSubmit}>Log In</button>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
