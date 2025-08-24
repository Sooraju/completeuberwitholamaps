import React from "react";
const LiveSearchpannel=({whichactive,setaddpickuploc,setdestination,destinationres,pickupres})=>{
      console.log(pickupres);
      const arr=whichactive=='pickup'? !pickupres?[]:[pickupres.data?.structured_formatting?.main_text,pickupres.data?.structured_formatting?.secondary_text,pickupres.data?.description]:!destinationres?[]:[destinationres.data?.structured_formatting?.main_text,destinationres.data?.structured_formatting?.secondary_text,destinationres.data?.description]
    return(
      arr.map((ele,ind)=>{
            return(
                  <div key={ind} className="flex flex-col items-center justify-end  w-full border-2 border-[#eee] mt-4  bg-white rounded-2xl active:border-black  p-1"
                  onClick={()=>{
                        whichactive=='pickup'? setaddpickuploc(ele):setdestination(ele)
                  }}>
                        <div className="flex w-full items-center my-2 gap-3">
                        <h2 className="bg-[#eee] flex items-center justify-center h-9 w-10 rounded-full text-2xl ">
                              <i className="ri-map-pin-fill"></i>
                        </h2>
                        <div>
                        <h3 className="font-medium">{ele}</h3>
                       </div>
                        </div>
                  </div> 
            )
      })
    )
}
export default LiveSearchpannel;