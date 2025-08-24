import captionModel from "../Model/caption.model.js";

async function addcaption({fullname,email,password,vehicle}){
    if(!fullname&&!email&&!password&& !vehicle){
        throw new Error("enter all the credintials")
    }
    const caption=await captionModel.create(
        {
            fullname:{
                firstname:fullname.firstname,
                lastname:fullname.lastname
            },
            email:email,
            password:password,
            vehicle:{
                color:vehicle.color,
                plate:vehicle.plate,
                capacity:vehicle.capacity,
                type:vehicle.type
            }
                
        }
    )
    return caption
       
}
export {addcaption}