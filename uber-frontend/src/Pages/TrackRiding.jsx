import uberlogo from '../assets/images/uberlogo.png'
import { Link, useLocation } from 'react-router-dom';
import themapgif from '../assets/images/themapgif.gif'
import { useState } from 'react';
import LiveTracking from '../Component/LiveTracking.jsx'
import FinishridePannel from '../Component/FinishridePannel';

const TrackRiding = () => {
    const [finishride,setfinishride]=useState(false);
    const location=useLocation();
    const ridedata=location.state?.ride;
    console.log("The ride data in Trackingride ",ridedata,"The latidude ",ridedata?.caption?.location?.coordinates[0]);

    // Add a guard to prevent rendering with undefined ride data
    if (!ridedata) {
        return <div>Loading ride details...</div>;
    }

    return (
        <div className='h-screen  flex flex-col'>
            <div className='absolute w-full flex top-2 p-2 justify-between z-20'>
                <img className='w-25' src={uberlogo} />
                <Link className=' h-10 w-10 text-2xl top-2 right-2 bg-white rounded-full flex justify-center items-center ' to="/userhome">
                    <i className="ri-logout-box-line"></i>
                </Link>
            </div>

            <div className='flex-grow w-full h-4/5  -z-0'>
            <LiveTracking
            lng={ridedata?.caption?.location?.coordinates[0]}  lat={ridedata?.caption?.location?.coordinates[1]} zoom={15}/>
                {/* <img src={themapgif} alt="This is the image gif" className='h-full w-full object-cover' /> */}
            </div>
            <div className='relative p-6 bg-yellow-400  w-screen bottom-0 flex flex-col justify-center  pt-10 '>
                <div className='absolute left-[50%] top-2 text-center p-1 '>
                    <i className="ri-arrow-up-wide-line text-xl font-bold"></i>
                </div>
                <div className='flex gap-4 justify-center items-center w-full mt-3'>
                    <h1 className='font-semibold text-xl'>4 KM away</h1>
                    <button onClick={()=>{
                        setfinishride(true)
                    }} className='text-white  font-semibold p-3 px-10  bg-green-600 rounded-lg '>Complete Ride</button>
                </div>
            </div>
            <div className={`absolute flex flex-col justify-center p-4 w-full bg-white  bottom-0 items-center  ${finishride? 'translate-y-0':'translate-y-full'}`}>
                  <FinishridePannel ride={ridedata}/>
            </div>
        </div>
    )
}
export default TrackRiding;