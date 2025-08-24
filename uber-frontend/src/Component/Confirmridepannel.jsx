import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Randomperson2 from '../assets/images/Randomperson2.png'
import axios from 'axios'

const Confirmridepannel = ({ride,setpopuppannel,setConfirmride}) => {
    const [OTP, setOTP] = useState('');
    const navigate=useNavigate();
    const handlesubmit=async(e)=>{
            e.preventDefault();
            const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/riderout/start-ride`,{
                params:{
                    rideid:ride._id, 
                    otp:OTP
                },
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('captionaccesstoken')}`
                }
            })
            if(res.status==200){
                setConfirmride(false)
                setpopuppannel(false)
                navigate('/caption-riding',{state:{ride:res.data}})
            }
                
    }
    return (
        <>
            <i className="ri-arrow-down-wide-line text-xl text-gray-500" onClick={() => {setConfirmride(false) }}></i>
            <h1 className='font-bold text-2xl text-left w-full mb-4'>Confirm this ride to start</h1>
            <div className='flex justify-between border-2 border-yellow-400 items-center w-full p-2.5 rounded-2xl  mb-4 pr-4'>
                <div className='flex justify-start items-center '>
                    <img src={Randomperson2} className='w-15 rounded-full' />
                    <h1 className='font-bold ml-2 text-xl'>{ride?.user.fullname.firstname}</h1>
                    <h1 className='font-semibold ml-2 text-xl'>{ride?.user.fullname.lastname}</h1>
                </div>
                <h1 className='font-bold text-xl'>2.2 KM</h1>
            </div>
            <div className='flex flex-row w-full  items-center border-b-4 border-[#eee] p-2 rounded-2xl -mt-1'>
                <i className=" ri-map-pin-user-fill text-2xl p-2"></i>
                <div className='ml-3'>
                    <h1 className='font-medium text-2xl '>562/11-A</h1>
                    <h1 className='text-sm'>{ride?.pickup}</h1>
                </div>
            </div>
            <div className='flex flex-row w-full  items-center border-b-4 border-[#eee] p-2 rounded-2xl -mt-1 mb-2' >
                <i className="ri-map-pin-2-fill text-2xl p-2"></i>
                <div className='ml-3'>
                    <h1 className='font-medium text-2xl '>562/11-A</h1>
                    <h1 className='text-sm'>{ride?.destination}</h1>
                </div>
            </div>
            <div className='flex flex-row w-full  items-center border-b-4 border-[#eee] p-2 rounded-2xl -mt-1  mb-7'>
                <i className="ri-currency-line text-2xl p-2"></i>
                <div className='ml-3'>
                    <h1 className='font-medium text-2xl '>₹193.20</h1>
                    <h1 className='text-sm'>Cash Cash</h1>
                </div>
            </div>

            <input
                value={OTP}
                onChange={(e) => {
                    setOTP(e.target.value)
                }}
                required
                type='text'
                placeholder='Enter OTP'
                className='bg-gray-400 mb-5 mt-2 px-5 py-3 border rounded   border-blue-400 placeholder:text-xl placeholder:text-gray-600  w-full font-mono'
            />

            <div className='flex-row w-full'>
                <form onSubmit={(e)=>{
                    handlesubmit(e)
                }}>
                <button type="submit" className='bg-green-700 w-full flex py-2 mb-2 justify-center items-center  rounded font-medium text-xl hover:cursor-pointer hover:bg-gray-400  ' >Confirm</button>
                <button
                    onClick={() => {
                        setConfirmride(false)
                        setpopuppannel(false)
                    }} className='bg-red-600 w-full py-2 mb-2  flext justify-center items-center  rounded font-medium text-xl  hover:cursor-pointer hover:bg-yellow-300 '>Cancel</button>
                </form>
            </div>
        </>
    )
}
export default Confirmridepannel;