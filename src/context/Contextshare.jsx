import React, { createContext, useState } from 'react'

export const addResponseContext = createContext({})
export const editResponseContext = createContext({})
export const isLoginAuthContext = createContext(false)

function Contextshare({children}) {

    const [addResponse,setAddResponse] = useState({})
    const [editResponse,setEditResponse] = useState({})
    const [isLoginStatus,setIsLoginStatus] = useState(true)
  return (
    //provider tag to share data - where shared data should be placed inside the value attribute as key:value pairs
    <addResponseContext.Provider value={{addResponse,setAddResponse}}> 
        <editResponseContext.Provider value={{editResponse,setEditResponse}}>
          <isLoginAuthContext.Provider value={{isLoginStatus,setIsLoginStatus}}>
          {children}
          </isLoginAuthContext.Provider>
        </editResponseContext.Provider>
       </addResponseContext.Provider>
  )
}



export default Contextshare