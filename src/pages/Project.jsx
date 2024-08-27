import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { allProjectsApi } from '../services/allApi'


function Project() {
  const[isToken,setIsToken]= useState("")
  const[allProject,setAllProject]=useState([])
  const[searchKey,setSearchKey]=useState("")

  const getAllProject = async(searchKey)=>{
    const result = await allProjectsApi(searchKey)
    setAllProject(result.data);
    }
    console.log(allProject);
    
  useEffect(()=>{
    getAllProject(searchKey)
  },[searchKey])


  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsToken(sessionStorage.getItem("token"))
    }
    
  },[])

  return (
    <>
    <Header/>
    <div className="container-fluid">
      <h1 className='text-center mt-5'>All Projects</h1>

      {/* all projects when logged in */}
    {isToken?  <div>
        <div className="row my-4">
          <div className="col-md-4"></div>
          <div className="col-md-4 d-flex">
            <input type="text" className='form-control' placeholder='Technologies' onChange={(e)=>setSearchKey(e.target.value)}/>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='fa-1x' style={{marginLeft:"-50px", marginTop:"12px"}}/>
            
          </div>
          <div className="col-md-4"></div>
        </div>
  
        <div className="row my-5">
        {allProject?.length>0?
        allProject?.map((item)=>(
          <div className="col-md-4 p-4">
          <ProjectCard project={item}/>
        </div>
        ))
        
        :
        <p className='text-center text-danger ms-5'>No Projects to show</p>
        }
        
      </div>
    </div>

    :

    
    <div className='mt-5 row'>
      <div className="col-md-4"></div>
      <div className="col-md-4 p-4 d-flex justify-content-center align-items-center flex-column">
        <img src="https://cdn.dribbble.com/users/1221613/screenshots/19649968/media/3e1749f9eb6cbdb37636931e8435e296.gif" alt="no image" width={"100%"} height={"400px"}/>
        <h4 className='mt-4'>Please <Link to={'/login'} className='text-danger'> Login</Link> to Explore more projects</h4>
      </div>
      <div className="col-md-4"></div>
    </div>}


    </div>

    
    </>
  )
}

export default Project