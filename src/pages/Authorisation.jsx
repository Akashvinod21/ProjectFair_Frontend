import React, { useContext, useState } from 'react'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isLoginAuthContext } from '../context/Contextshare'


function Authorisation({register}) {
  const navigate = useNavigate()
  const {setIsLoginStatus} = useContext(isLoginAuthContext)

  const[userDetails,setUserDetails]=useState({
    username:"",
    email:"",
    password:""
  })

  const handleRegister = async(e)=>{
    e.preventDefault()
    
    const {username,email,password} = userDetails
    if(!username||!email||!password){
      toast.info('Please fill the form completely')
    }
    else{
      const result = await registerApi(userDetails)
      console.log(result);
      if(result.status==200){
        toast.success('Registration successful')
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
        navigate('/login')
      }
      else{
        toast.error('Something went wrong')
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
       
      }
    }

    
  }
  console.log(userDetails);

  const handleLogin = async(e) =>{
    e.preventDefault()
    const {email,password}=userDetails

    if(!email || !password){
      toast.info('Please fill the form completely')
    }
    else{
      const result = await loginApi({email,password})
      console.log(result);
      if(result.status==200){
        toast.success('Login successfull')
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)
        setIsLoginStatus(true)
        navigate('/')
      }
      else{
        toast.error('Something went wrong')
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
      }
    }
  }


  

  return (
    <>
    <div className='d-flex align-items-center justify-content-center container-fluid'>
      <div className="row w-100"  >
        <div className="col-md-2"></div>
        <div className="col-md-8 my-5">
          <Link to={'/'}><h4>Back to Home</h4></Link>
            <div className='bg-success p-3'>
              <div className="row">
                <div className="col-md-6 p-4 d-flex justify-content-center align-items-center">
                  <img src="https://songsofsyx.com/wiki/images/9/9e/Lock_icon.png" alt="" width={'60%'} height={"300px"}/>
                </div>
                <div className="col-md-6">
                  <form className='w-100 p-5'>
                  <h4 className='text-light fw-bold text-center'><FontAwesomeIcon icon={faFilm} className='fa-1x me-1'/>ProjectHive</h4>

                 {register? <h5 className='text-center'>Sign Up to your account</h5>
                 :
                  <h5 className='text-center'>Sign In to your account</h5>}

                 {register&& <div className='mb-3'>
                    <input type="text" placeholder='Username' className='form-control' value={userDetails.username} onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})}/>
                  </div>}

                  <div className='mb-3'>
                    <input type="text" placeholder='Email ID' className='form-control' value={userDetails.email} onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}/>
                  </div>

                  <div className='mb-3'>
                    <input type="text" placeholder='Password' className='form-control' value={userDetails.password} onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}/>
                  </div>

                  {register? <div>
                    <button className='btn btn-warning' type='button' onClick={handleRegister}>Register</button>
                    <p className='text-center'>Already a User? Click here to <Link to={'/login'} className='text-dark'>Login</Link></p>
                  </div>
                    :
                  <div>
                    <button className='btn btn-warning' type='button' onClick={handleLogin}>Login</button>
                    <p className='text-center'>New User? Click here to <Link to={'/register'} className='text-dark'>Register</Link></p>
                  </div>}

                  </form>
                </div>
              </div>
            </div>
        </div>
        <div className="col-md-2"></div>
      </div>
      <ToastContainer autoclose={2000} theme="colored" position="top-center"/>
    </div>
    </>
  )
}

export default Authorisation