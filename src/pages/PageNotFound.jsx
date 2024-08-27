import React from 'react'
import { Link } from 'react-router-dom'


function PageNotFound() {
  return (
    <div style={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>

   <div className="row">
    <div className="col-md-1"></div>
    <div className="col-md-10 d-flex justify-content-center align-items-center flex-column">
    <img src="https://cdnl.iconscout.com/lottie/premium/thumb/404-error-page-3959261-3299960.gif" alt="no image" width={"100%"} height={"450px"} />
    <h3 className='mt-4'>Looks like you're Lost</h3>
    <h5 className='mt-3'>The page you're looking is unavailaible</h5>
    <Link to={'/'}><button className='btn btn-success mt-3'>Go Back Home</button></Link>
    </div>
    <div className="col-md-1"></div>
   </div>

    </div>
  )
}

export default PageNotFound