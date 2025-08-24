import userModel from "../Model/user.model.js";
async function  createuser({firstname,lastname,email,password}){
    if(!firstname,!lastname,!email,!password){
        throw new Error("all the credintial required")
    }
    const user=await userModel.create({
        fullname:{
            firstname:firstname,
            lastname:lastname
        },
        email:email,
        password:password
    })
   // console.log("the user is ",user)
    return user
}
export {createuser}