import carimage from '../assets/images/carimage.png'
import Vehicaldetailpanel from './Vehicaldetailpannel'
const DriverDetails = ({ride}) => {
    return (
        <div className='flex flex-col items-center '>
            <div className='flex justify-between items-center  w-full border-b-1 border-gray-300  p-2'>
                <h1 className='font-bold text-xl text-left'>Meet at the pickup point</h1>
                <div className='bg-black text-white w-15 h-15 p-2'>
                    <h1 className='text-center font-medium'>2</h1>
                    <h1 className='text-center'>min</h1></div>
            </div>
            <div className='flex items-center justify-between w-full p-2'>
                <img src={carimage} alt="this is a car image" className='h-20' />
                <div className='flex flex-col items-end justify-center'>
                    <h1 className='text-lg font-semibold'>{ride?.caption?.fullname.firstname}</h1>
                    <h2 className='font-bold text-2xl -mt-1 -mb-1'>{ride?.caption.vehicle.plate}</h2>
                    <p className='text-sm text-gray-700'>{ride?.caption?.vehicle?.type}</p>
                    {/* <p className='text-sm text-gray-600'><i className="ri-star-fill text-yellow-500 mr-1">
                        </i><span>4.9</span>
                    </p> */}
                    {console.log(ride?.otp)}
                    <p className='text-sm text-gray-700'>{ride?.otp}</p>
                </div>
            </div>
            <div className='flex flex-row w-full  items-center border-b-4 border-[#eee] p-2 rounded-2xl -mt-1'>
                <i className=" ri-map-pin-user-fill text-2xl p-2"></i>
                <div className='ml-3'>
                    <h1 className='font-medium text-2xl '>562/11-A</h1>
                    <h1 className='text-sm'>{ride?.pickup}</h1>
                </div>
            </div>
            <div className='flex flex-row w-full  items-center border-b-4 border-[#eee] p-2 rounded-2xl -mt-1'>
                <i className="ri-map-pin-2-fill text-2xl p-2"></i>
                <div className='ml-3'>
                    <h1 className='font-medium text-2xl '>562/11-A</h1>
                    <h1 className='text-sm'>{ride?.destination}</h1>
                </div>
            </div>
            <div className='flex flex-row w-full  items-center border-b-4 border-[#eee] p-2 rounded-2xl -mt-1'>
                <i className="ri-currency-line text-2xl p-2"></i>
                <div className='ml-3'>
                    <h1 className='font-medium text-2xl '>₹193.20</h1>
                    <h1 className='text-sm'>Cash Cash</h1>
                </div>
            </div>
        </div>
    )
}
export default DriverDetails