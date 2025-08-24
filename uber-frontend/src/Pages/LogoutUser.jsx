import React from 'react'
import axios from 'axios'
const LogoutUser=()=>{
    const token=localStorage.getItem('accesstoken')
    // `${import.meta.env.VITE_BASE_URL}/api/v1/users/register
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/logout`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(response=>{
        if(response.status==200){
            localStorage.removeItem('accesstoken')
        }
    })

    return(
       <h1>Logout</h1>
    )
} 
export default LogoutUser;