import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:null
}
export const authSlice=createSlice(
   { name:"authservice",
    initialState,
     reducers:{
        login:(state,actions)=>{
            state.status=true;
            state.userData=actions.payload;
            console.log("Inside context ",state.userData)
        },
        logout:(state)=>{
               state.status=false;
               state.userData=null;
        }
     }}

)
export const {login,logout}=authSlice.actions;
export default authSlice.reducer;