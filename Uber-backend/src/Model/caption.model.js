import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const captionSchema=new Schema(
    {
        fullname:{
            firstname:{
                type:String,
                required:true,
                minlength:[3,"Length of firstname should be greater than 3"]
            },
            lastname:{
                type:String,
                required:true,
                minlength:[3,"Lenght of lastname should be greater than 3"]
            }
        },
        email:{
            type:String,
            required:true,
            unique:true,
            match: [ /^\S+@\S+\.\S+$/, 'Please enter a valid email' ]
        },
        password:{
            type:String,
            required:true,
            minlength:[3,"Lenght of password should be greater than 6"]
        },
        status:{
            type:String,
            enum:["inactive","active"],
            default:"inactive"
        },
        socketId: {
            type: String,
        },
        vehicle: {
            color: {
                type: String,
                required: true,
                minlength: [ 3, 'Color must be at least 3 characters long' ],
            },
            plate: {
                type: String,
                required: true,
                minlength: [ 3, 'Plate must be at least 3 characters long' ],
            },
            capacity: {
                type: Number,
                required: true,
                min: [ 1, 'Capacity must be at least 1' ],
            },
            type: {
                type: String,
                required: true,
                enum: [ 'car', 'motorcycle', 'auto' ],
            }
           },
            location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
                  },
                coordinates: {
                type: [Number], // [longitude, latitude]
                required: true
                }
            }
    
    }
)
captionSchema.index({ location: '2dsphere' });

captionSchema.pre("save",async function(next){
    if(!this.isModified("password")) next()
        try {
            this.password=await bcrypt.hash(this.password,10)
             next()
        } catch (error) {
            console.log(error)
        }
})
captionSchema.methods.comparepasword=async function(password){
      
      return await bcrypt.compare(password,this.password)
}
captionSchema.methods.getAccesstoken=async function(){
    return jwt.sign(
        {
            _id:this._id,
        },process.env.SecretAccessToken,{expiresIn:process.env.AccessTokenExpire}
    )
}
const captionModel=mongoose.model("caption",captionSchema)
export default captionModel