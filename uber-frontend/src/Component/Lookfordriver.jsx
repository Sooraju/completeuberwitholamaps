
import carimage from '../assets/images/carimage.png'
const Lookfordriver=({addpickuploc,enterdestination,disttime,vehicletype,setDriverDetails})=>{
        return(
            <div className='flex flex-col items-center pt-5'>
                <h1 className='font-bold text-2xl text-left w-full'>Looking for a Driver</h1>
                <img src={carimage} className='h-20'/>
                <div className='flex flex-row w-full  items-center border-b-4 border-[#eee] p-2 rounded-2xl -mt-1'>
                    <i className=" ri-map-pin-user-fill text-2xl p-2"></i>
                    <div className='ml-3'>
                        <h1 className='font-medium text-2xl '>562/11-A</h1>
                        <p className='text-sm'>{addpickuploc}</p>
                    </div>
                </div>
                 <div className='flex flex-row w-full  items-center border-b-4 border-[#eee] p-2 rounded-2xl -mt-1'>
                    <i className="ri-map-pin-2-fill text-2xl p-2"></i>
                    <div className='ml-3'>
                        <h1 className='font-medium text-2xl '>562/11-A</h1>
                        <p className='text-sm'>{enterdestination}</p>
                    </div>
                </div>
                 <div className='flex flex-row w-full  items-center border-b-4 border-[#eee] p-2 rounded-2xl -mt-1'>
                    <i className="ri-currency-line text-2xl p-2"></i>
                    <div className='ml-3'>
                        <h1 className='font-medium text-2xl '>₹{!disttime? '₹':disttime[vehicletype]}</h1>
                        <h1 className='text-sm'>Cash Cash</h1>
                    </div>
                </div>
            </div>
        )
}
export default Lookfordriver;