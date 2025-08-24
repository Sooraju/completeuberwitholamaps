import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login as contextlogin } from '../context/auth.slice.js';
import { connectSocket } from '../context/socket.slice.js';
import uberlogo from '../assets/images/uberlogo.png'
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
const LoginUser=()=>{
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [formdata,setData]=useState({})
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
        setData({
            email:email,
            password:password
        })
        const logindata={
            email:email,
            password:password
        }
        console.log(logindata)
        try{
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/login`,logindata,{
             withCredentials: true
        })
        if(response.status==201){
            const data=response.data
            console.log("the response data ",data)  
            dispatch(contextlogin(data));
            dispatch(connectSocket());
            localStorage.setItem('accesstoken',data.token)
            navigate('/userhome')
            console.log(data)
        }
        }catch(error){
            console.log("Error : ",error)
        }
        console.log(formdata)

    }
  return(  <>
    <div className='h-screen pt-10 p-6 flex flex-col justify-between'>
        <div>
        <form onSubmit={(e)=>{
              handelsubmit(e)
        }}>
         <img  className="w-20 mb-10 " src={uberlogo} alt="the image of logo"/>
         <h1 className='text-base mb-2 font-medium'>What's your email</h1>
         <input
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            required
           type='text'
           placeholder='example@example.com'
           className='bg-[#eeeeee] mb-5 px-4 py-1 border rounded  placeholder:text-base w-full'
         />
         <h1 className='text-lg font-medium mb-2'>Enter Password</h1>
         <input
         value={password}
         onChange={(e)=>{
            setPassword(e.target.value)
         }}
         required
         type='password'
         placeholder='Password'
         className='bg-[#eeeeee] mb-5 px-4 py-1 w-full rounded text-lg border placeholder:text-base'
         />
         {emailError && <p className='text-red-500 text-sm text-center font-bold'>{emailError}</p>}
        <button type='submit'className='bg-black text-lg px-4 py-2 w-full text-white font-bold rounded '>
            Login
        </button>
        
        </form>
        <p className='text-center'>New here?<Link to='/signupuser' className='text-blue-600 hover:underline'>Create New Account</Link></p>
        </div>
        <Link to='/logincaption' className='flex text-lg item-center justify-center px-4 py-2 bg-orange-500 w-full text-center font-medium rounded text-white'> Sign in as Caption</Link>
    </div>

    </>)
}
export default LoginUser;