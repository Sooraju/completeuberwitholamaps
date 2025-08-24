
import { Link, useNavigate } from 'react-router-dom';
import Randomperson2 from '../assets/images/Randomperson2.png'
import axios from 'axios'
const FinishridePannel = ({ride}) => {
    const navigate=useNavigate();
    const endride=async()=>{
        console.log("The ride id ",ride._id);
        const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/riderout/end-ride`,
           {
            rideid:ride._id
           } ,{
            headers:{
                  Authorization:`Bearer ${localStorage.getItem('captionaccesstoken')}`
           }}
        )
            if(res.status==200){
                navigate('/captionhome')
            }
    }
     
    return (
        <> {console.log("THe ride data "+ride)}
          <i className="ri-arrow-down-wide-line text-xl text-gray-500" onClick={() => {setConfirmride(false) }}></i>
                    <h1 className='font-bold text-2xl text-left w-full mb-4'>Confirm this ride to start</h1>
                    <div className='flex justify-between border-2 border-yellow-400 items-center w-full p-2.5 rounded-2xl  mb-4 pr-4'>
                        <div className='flex justify-start items-center  w-4/5 '>
                            <img src={Randomperson2} className='w-15 rounded-full' />
                            <div className='ml-3 overflow-auto'>
                            <h1 className='font-bold ml-2 text-xl '>{ride?.user.fullname.firstname}</h1>
                             <h1 className='font-bold ml-2 text-xl '>{ride?.user.fullname.lastname}</h1>
                               </div>
                        </div>
                        <h1 className='font-bold text-xl w-1/5 '>2.2 KM</h1>
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
                            <h1 className='font-medium text-2xl '>₹{ride?.fare}</h1>
                            <h1 className='text-sm'>Cash Cash</h1>
                        </div>
                    </div>
                    <div className='flex-row w-full'>
                        <button  onClick={endride}className='bg-green-700 w-full flex py-2 mb-2 justify-center items-center  rounded font-medium text-xl hover:cursor-pointer hover:bg-gray-400  text-white ' >Finish Ride</button>
                        <p className='text-red-500 mt-4 text-sm font-medium '>Click on finish ride button if you have completed the payment</p>
                    </div>
                </>
    )
}
export default FinishridePannel;