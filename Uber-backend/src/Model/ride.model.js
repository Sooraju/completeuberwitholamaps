import mongoose,{Schema} from "mongoose";
const rideSchema=new mongoose.Schema(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref:'user',
            required:true
        },
        caption:{
                 type:Schema.Types.ObjectId,
                 ref:'caption'//caption
        },
        pickup:{
                type:String,
                required:true
        },
        destination:{
            type:String,
            required:true
        },
        fare:{
            type:Number,
            required:true
        },
        status:{
            type:String,
            enum:['pending', 'accepted','ongoing','completed','cancelled'],
            default:'pending'
        },
        duration:{
            type:Number,
        },
        distance:{
            type:Number,
        },
        pymantID:{
            type:String,
        },
        orderId:{
            type:String
        },
        otp:{
            type:String,
            select:false,
            required:true
        }

})
const  ridemodel=mongoose.model("ride",rideSchema)

export default ridemodel;