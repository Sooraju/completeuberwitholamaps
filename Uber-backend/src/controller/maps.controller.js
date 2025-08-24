
import {getlnglatfromaddress,getdisttimefromaddress,getlocsuggestions} from '../services/maps.service.js'
const mapslatlongcontroller=async(req,res,next)=>{
              const {address}=req.query;
              
            try{
                 const response=await getlnglatfromaddress(address) 
                 res.status(200).json(response)
            }catch(error){
                console.log("some error has occured in controller ",error)
                     res.status(401).json(error)
            }  

}
const mapsdisttimecontroller=async(req,res,next)=>{
     const {startaddress,endaddress}=req.query;
     try{
          const duradist=await getdisttimefromaddress(startaddress,endaddress)
          // console.log("Duration Dist ",duradist)
          res.status(200).json(duradist)     
     }catch(error){
           console.log("some error has occured in controller ",error)
                     res.status(401).json(error)
     }
}
const mapslocsuggestioncontroller=async(req,res,next)=>{
     try{
          const thesuggestions=await getlocsuggestions(req)
          // console.log("the suggestions ",thesuggestions)
          res.status(200).json(thesuggestions)
     }catch(error){
          console.log("some error has occured in controller ",error)
          res.status(401).json(error)
     }
}
export {mapslatlongcontroller,mapsdisttimecontroller,mapslocsuggestioncontroller}