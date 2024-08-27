import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

//register
export const registerApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody,"")
}

//login
export const loginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody)
}

//add project
export const addProjectApi = async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/add-project`,reqBody,reqHeader)
}

//home projects
export const homeProjectsApi = async()=>{
    return await commonApi('GET',`${serverUrl}/home-project`,"","")
}

//all projects
export const allProjectsApi = async(searchKey)=>{
    return await commonApi("GET",`${serverUrl}/all-project?search=${searchKey}`,"","")
}

//api for userprojects
export const userProjectApi = async(reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/user-project`,"",reqHeader)
}

//api for updating userprojects
export const editUserApi = async(id,reqBody,reqHeader)=>{
    return await commonApi("PUT",`${serverUrl}/edit-project/${id}`,reqBody,reqHeader)
}

//api to update profile
export const profileUpdateApi = async(reqBody,reqHeader)=>{
    return await commonApi("PUT",`${serverUrl}/update-profile`,reqBody,reqHeader)
}
