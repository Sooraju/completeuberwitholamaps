import captionModel from "../Model/caption.model.js";
import { validationResult } from "express-validator";
import { addcaption } from '../services/caption.service.js'
import jwt from 'jsonwebtoken'
import blacklistModel from '../Model/blaklist.model.js'
async function captionregistercontroller(req,res,next){
    // console.log("This is the request body",req.body)
            const error=validationResult(req)
            console.log(error);
            if(!error.isEmpty()){
                return res.status(400).json({error:error.array(),message:"please give all the fields properly"})
            }
            const {fullname,email,password,vehicle}=req.body
            try{
            const caption=await addcaption({fullname,email,password,vehicle})
            const token=await caption.getAccesstoken()
            // console.log("caption ",caption);
             res.status(200).cookie("captionauth",token).json({caption,token})
            }catch(e){
                console.log("Error occured while creating caption ",e)
            }
}
async function captionlogincontroller(req,res,next){
    
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array(),message:"please give all credential"})
    }
    const {email,password}=req.body
    try{
    const caption=await captionModel.findOne({email:email}).select("+password")
    if(!caption){
        return res.status(400).json("user does not exist")
    }
    
    const comparepassword=await caption.comparepasword(password)
    if(!comparepassword){
        return res.status(400).json("Invalid password")
    }
    const token=await caption.getAccesstoken()
//    console.log("the token the caption token ",token)
//    console.log("The caption data is ",caption);
    res.status(200)
    .cookie("captionauth",token)
    .json({token,caption})
}catch(error){
    return res.status(400).json({"error":error})
}
}
async function userprofile(req,res,next){
    if(!req.caption){
        return res.status(404).json({message:"caption not fouund"})
    }
    // console.log("the print",req.caption)
    res.status(200).json(req.caption)
}
async function captionlogout(req,res,next){
    const token=req.cookies.authorization || req.headers.authorization.split(" ")[1]
    if(!token){
        return res.status(400).json("token not present")
    }
    await blacklistModel.create({
        token:token
    })
    res.status(200)
    .clearCookie("captionauth")
    .json("Logen out succesfully")

}

export {captionregistercontroller,captionlogincontroller,userprofile,captionlogout}