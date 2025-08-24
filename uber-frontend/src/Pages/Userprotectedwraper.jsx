import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import React from'react'

const Userprotectedwraper=({children})=>{
      const token=localStorage.getItem('accesstoken')
      const navigate=useNavigate()
      const [isloading,setisloading]=useState(true)
      useEffect(()=>{
            if(!token){
                  console.log("hi i am a user")
                  navigate('/loginuser')
                   } },[token])
      axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/profile`,{
          headers:{
            Authorization: `Bearer ${token}`
          },
         }).then(response=>{
          if(response.status==200){
             setisloading(false)
          }    
         }).catch(error=>{
            console.log(error)
            localStorage.removeItem('captionaccesstoken')
            navigate('/logincaption')
         })
     
      if(isloading){
        return(
          <>
          Looding...
          </>
        )
      }
     
      
        return(
           <>
           {children}
           </>
        )
}

export default Userprotectedwraper;