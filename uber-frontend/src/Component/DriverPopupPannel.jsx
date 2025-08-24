import Randomperson2 from '../assets/images/Randomperson2.png'
const DriverPopupPannel = ({ride,confirmride,setpopuppannel,setConfirmride }) => {
    return (
        <> {console.log("the ride is ",ride)}
            <i className="ri-arrow-down-wide-line text-xl text-gray-500" onClick={() => { setpopuppannel(false) }}></i>
            <h1 className='font-bold text-2xl text-left w-full mb-4'>New Ride Available!</h1>
            <div className='flex justify-between bg-yellow-400 items-center w-full p-2.5 rounded-2xl  mb-2 pr-4'>
                <div className='flex  w-full justify-start items-center '>
                    <img src={Randomperson2} className='w-15 rounded-full' />
                    <div className=' ml-6 w-full  flex flex-col  justify-center '>
                        <h1 className='font-bold text-xl  -mb-1'>{ride?.user.fullname.firstname}</h1>
                         <h1 className='font-bold text-xl  -mt-1 '>{ride?.user.fullname.lastname}</h1>
                    </div>  
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
            <div className='flex justify-end w-full'>
                <button className='bg-gray-600 w-25 h-10 flext justify-center items-center  rounded font-medium text-xl hover:cursor-pointer hover:bg-gray-400 ' onClick={() => {
                    setpopuppannel(false)
                }}>Ignore</button>
                <button
                    onClick={() => {
                            setConfirmride(true)
                            confirmride();
                    }} className='bg-yellow-500 w-25  h-10 flext justify-center items-center  rounded font-medium text-xl ml-3 hover:cursor-pointer hover:bg-yellow-300 '>Accept</button>
            </div>
        </>
    )
}
export default DriverPopupPannel;