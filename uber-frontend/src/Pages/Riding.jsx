import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import carimage from '../assets/images/carimage.png'
import themapgif from '../assets/images/themapgif.gif'
import {getSocket} from '../context/socket.slice.js'
const Riding = () => {
    const location=useLocation();
    const ride=location.state ||{};
    const navigate=useNavigate()
    const socket=getSocket();

    useEffect(() => {
        if (!socket) return;

        const handleRideEnd = () => {
            navigate('/userhome');
        };
        socket.on('ride-end', handleRideEnd);

        return () => socket.off('ride-end', handleRideEnd);
    }, [socket, navigate]);
    return (
        <div className='h-screen'>
            <Link className='absolute h-10 w-10 text-2xl top-2 right-2 bg-white rounded-full flex justify-center items-center ' to="/userhome">
                <i className="ri-home-2-line"></i>
            </Link>
            <div className='h-1/2'>
                <img src={themapgif} className='w-full h-full object-fill' alt="This is the image gif" />
            </div>
            <div className='flex flex-col  flex-grow bg-white items-center h-1/2 p-2'>
                <div className='flex items-center justify-between w-full p-2'>
                    <img src={carimage} alt="this is a car image" className='h-20' />
                    <div className='flex flex-col items-end justify-center'>
                        <h1 className='text-lg font-semibold'>SOORAJ</h1>
                        <h2 className='font-bold text-2xl -mt-1 -mb-1'>KA15AK00-0</h2>
                        <p className='text-sm text-gray-700'>white Suzuki S-Presso LXI</p>
                        <p className='text-sm text-gray-600'><i className="ri-star-fill text-yellow-500 mr-1"></i><span>4.9</span></p>
                    </div>
                </div>
                <div className='flex flex-row w-full  items-center border-b-4 border-[#eee] p-2 rounded-2xl -mt-1'>
                    <i className=" ri-map-pin-user-fill text-2xl p-2"></i>
                    <div className='ml-3'>
                        <h1 className='font-medium text-2xl '>562/11-A</h1>
                        <h1 className='text-sm'>Kankarlya Talab, Bhopal</h1>
                    </div>
                </div>
                <div className='flex flex-row w-full  items-center border-b-4 border-[#eee] p-2 rounded-2xl -mt-1'>
                    <i className="ri-currency-line text-2xl p-2"></i>
                    <div className='ml-3'>
                        <h1 className='font-medium text-2xl '>₹193.20</h1>
                        <h1 className='text-sm'>Cash Cash</h1>
                    </div>
                </div>
                <button className='bg-green-600 w-full mt-2 rounded p-1 '>Make a Payment</button>
            </div>
        </div>
    )
}
export default Riding;