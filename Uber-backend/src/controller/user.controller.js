import userModel from '../Model/user.model.js'
import {validationResult} from 'express-validator'
import {createuser} from '../services/user.services.js'
import addblacklist from '../services/blacklist.service.js'



async function registerusercontroller(req,res,next){
          //  console.log("this is login body",req.body)
          const error=validationResult(req)
          if(!error.isEmpty()){
               return res.status( 400).json({errors:error.array()})
          }
          
          const {fullname,email,password}=req.body
          const user=await userModel.findOne({email:email})
          if(user){
               return res.status(400).json("user already exist")
          }
         // console.log("this is full name",fullname.firstname,"thr emili0",email,"the password",password,"close name")

          const userc=await createuser({firstname:fullname.firstname,lastname:fullname.lastname,email,password})
          const token=await userc.getAccesstoken()
          const options={
               httpOnly:true,
                secure:false
                     }
          
          res.status(201).cookie("authenticate",token,options).json({token,user})
             
}

async function loginusercontroller(req,res,next){
     const error=validationResult(req)
     console.log(error)
     if(!error.isEmpty()){
          return res.status(400).json({errors:error.array()})
     }
     const {email,password}=req.body
     const user=await userModel.findOne(
        {email:email}
     ).select("+password")
     if(!user){
          return res.status(400).json("user not registered")
     }
    const passwordcheck=await user.comparepassword(password)
    if(!passwordcheck){
        return  res.status(400).json("invalid password")
    }
    const token=await user.getAccesstoken();
    const options={
     httpOnly:true,
     secure:false
    }
    console.log("THe user insile the login backend ",user);
    res.cookie("authenticate",token,options);
    res.status(201).json({
      token,
      user:{
        "firstname":user.fullname.firstname,
        "email":email,
        "_id":user._id
      }
    })
}
async function profilecontroller(req,res,next){ 
       res.status(200).json(req.user)
}
async function logoutcontroller(req,res,next){
      const token=req.cookies.authenticate|| req.headers.authorization.split(' ')[1]
      if(!token){
          return res.status(400).json("token not present")
      }
      addblacklist({token})
      res.status(200)
      .clearCookie("authenticate")
      .json("user loged out")
}
export {registerusercontroller,loginusercontroller,profilecontroller,logoutcontroller}
