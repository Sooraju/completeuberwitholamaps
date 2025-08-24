import mongoose,{Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userschema=new Schema(
    {
        fullname:{
            firstname:{
                type:String,
                required:true,
                minlength:[3,'Length of firstname must be more than 3']
            },
            lastname:{
                type:String,
                minlength:[3,'Length of lastname must be more than 3']
            }
        },
        email:{
                type:String,
                required:true,
                unique:true,
                minlength:[5,"Email must be atlist 5 character long"]
        },
        password:{
            type:String,
            required:true,
            select:false
        },
        socketId:{
            type:String,
        }

    }
)
userschema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
        try{
            this.password =await bcrypt.hash(this.password, 10);
             next() 
        }catch(error){
            return next(error)
        }
           
})


userschema.methods.getAccesstoken=async function(){
    return jwt.sign({
        _id:this._id,
        fullname:this.fullname,
        email:this.email     
    },process.env.SecretAccessToken,{expiresIn:process.env.AccessTokenExpire})
}
userschema.methods.comparepassword=async function(password){
    console.log(password)
    console.log(this.password)
    return await bcrypt.compare(password,this.password)
}
const userModel=mongoose.model("user",userschema)

export default userModel