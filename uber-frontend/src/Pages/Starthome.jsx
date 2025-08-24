import React from 'react'
import uberLogo from '../assets/images/uberlogo.png'
import uberbg from '../assets/images/uberbg.jpg'
import {Link} from 'react-router-dom'
const Starthome=()=>{
return(
    <>
    <div  className="flex    pt-6 flex-col h-screen justify-between"
    style={{
        // backgroundImage:`url(${uberbg})`,
        backgroundImage:`url(${uberbg})`,
        backgroundSize:'contain',
        backgroundPosition:'center',
    }}>
        <img  className="w-32 pl-8 " src={uberLogo} alt="thr imagr of logo"/>
        <div className="bg-[#f8f5f5] text-center p-5 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">Get Started with Uber</h1>
            <Link to='/loginuser' className='inline-block bg-black text-white px-6 py-3 w-full rounded'>Continue</Link>
        </div>
        </div>
    </>
)
}
export default Starthome;