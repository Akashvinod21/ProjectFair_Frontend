import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'

function Dashboard() {

  const [user,setUser] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      setUser(JSON.parse(sessionStorage.getItem("existingUser")))
      
    }

  },[])

  return (
    <>
    <Header/>
    <div className="container-fluid p-5">
      <h2 className='my-4 ms-3'>welcome<span className='text-danger ms-2'>{user.username}</span></h2>
      <div className="row">
        <div className="col-md-8 px-md-5">
          <MyProject/>
        </div>
        <div className="col-md-4 px-md-5">
          <Profile/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard