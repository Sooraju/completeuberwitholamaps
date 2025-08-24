import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {login} from '../context/auth.slice.js'
import uberlogo from '../assets/images/uberlogo.png'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'

const SignupUser=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
      const [email,setEmail]=useState('')
        const [password,setPassword]=useState('')
        const [emailError,setemailError]=useState('')
        const [firstname,setfirstname]=useState('')
        const [lastname,setlastname]=useState('')
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
             
        const newUser={
            fullname:{
                firstname:firstname,
                lastname:lastname
             },
             email:email,
             password:password
        } 
        const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/register`,newUser)
        if(response.status===201){
            const resdata=response.data
            dispatch(login(resdata))
            localStorage.setItem('accesstoken',JSON.stringify(resdata.token))
            navigate('/userhome')
            console.log(resdata)
        }
            console.log(newUser)
    
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
             className='bg-[#eeeeee] mb-5 px-4 py-1 w-full rounded  border placeholder:text-base text-lg'
             />{emailError && <p className='text-red-500 text-sm text-center font-bold'>{emailError}</p>}
            <button type='submit'className='bg-black text-lg px-4 py-2 w-full text-white font-bold rounded '>
                Create Account 
            </button>
            
            </form>
            <p className='text-center '>Already have a account?<Link to='/loginuser' className='text-blue-600'>Login here</Link></p>
            </div>
            <p className='text-[12px] leading-tight'>By proceeding,you consent to get calls,WhatsApp or SMS messages,
                including by automated means,from uber ans its affiliates to the 
                number provided
            </p>
        </div>
    
        </>)
}
export default SignupUser;
