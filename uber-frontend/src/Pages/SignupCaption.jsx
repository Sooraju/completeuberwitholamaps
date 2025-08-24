import React,{useState} from 'react'
import uberlogo from '../assets/images/uberlogo.png'
import {useDispatch} from 'react-redux'

import { login as captionlogin } from '../context/caption.auth.slice'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
const SignupCaption=()=>{
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [emailError,setemailError]=useState('')
    const [firstname,setfirstname]=useState('')
    const [lastname,setlastname]=useState('')
    const [vehiclecolor,setvehiclecolor]=useState('')
    const [vehicleplate,setvehicleplate]=useState('')
    const [vehiclecapacity,setvehiclecapacity]=useState('')
    const [vehicletype,setvehicletype]=useState('')
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
        const captiondata={
            fullname:{
               firstname:firstname,
               lastname:lastname
            },
            email:email,
            password:password,
            vehicle:{
                color:vehiclecolor,
                plate:vehicleplate,
                capacity:vehiclecapacity,
                type:vehicletype
            }
        }
        console.log("The caption data : ",captiondata)
        try{
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/caption/register`,captiondata)
        console.log("response ",response.status)
        if(response.status==200){
            const data=response.data;
            dispatch(captionlogin(data))
            localStorage.setItem('captionaccesstoken',data.token)
            setEmail('')
            setPassword('')
            setfirstname('')
            setlastname('')
            setvehiclecapacity('')
            setvehiclecolor('')
            setvehicleplate('')
            setvehicletype('')
            navigate('/captionhome')    
        }}catch(error){
            if(error.response){
                console.error("Backend error data:", error.response.data.error);
               console.error("Backend error message:", error.response.data.message);
            }else if(error.request){
                console.error("No response received:", error.request);
            }else{
                console.error("Request setup Error: ",error.message);
            }
        }
        
        
    }
return(  
<>
    <div className='h-screen pt-10 p-6 flex flex-col justify-between'>
        <div>
        <form onSubmit={(e)=>{
              handelsubmit(e)
        }}>
         <img  className="w-20 mb-10" src={uberlogo} alt="thr image of logo"/>
         <h1 className='text-lg mb-1 w-1/2 font-medium'>What's your Name</h1>
         <div className='mb-5 flex gap-2 '>
         <input
          value={firstname}
          onChange={(e)=>{
                setfirstname(e.target.value)
          }}
          placeholder='firstname'
          required
          className='border text-base placeholder:text-sm bg-[#eeeeee] rounded  px-4 py-1 w-1/2'
          />
          <input
          value={lastname}
          onChange={(e)=>{
                        setlastname(e.target.value)
          }}
          placeholder='Lastname'
          className='placeholder:text-base text-lg bg-[#eeeee] rounded border px-4 py-1 w-1/2'/>
          </div>
         <h1 className='text-lg mb-1 font-medium'>What's your email</h1>
         <input
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            required
           type='text'
           placeholder='example@example.com'
           className='bg-[#eeeeee] mb-5 px-4 py-1 border rounded  placeholder:text-base text-lg w-full'
         />
         <h1 className='text-lg font-medium mb-1'>Enter Password</h1>
         <input
         value={password}
         onChange={(e)=>{
            setPassword(e.target.value)
         }}
         required
         type='password'
         placeholder='Password'
         className='bg-[#eeeeee] mb-5 px-4 py-1 w-full rounded  border placeholder:text-sm text-base'
         />{emailError && <p className='text-red-500 text-sm text-center font-bold'>{emailError}</p>}
         <h1 className='text-lg font-medium mb-1'>Vehicle Information</h1>
        <div className='flex gap-2'>
             <input required
         type='text'
         placeholder='Vehicle Color'
         value={vehiclecolor}
         onChange={(e)=>{
            setvehiclecolor(e.target.value)
         }}
         className='w-1/2 bg-[#eeeeee] mb-2 py-1 px-4 rounded border placeholder:text-sm text-base'/>
         <input required
         type='text'
         value={vehicleplate}
         placeholder='Vehicle Plate'
         onChange={(e)=>{
            setvehicleplate(e.target.value)
         }}
         className='w-1/2 bg-[#eeeeee] mb-2 py-1 px-4 rounded border placeholder:text-sm text-base'/>
        </div>
        <div className='flex gap-2'>
        <input required
             type='number'
             value={vehiclecapacity}
             placeholder='Vehicle Capacity'
             onChange={(e)=>{
                setvehiclecapacity(e.target.value)
             }}
            className='w-1/2 bg-[#eeeeee] mb-5 py-1 px-4 rounded border placeholder:text-sm text-base'/>
         <select
         required
         value={vehicletype}
         onChange={(e)=>{
            setvehicletype(e.target.value)
         }}
         className='bg-[#eeeeee] px-2 py-1 mb-5 border w-1/2 rounded  text-lg text-center'
         >
            <option value="" disabled className='bg-amber-300'>Select vehicle</option>
            <option value="car">car</option>// 'car', 'motorcycle', 'auto'
            <option value="motorcycle">motorcycle</option>
            <option value="auto">auto</option> 
         </select>
        </div>
        <button type='submit'className='bg-black text-lg px-4 py-2 w-full text-white font-bold rounded '>
            Creat Caption Account
        </button>
        
        </form>
        <p className='text-center '>Already have a account?<Link to='/logincaption' className='text-blue-600'>Login here</Link></p>
        </div>
        <p className='text-[9px] leading-tight'>This site is protected by reCAPTCHA and the <span className=' underline'>Google Privacy Policy </span> and <span className='underline'>Terms of Service apply</span>. 
        </p>
    </div>

    </>)
}
export default SignupCaption;