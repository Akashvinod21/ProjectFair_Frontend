import React, { useEffect, useState } from 'react'
import { Row,Col} from 'react-bootstrap'
import pic from '../assets/i13.png'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectsApi } from '../services/allApi'

function Home() {
  const [token,setToken]= useState("")
  const [homeProject,setHomeProject]=useState([])

  const getHomeProject = async()=>{
    const result = await homeProjectsApi()
    setHomeProject(result.data);
  }
  console.log(homeProject);
  

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
    getHomeProject()
  },[])

  

  return (
    <>
    <div className='container-fluid bg-info p-4 mb-4'style={{width:"100%", height:"100vh"}}>
      <Row className='mt-5'>
        <Col md={6} className='d-flex justify-content-center align-items-center flex-column'>
        <div>
          <h1 className='text-dark'>ProjectHive</h1>
          <h5 className='text-dark'>Pause your works for playing these works</h5>
          {!token?<Link to={'/login'}><button className='btn btn-outline-danger my-4'>Get Started</button></Link>:
          <Link to={'/dashboard'}><button className='btn btn-outline-dark my-4 ms-2'>Manage Projects</button></Link>}
        </div>
        </Col>

        <Col md={6} className='mt-4 d-flex justify-content-center align-items-center flex-column'>
        <img src={pic} alt="no image" width={"80%"}/>
        </Col>
      </Row>
    </div>

    <div className="container-fluid">
      <h1 className='my-5 text-center'>Explore Our Projects</h1>
      <div className="row mb-5">
       {homeProject?.length>0? 
        homeProject?.map((item)=>(
          <div className="col-md-4 justify-content-center d-flex p-4">
          <ProjectCard project={item}/>
        </div>
        ))
        : null}
        
      </div>
      <Link to={'/project'}><h5 className='my-5 text-center'>See More Projects</h5></Link>
    </div>
    </>
  )
}

export default Home