import React, { useState } from 'react'
import uberlogo from '../assets/images/uberlogo.png'
import { useDispatch } from 'react-redux';
import { login as captionlogin } from '../context/caption.auth.slice';
import { connectSocket } from '../context/socket.slice.js';
import axios from 'axios';
import { Link,useNavigate} from 'react-router-dom';
const LoginCaption=()=>{
    const dispatch=useDispatch()
    const navigate=useNavigate()
      const [email,setEmail]=useState('')
      const [password,setPassword]=useState('')
      const [emailError,setemailError]=useState()
      const validatEmail=()=>{
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
      }
      const handelsubmit=async(e)=>{
          e.preventDefault()
          if(!validatEmail(email)){
              setemailError("the email id is not valid ")
              return 
          }else{
              setemailError("")
          }
          const data={
              email:email,
              password:password
          }
          try {
            const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/caption/login`,data)
            console.log("The responce the data",response.data)
            if(response.status ==200){
                  dispatch(captionlogin(response.data));
                  dispatch(connectSocket());
                  console.log("The responce the data",response.data)
                  localStorage.setItem('captionaccesstoken',response.data.token)
                  navigate('/captionhome')
                  setEmail("")
                  setPassword("")
            }
          } catch (error) {
                console.log("the Error in login response ",error)
          }
          
  
      }
  return(
    <>
    <div className='h-screen pt-10 p-6 flex flex-col justify-between'>
        <div>
        <form onSubmit={(e)=>{
              handelsubmit(e)
        }}>
         <img  className="w-20 mb-10 " src={uberlogo} alt="thr image of logo"/>
         <h1 className='text-lg mb-2 font-medium'>What's your email</h1>
         <input
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            required
           type='text'
           placeholder='example@example.com'
           className='bg-[#eeeeee] mb-3 px-4 py-1 border rounded text-lg placeholder:text-base w-full'
         />
         <h1 className='text-lg font-medium'>Enter Password</h1>
         <input
         value={password}
         onChange={(e)=>{
            setPassword(e.target.value)
         }}
         required
         type='password'
         placeholder='Password'
         className='bg-[#eeeeee] mb-3 px-4 py-1 w-full rounded text-lg border placeholder:text-base'
         />{emailError && <p className='text-red-500 text-sm text-center font-bold'>{emailError}</p>}
        <button type='submit'className='bg-black text-lg px-4 py-2 w-full text-white font-bold rounded '>
            Login
        </button>
        
        </form>
        <p className='text-center'>Join a fleet?<Link to='/signupcaption' className='text-blue-600'>Register as caption</Link></p>
        </div>
        <Link to='/loginuser' className='flex text-lg item-center justify-center px-4 py-2  bg-green-600 w-full text-center font-medium rounded text-white'> Sign in as User</Link>
    </div>

    </>
  )
}
export default LoginCaption;