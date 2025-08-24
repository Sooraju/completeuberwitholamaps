import ridemodel from '../Model/ride.model.js'
import crypto from 'crypto'
import {getdisttimefromaddress} from '../services/maps.service.js'
import { error } from 'console';
const createrideservice=async({user,pickup,destination,vehicleType})=>{
        if(!user || !pickup || !destination || !vehicleType){
            throw new Error('All fields are required')
        }
        const fare=await getFare(pickup,destination);
        const ride=await ridemodel.create({
            user,
            pickup,
            destination,
            otp:generateotp(6),
            fare:fare[vehicleType]
        })
    return ride;
}
function generateotp(num) {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}
async function getFare(pickup,destination) {
    if(!pickup || !destination){
        throw new Error("Pick up and destination are required ")
    }
    const distTime=await getdisttimefromaddress(pickup,destination)
    const baseFare={
        auto:30,
        car:50,
        motorcycle:20
    }
    const perKmRate={
        auto:10,
        car:15,
        motorcycle:8
    }
    const perMinuteRate={
        auto:2,
        car:3,
        motorcycle:1.5
    }
    const fare={
        auto:Math.round(baseFare.auto+(distTime.distance.value/1000*perKmRate.auto)+(distTime.duration.value/60*perMinuteRate.auto)),
        car:Math.round(baseFare.car+(distTime.distance.value/1000*perKmRate.car)+(distTime.duration.value/60*perMinuteRate.car)),
        motorcycle:Math.round(baseFare.motorcycle+(distTime.distance.value/1000*perKmRate.motorcycle)+(distTime.duration.value/60*perMinuteRate.motorcycle))
    }
    return fare; 
}
async function confirmrideservice(rideid,captionid){
   if(!rideid){
    throw new Error("new Ride id is required");
   }
   // Use a single, atomic operation to find and update the ride.
   // The { new: true } option returns the document after the update has been applied.
   const ride = await ridemodel.findByIdAndUpdate(rideid, {
       status: "accepted",
       caption: captionid
   }, { new: true }).populate("user").populate("caption").select('+otp');
    
   console.log("the updated ride in confirm ride service ",ride)

   if(!ride){
    throw new Error("Ride not found");
   }
  return ride;
}
const startrideservice=async({rideid,otp,caption})=>{
    if(!rideid || !otp ||!caption){
        throw new Error("the rideid or otp or caption  not present");
    }
    const ride=await ridemodel.findOne({
    _id:rideid
   }).populate("user").populate("caption").select('+otp')//caption
   if(!ride){
    throw new Error("Ride not found ")
   }
   if(ride.status!=="accepted"){
    throw new Error("Ride not Excepted")
   }
   if(ride.otp!=otp){
    throw new Error("InValid OTP ")
   }
   // .find() is for querying, not updating. Use findByIdAndUpdate instead.
   // Also, return the updated document.
   const updatedRide = await ridemodel.findByIdAndUpdate(rideid, {
        status:"ongoing",
   }, { new: true }).populate("user").populate("caption").select('+otp');//

   // Service files should not send responses. They should return data.
   return updatedRide;
}

const endrideservice = async ({ rideid, caption }) => {
      console.log("The ride id "+rideid)
    const ride = await ridemodel.findByIdAndUpdate(
        rideid,
        { status: "completed" },
        { new: true } // Return the updated document
    ).populate("user").populate("caption");

    if (!ride) {
        throw new Error("Ride not found");
    }
    return ride;
};

export {createrideservice,getFare,confirmrideservice,startrideservice, endrideservice}