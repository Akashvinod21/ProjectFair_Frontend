import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { faFilm,faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom';
import { isLoginAuthContext } from '../context/Contextshare';

function Header() {
const navigate = useNavigate()
const [token,setToken] = useState((""))
const {setIsLoginStatus} = useContext(isLoginAuthContext)

  const logout=()=>{
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setIsLoginStatus(false)
    navigate('/')
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])
  return (
    <>
    <div>
    <Navbar className="bg-success p-4">
        <Container>
          <Navbar.Brand>
           <Link to={'/'} className='text-decoration-none'><h4 className='text-light fw-bold'><FontAwesomeIcon icon={faFilm} className='fa-1x me-3'/>ProjectHive</h4></Link>
          </Navbar.Brand>

          {token && <button className='btn btn-warning text-dark fw-bold' onClick={logout}><FontAwesomeIcon icon={faPowerOff} className='me-3'/>Log Out</button>}
        </Container>
      </Navbar>
    </div>
    </>
  )
}

export default Header