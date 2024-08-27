import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Project from './pages/Project'
import Authorisation from './pages/Authorisation'
import Dashboard from './pages/Dashboard'

import Footer from './components/Footer'
import PageNotFound from './pages/PageNotFound'
import './App.css'
import { useContext } from 'react'
import { isLoginAuthContext } from './context/Contextshare'

function App() {
  const {isLoginStatus} = useContext(isLoginAuthContext)
 

  return (
    <>
    
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/project' element={<Project/>}/>
        <Route path='/register' element={<Authorisation register/>}/>
        <Route path='/login' element={<Authorisation/>}/>
        <Route path='/dashboard' element={isLoginStatus?<Dashboard/>:<PageNotFound/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
