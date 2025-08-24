import React, { useState,useEffect } from 'react'
import themapgif from '../assets/images/themapgif.gif'
import uberlogo from '../assets/images/uberlogo.png'
import 'remixicon/fonts/remixicon.css'
import LiveSearchpannel from '../Component/LiveSearchpannel'
import Vehiclepanel from '../Component/Vehiclepannel'
import Vehicaldetailpanel from '../Component/Vehicaldetailpannel'
import Lookfordriver from '../Component/Lookfordriver'
import DriverDetails from '../Component/DriverDetails'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { getSocket } from '../context/socket.slice.js'
import { useNavigate } from 'react-router-dom'
const HomeUser = () => {
    const socket=getSocket();
    // const isConnected = useSelector((state) => state.socket.isConnected);
    const [findtrip, setfindtrip] = useState(false)
    const [choosevehiclepanel, setchoosevehiclepanel] = useState(false)
    const [vehicaldetailpanel, setvehicaldetailpanel] = useState(false)
    const [LookforDriver, setLookforDriver] = useState(false)
    const [DriverDetail, setDriverDetails] = useState(false)
    const [addpickuploc, setaddpickuploc] = useState('');
    const [enterdestination, setdestination] = useState('')
    const [active,setactive]=useState('')
    const [pickupres,setpickupres]=useState('')
    const [destinationres,setdestinationres]=useState('')
    const [disttime,setdisttime]=useState(null);
    const [vehicletype,setvehicletype]=useState(null);
    const [ride,setride]=useState(null);
    const navigate=useNavigate()
    const isConnected=useSelector((state)=>state.socketSlice.isConnected)
    const userData=useSelector((state)=>state.authservice.userData)
    console.log("the context userhome ",userData)
    function handlesubmit(e) {
        e.preventDefault()
    }
    useEffect(() => {
        console.log("Inside user Home")
        // Ensure we have a socket, it's connected, and we have user data before proceeding.
        if (socket && isConnected && userData?.user?._id) {
            console.log(`Socket connected, emitting join for user: ${userData.user._id}`);
            socket.emit('join', {
                userId: userData.user._id,
                userType: 'user'
            });
        } else {
            console.log("Socket not ready or user data not available.", { isConnected, hasSocket: !!socket, hasUser: !!userData?.user?._id });
        }

        if (!socket) return; // Don't set up listeners if socket is null

        function rideconfermsocket(data){
            console.log("This is a ride confirm:", data);
            setride(data);
            setLookforDriver(false);
            setDriverDetails(true);
        }
        function handleRideStart(ride) {
            setDriverDetails(false);
            navigate('/riding', { state: { ride } });
        }
        socket.on('ride-confirmed', rideconfermsocket);
        socket.on('ride-start', handleRideStart);

        return () => {
            // Cleanup listeners when the component unmounts or dependencies change
            if (socket) {
            socket.off('ride-confirmed', rideconfermsocket);
            socket.off('ride-start', handleRideStart);
            }
        };
    }, [socket, navigate, userData, isConnected]); // Add isConnected to dependencies
    async function handledestinationchange(e){
        setdestination(e.target.value);
        const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/maps/get-loc-suggestion`,{
            params:{
                searchstring:enterdestination
            },
            headers:{
                Authorization:`Bearer ${localStorage.getItem('accesstoken')}`
            }
        })
        console.log("responde  is ",response)
        setdestinationres(response)

    }
    async function handlepickupchange(e) {
        setaddpickuploc(e.target.value)
        const thesuggestion=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/maps/get-loc-suggestion`,{
            params:{
                searchstring:addpickuploc
            },
            headers:{
                Authorization:`Bearer ${localStorage.getItem('accesstoken')}`
            }
        })
        console.log("the response in the puchupchangefunc ",thesuggestion)
        setpickupres(thesuggestion)
    }
    async function handlefindtrip(){
               setchoosevehiclepanel(true)
                setfindtrip(false)
                console.log("The acces token is ",localStorage.getItem('accesstoken'))
            const disttime=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/riderout/get-fare`,
                {
                    params:{
                        startaddress:addpickuploc,
                        endaddress:enterdestination
                    },
                    headers:{
                          Authorization:`Bearer ${localStorage.getItem('accesstoken')}`
                    }
                })
            setdisttime(disttime.data);
    }
    async function handleconferm() {
        const ride=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/riderout/ride`,
            {
                pickup:addpickuploc,
                destination:enterdestination,
                vehicleType:vehicletype
            },
            {
                headers:{  
                    Authorization:`Bearer ${localStorage.getItem('accesstoken')}`
                }
            }
        )
    }
    return (
        <div className='h-screen relative'>
            <img className='absolute top-2 left-1 w-20' src={uberlogo} />
            <div className='w-screen h-screen'>
                <img className='w-full h-full object-cover' src={themapgif} />
            </div>
            <div className='flex flex-col justify-end absolute h-screen  w-full top-0 '>
                <div className='p-5  bg-white rounded-t  h-[33%]  relative'>
                    <div onClick={() => {
                        setfindtrip(false);
                    }} className={`absolute right-4  text-2xl ${findtrip ? 'opacity' : 'opacity-0'}`}><i className="ri-arrow-down-s-line"></i></div>
                    <h5 className='font-semibold text-2xl'>Find a trip</h5>
                    <form onClick={(e) => { handlesubmit(e); }}>
                        <div className='line absolute top-[40%] bg-black h-15 w-1 left-7'></div>
                        <input
                            className='w-full bg-[#eee] px-4 py-2 rounded mt-4 text-base'
                            value={addpickuploc}
                            onClick={(e) => { setfindtrip(true); setactive('pickup') }}
                            onChange={handlepickupchange }
                            placeholder='Add a pick-up location' />
                        <input
                            className='w-full bg-[#eee] px-4 py-2 rounded mt-4 text-base'
                            value={enterdestination}
                            onClick={ (e)=> {setactive('destination'); setfindtrip(true)} }
                            onChange={handledestinationchange}
                            placeholder='Enter your destination' />
                    </form>
                    <button  onClick={handlefindtrip} className='w-full bg-black text-white px-12 py-2 mt-3  rounded-lg'>Find Trip</button>
                </div>
                <div className={`bg-white  pl-5 pr-2    ${findtrip ? 'h-[70%]' : 'h-[0%]'}`}>
                    <LiveSearchpannel setaddpickuploc={setaddpickuploc} setdestination={setdestination} whichactive={active} destinationres={destinationres} pickupres={pickupres} />
                </div>
                <div className={`fixed bottom-0 mt-2 p-5 pt-0 z-20  bg-[#eee] flex flex-col justify-start w-screen ${choosevehiclepanel ? 'translate-y-0' : 'translate-y-full'} `}>
                    <Vehiclepanel setaddpickuploc={setaddpickuploc} setvehicletype={setvehicletype} disttime={disttime} setchoosevehiclepanel={setchoosevehiclepanel} setvehicaldetailpanel={setvehicaldetailpanel} />
                </div>
                <div className={`fixed bottom-0 mt-2 p-5 pt-0 z-20  bg-white flex flex-col justify-start w-screen ${vehicaldetailpanel ? 'translate-y-0' : 'translate-y-full'} `}>
                    <Vehicaldetailpanel handleconferm={handleconferm} addpickuploc={addpickuploc}  enterdestination={enterdestination} disttime={disttime} vehicletype={vehicletype} setLookforDriver={setLookforDriver} setvehicaldetailpanel={setvehicaldetailpanel} />
                </div>
                <div className={`fixed bottom-0 mt-2 p-5 pt-0 z-20  bg-white flex flex-col justify-start w-screen ${LookforDriver ? 'translate-y-0' : 'translate-y-full'} `}>
                    <Lookfordriver addpickuploc={addpickuploc}  enterdestination={enterdestination} disttime={disttime}  vehicletype={vehicletype} setDriverDetails={setDriverDetails} />
                </div>
                <div className={`fixed bottom-0 mt-2 p-2 z-20  bg-white flex flex-col justify-start w-screen ${DriverDetail ? 'translate-y-0' : 'translate-y-full'} `}>
                    <DriverDetails ride={ride} />
                </div>
            </div>
        </div>
    )
}
export default HomeUser;