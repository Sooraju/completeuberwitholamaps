import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
const CaptionProtectedwraper=({children})=>{
    const navigate=useNavigate();
    const token=localStorage.getItem('captionaccesstoken')
    const [isloading,setisloading]=useState(true)
    useEffect(()=>{
      if(!token){
           navigate('/logincaption')
      }},[token])
         axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/caption/profile`,{
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
      
    
    return(<>
    {children}
    </>)
}
export default CaptionProtectedwraper;