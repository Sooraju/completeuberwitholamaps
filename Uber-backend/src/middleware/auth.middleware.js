
import userModel from "../Model/user.model.js"
import blacklistModel  from "../Model/blaklist.model.js"
import jwt from 'jsonwebtoken'
import captionModel from "../Model/caption.model.js"
async function userauthenticate(req,res,next){
    const token=req.cookies.authenticate|| req.headers.authorization?.split(" ")[1]
    console.log("i am inside the user authentication ");
   // console.log(req.headers.authorization?.split(" ")[1])
    if(!token){
        return res.status(400).json("token not present")
    }
    const tokencheck=await blacklistModel.findOne({token:token})
    if(tokencheck){
        return res.status(400).json("user loged out")
    }
    const decoded=jwt.verify(token,process.env.SecretAccessToken)
   try {
    const user=await userModel.findOne({_id:decoded._id})
    req.user=user
    return next()
   } catch (error) {
       res.status(400).json({message:"unautherised"})
   }

}
async function captionauthenticate(req,res,next){
       const token=req.cookies.authorization || req.headers.authorization?.split(" ")[1]
      // console.log('the token inside ',token)
       if(!token){
            return res.status(400).json("token not present")
       }
       const findtokenblack=await blacklistModel.findOne({token:token})
       if(findtokenblack){
         return res.status(400).json("user already loged out")
       }
       
       try {
        const decode=jwt.verify(token,process.env.SecretAccessToken)
        //console.log("the decoded ",decode)
        const caption=await captionModel.findOne({_id:decode._id})
        if(!caption){
         return res.status(400).json("caption not present")
        }
       // console.log(caption)
        req.caption = caption
        return next()
       } catch (error) {
        res.status(400).json({"error in middleware":error})
       }
}
export {userauthenticate,captionauthenticate}