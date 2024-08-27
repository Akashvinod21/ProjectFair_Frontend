import { faWhatsapp,faXTwitter,faInstagram,faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <div className="container-fluid bg-warning p-5">
        <div className="row">
            <div className="col-md-4">
                <h4><FontAwesomeIcon icon={faFilm} />Hive.In</h4>
                <p className='mt-3 text-dark' style={{textAlign:"justify"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt sequi corrupti nobis ipsam aut dolorum pariatur et nesciunt? Possimus exercitationem fugit similique obcaecati. Natus accusantium unde magni adipisci soluta atque?</p>
            </div>
            <div className="col-md-2 d-md-flex align-items-center justify-content-center flex-column">
                <div className='text-dark'>
                    <h4>Links</h4>
                    <Link to={'/'} style={{color:"black",textDecoration:"none"}}><p>Home</p></Link>
                    <Link to={'/project'} style={{color:"black",textDecoration:"none"}}><p>Project</p></Link>
                    <Link to={'/dashboard'} style={{color:"black",textDecoration:"none"}}><p>Dashboard</p></Link>
                    
                </div>
            </div>
            <div className="col-md-2  d-md-flex align-items-center justify-content-center flex-column">
                <div className='text-dark'>
                    <h4>Guides</h4>
                    <p>React</p>
                    <p>Bootstrap</p>
                    <p>Bootswatch</p>
                </div>
            </div>
            <div className="col-md-4">
                <h4>Contact Us</h4>
                <div className='d-flex mt-3'>
                    <input type="text" placeholder='Email ID' className='form-control' />
                    <button className='btn btn-danger ms-2'>Subscribe</button>
                </div>
                <div className='mt-3 d-flex justify-content-around text-dark'>
                <FontAwesomeIcon icon={faInstagram} className='fa-2x' />
                <FontAwesomeIcon icon={faXTwitter} className='fa-2x' />
                <FontAwesomeIcon icon={faWhatsapp} className='fa-2x' />
                <FontAwesomeIcon icon={faLinkedin} className='fa-2x' />

                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer