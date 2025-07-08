import { useRef } from 'react';

function AdminLogin() {
  const nameRef = useRef();
  const emailRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name: nameRef.current.value,
      email: emailRef.current.value
    });
  };

  return (
    <>
      <div>
        <input ref={nameRef} type="text" placeholder='Username' />
      </div>
      <div>
        <input ref={emailRef} type="email" placeholder='Password' />
      </div>
      <div>
        <button onClick={handleSubmit}>Login</button>
      </div>
    </>
  )
}

export default AdminLogin
