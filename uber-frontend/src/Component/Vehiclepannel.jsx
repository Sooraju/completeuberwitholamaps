import React from "react";
import carimage from '../assets/images/carimage.png'
import autoimage from '../assets/images/autoimage.png'
import bikeimage from '../assets/images/bikeimage.png'
const Vehiclepanel = ({ disttime,setchoosevehiclepanel, setvehicaldetailpanel,setvehicletype }) => {
    return (
        <>
            <h1 className='w-full text-2xl text-center' onClick={(e) => { setchoosevehiclepanel(false) }}>
                <i className="ri-arrow-down-s-line"></i></h1>
            <h1 className='font-semibold text-2xl'>Choose a Vehicle</h1>
            <div onClick={() => { setvehicaldetailpanel(true);setvehicletype('car') }} className='flex flex-row mt-2 border-2 bg-white border-gray-300  active:border-black justify-start items-center p-1 rounded-xl'>
                <img src={carimage} className='h-12' />
                <div className='w-1/2 ml-2'>
                    <h1 className='font-bold text-sm'>UberGo <span>
                        <i className="ri-user-fill"></i></span>4</h1>
                    <h1 className='text-sm font-medium'>2 mins away</h1>
                    <h1 className='text-sm'>Affordable, compact rides</h1>
                </div>
                <h1 className='font-bold text-xl'>₹{disttime?.car}</h1>
            </div>
            <div onClick={() => {setvehicaldetailpanel(true);setvehicletype('motorcycle')}} className='flex flex-row mt-2 border-2 bg-white border-gray-300  active:border-black justify-start items-center p-1 rounded-xl'>
                <img src={bikeimage} className='h-12' />
                <div className='w-1/2 ml-2'>
                    <h1 className='font-bold text-sm'>Moto <span><i className="ri-user-fill"></i></span>1</h1>
                    <h1 className='text-sm font-medium'>3 mins away</h1>
                    <h1 className='text-sm'>Affordable, motorcycle rides</h1>
                </div>
                <h1 className='font-bold text-xl'>₹{disttime?.motorcycle}</h1>
            </div>
            <div onClick={() => {setvehicaldetailpanel(true);setvehicletype('rides')}} className='flex flex-row mt-2 border-2 border-gray-300  active:border-black justify-start items-center bg-white  p-1 rounded-xl'>
                <img src={autoimage} className='h-12 ml-2' />
                <div className='w-1/2 ml-5'>
                    <h1 className='font-bold text-sm'>UberGo <span><i className="ri-user-fill"></i></span>3</h1>
                    <h1 className='text-sm font-medium'>3 mins away</h1>
                    <h1 className='text-sm'>Affordable, Auto rides</h1>
                </div>
                <h1 className='font-bold text-xl'>₹{disttime?.auto}</h1>
            </div>
        </>
    )
}
export default Vehiclepanel;