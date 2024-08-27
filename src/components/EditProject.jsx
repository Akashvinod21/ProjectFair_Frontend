import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editUserApi } from '../services/allApi';
import { editResponseContext } from '../context/Contextshare';


function EditProject({project}) {
  const {setEditResponse} = useContext(editResponseContext)
  console.log(project);
  
  const [projectDetails,setProjectDetails] = useState({
    title:project.title,
    language:project.language,
    github:project.github,
    website:project.website,
    overview:project.overview,
    projectImg:""
  })

  const [preview,setPreview]=useState("")
  
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false)
    handleCancel()
  };
  const handleShow = () => setShow(true);

  const handleFile =(e)=>{
    setProjectDetails({...projectDetails,projectImg:e.target.files[0]})
  }

  const handleCancel=()=>{
    setProjectDetails({
      title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectImg:""
    })
    setPreview("")
  }

  useEffect(()=>{
    if(projectDetails.projectImg){
      setPreview(URL.createObjectURL(projectDetails.projectImg))
    }
  },[projectDetails.projectImg])

  const handleEdit = async()=>{
    const{title,language,github,website,overview,projectImg}=projectDetails
    if(!title || !language || !github ||!website || !overview){
      toast.info('Please fill the details completely')
    }
    else{
      //API
      //formdata - because it have uploaded content
      //1)create an object
      const reqBody = new FormData()

      //2) append() - to add new data to the object
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      preview?reqBody.append("projectImg",projectImg):reqBody.append("projectImg",project.projectImg)

      const token = sessionStorage.getItem("token")
      if(token){
        if(preview){
          const reqHeader = {
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
          const result = await editUserApi(project._id,reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            toast.success('Updated Successfully')
            handleClose()
            setEditResponse(result.data)
          }
          else{
            toast.error('Something went wrong')
            handleClose()
          }
          
        }
        else{
          const reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
          const result = await editUserApi(project._id,reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            toast.success('Updated Successfully')
            handleClose()
            setEditResponse(result.data)
          }
          else{
            toast.error('Something went wrong')
            handleClose()
          }
        }
      }

    }
  }

   
  return (
    <>

      <FontAwesomeIcon icon={faPenToSquare} className='text-dark' onClick={handleShow}/>

     <Modal show={show} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Projects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor='projImg'>
                <input type="file" id='projImg' style={{display:"none"}} key={preview} onChange={(e)=>handleFile(e)}/>
                <img src={preview?preview:`${serverUrl}/uploads/${project?.projectImg}`} alt="" width={'100%'}/>
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <input type="text" placeholder='Title' className='form-control' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}/>
              </div>
              <div className="mb-3">
              <input type="text" placeholder='Language' className='form-control' value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}/>
              </div>
              <div className="mb-3">
              <input type="text" placeholder='GitHub' className='form-control' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}/>
              </div>
              <div className="mb-3">
              <input type="text" placeholder='Website' className='form-control' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}/>
              </div>
              <div className="mb-3">
              <textarea placeholder='Overview' rows={5} className='form-control' value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}/>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleEdit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoclose={1000} theme="colored" position="top-center"/>
    </>
  )
}

export default EditProject