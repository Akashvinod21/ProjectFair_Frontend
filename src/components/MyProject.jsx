import React, { useContext, useEffect, useState } from 'react'
import AddProject from '../components/AddProject'
import EditProject from '../components/EditProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe,faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { userProjectApi } from '../services/allApi'
import { Link } from 'react-router-dom'
import { addResponseContext, editResponseContext } from '../context/Contextshare'


function MyProject() {

  const {addResponse} = useContext(addResponseContext)
  const {editResponse} = useContext(editResponseContext)

  const[userProject,setUserProject]=useState([])

  const getUserProject =  async()=>{
    const token = sessionStorage.getItem("token")

    const reqHeader = {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }

    const result = await userProjectApi(reqHeader)
    setUserProject(result.data);
    
  } 
  console.log(userProject);
  

  useEffect(()=>{
    getUserProject()
  },[addResponse,editResponse])

  return (
    <>
    <div className="shadow p-3 mb-5">
      <div className="d-flex mt-4">
        <h4 className='me-auto'>My Projects</h4>
        <AddProject/>
      </div>

      {userProject?.length>0?
      userProject?.map((item)=>(
        <div className='bg-info p-3 mt-4 rounded-2 d-flex'>
      <h5>{item.title}</h5>
        <div className='d-flex ms-auto align-items-center'>
            <EditProject project = {item}/>
            <Link to = {item?.website} target='_blank'><FontAwesomeIcon icon={faGlobe} className='ms-3 text-warning'/></Link>
            <Link to = {item?.github} target='_blank'><FontAwesomeIcon icon={faGithub} className='ms-3 text-danger'/></Link>
            <FontAwesomeIcon icon={faTrash} className='ms-3 text-light'/>

        </div>
      </div>
      ))
      :
      <p className='text-center text-danger'>No projects to show</p>
      }
    </div>
    </>
  )
}

export default MyProject