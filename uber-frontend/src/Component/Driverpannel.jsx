import Randomperson from '../assets/images/Randomperson.png'

const Driverpannel = ({userData}) => {
    return (

        <div className='absolute bottom-0 flex flex-col  bg-white w-full  items-center p-5 z-20'>
            <div className='flex items-center justify-between w-full'>
                <div className='flex items-center flex-wrap '>
                    <img src={Randomperson} className='w-10 rounded-full' />
                    <div className='ml-5 '>
                        <h1 className='font-semibold text-2xl inline-block'>
                            {userData?.caption?.fullname.firstname}
                        </h1>
                        <h1 className='text-xl font-medium block'>
                            {userData?.caption?.fullname.lastname}
                        </h1>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <h1 className='font-semibold text-xl'>₹295.20</h1>
                    <h1 className='text-gray-800 text-sm'>Earned</h1>
                </div>
            </div>
            <div className='flex items-center justify-center bg-[#eee] gap-4 p-2 mt-5 rounded-sm'>
                <div className='flex flex-col  justify-center items-center'>
                    <i className="ri-timer-2-line text-2xl"></i>
                    <h1 className='font-semibold text-xl'>10.2</h1>
                    <h1 className='font-semibold text-gray-600'>Hours Online</h1>
                </div>
                <div className='flex flex-col  justify-center items-center'>
                    <i className="ri-speed-up-line text-2xl"></i>
                    <h1 className='font-semibold text-xl'>10.2</h1>
                    <h1 className='font-semibold text-gray-600'>Hours Online</h1>
                </div>
                <div className='flex flex-col  justify-center items-center'>
                    <i className="ri-timer-2-line text-2xl"></i>
                    <h1 className='font-semibold text-xl'>10.2</h1>
                    <h1 className='font-semibold text-gray-600'>Hours Online</h1>
                </div>
            </div>
        </div>
    )
}
export default Driverpannel;