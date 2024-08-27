import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allApi';
import { addResponseContext } from '../context/Contextshare';

function AddProject() {

  const {setAddResponse} = useContext(addResponseContext)

  const [show, setShow] = useState(false);
  const [projectDetails,setProjectDetails] = useState({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectImg:""
  })
  const [preview,setPreview]=useState("")

  const handleClose = () => {setShow(false);
    handleClose1()
  }
  const handleShow = () => setShow(true);

  console.log(projectDetails);
  

  const handleFile=(e)=>{
    setProjectDetails({...projectDetails,projectImg:e.target.files[0]})
  }
  useEffect(()=>{
    if(projectDetails.projectImg){
      setPreview(URL.createObjectURL(projectDetails.projectImg))
    }
  },[projectDetails.projectImg])

  const handleClose1=()=>{
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
  const handleAdd = async()=>{
    const {title,language,github,website,overview,projectImg} = projectDetails

    if(!title||!language||!github||!website||!overview||!projectImg){
      toast.info('Please fill form completely')
    }
    else{
      //formdata - because it have uploaded content
      //1)create an object
      const reqBody = new FormData()

      //2) append() - to add new data to the object
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImg",projectImg)

      const token = sessionStorage.getItem("token")

      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        const result = await addProjectApi(reqBody,reqHeader)
        console.log(result);
        

        if(result.status==200){
          setAddResponse(result.data)
          toast.success('Project added succesfully')
          handleClose()
        }
        else{
          toast.danger('Something went wrong')
          handleClose()
        }
      }


        
        

    }
  }

  return (
    <>
    <button className='btn btn-success' onClick={handleShow}>Add Project</button>

    <Modal show={show} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Projects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor='projImg'>
                <input type="file" id='projImg' style={{display:"none"}} key={preview} onChange={(e)=>handleFile(e)}/>
                <img src={preview?preview:"https://analyticsindiamag.com/wp-content/uploads/2020/01/top-10-DS-projects.png"} alt="" width={'100%'}/>
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
          <Button variant="danger" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoclose={1000} theme="colored" position="top-center"/>
    </>
  )
}

export default AddProject