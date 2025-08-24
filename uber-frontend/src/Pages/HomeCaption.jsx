import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Confirmridepannel from '../Component/Confirmridepannel.jsx'
import uberlogo from '../assets/images/uberlogo.png'
import Driverpannel from '../Component/Driverpannel'
import CompleteridePannel from '../Component/FinishridePannel.jsx'
import DriverPopupPannel from '../Component/DriverPopupPannel'
import themapgif from '../assets/images/themapgif.gif'
import { getSocket } from '../context/socket.slice.js'



const HomeCaption = () => {
    const [popuppannel, setpopuppannel] = useState(false);
    const [Confirmride, setConfirmride] = useState(false);
    const [completeride, setcompleteride] = useState(false);
    const [ride, setride] = useState(null);
    const userData = useSelector((state) => state.captionAuth.user)
    console.log("the context ", userData?.caption.fullname.firstname)
    const socket = getSocket();
    useEffect(() => {

        console.log("Inside home page ")
        if (!userData?.caption?._id) return;
        socket.emit('join', {
            userId: userData?.caption?._id,
            userType: "captain"
        })
        const updatelocation = () => {
            console.log("Inside update location ")
            if (navigator.geolocation) {
                console.log("Hi......")
                navigator.geolocation.getCurrentPosition(position => {
                    console.log("position latitude  ", position.coords.latitude);
                    console.log("Longitude " + position.coords.longitude);
                    socket.emit('update-location-captain', {
                        userId: userData?.caption?._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }
           const locationinterval=setInterval(updatelocation,10000)
        updatelocation();

        const handleNewRide = (data) => {
            console.log("New ride received:", data);
            setride(data);
            setpopuppannel(true);
        };

        socket.on('new-ride', handleNewRide);

        // Cleanup function to remove the listener when the component unmounts
        return () => {
            socket.off('new-ride', handleNewRide);
        };
    }, [socket, userData]);
    const confirmride = async () => {
        console.log("in caption the ride pop up ", ride._id+"the caption id "+userData.caption._id);
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/riderout/confirm-ride`,
            {
                rideId: ride._id,
                captionid: userData?.caption?._id
            }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('captionaccesstoken')}`
            }
        }
        )
        console.log("the responce in confirm ride function in home caption ", res);
        setpopuppannel(false);
        setConfirmride(true)
            }

    return (
        <div className='h-screen  flex flex-col'>
            <div className='absolute w-full flex top-2 p-2 justify-between z-20'>
                <img className='w-25' src={uberlogo} />
                <Link className=' h-10 w-10 text-2xl top-2 right-2 bg-white rounded-full flex justify-center items-center ' to="/userhome">
                    <i className="ri-logout-box-line"></i>
                </Link>
            </div>
            <div >
                <div className='flex-grow w-full h-screen overflow-hidden '>
                    <img src={themapgif} alt="This is the image gif" className='h-full w-full object-cover' />
                </div>
                <Driverpannel userData={userData}/>
            </div>
            <div className={`absolute bottom-0 bg-white w-full flex flex-col items-center pt-5 p-2.5 z-20 ${popuppannel ? 'translate-y-0' : 'translate-y-full'}`}>
                <DriverPopupPannel ride={ride} setpopuppannel={setpopuppannel} setConfirmride={setConfirmride} confirmride={confirmride} />
            </div>
            <div className={`absolute bottom-0 bg-white w-full flex flex-col items-center pt-5 h-screen  p-2.5 z-20 ${Confirmride ? 'translate-y-0' : 'translate-y-full'}`}>
                <Confirmridepannel ride={ride} setpopuppannel={setpopuppannel} setConfirmride={setConfirmride} />
            </div>
        </div>
    )
}
export default HomeCaption