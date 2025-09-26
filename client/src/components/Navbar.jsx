import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.css';
const Navbar = () => {

  const navigate = useNavigate();
  const [name, setName] = useState('')
  useEffect(() => {
    const handleName = async () => {
      try {
        const url = 'http://localhost:8080/api/me'
        const token = localStorage.getItem("Tokens");

        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
            'Content-type': 'application/type'
          }
        })
        const result = await res.json();
        console.log(result)
        setName(result.userName.toUpperCase());
      } catch (error) {
        console.log(error)
      }
    }
    handleName();
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('Tokens');
    navigate('/login');
  }


  return (
    <>
      <div className='navbar'>
        <div className="left">
          <h2>Welcome! {name}</h2>
        </div>
        <div className="right">
          <button onClick={() => navigate('/create')}>Add</button>
          <button onClick={handleLogout}>logout</button>
        </div>
      </div>
    </>
  )
}

export default Navbar
