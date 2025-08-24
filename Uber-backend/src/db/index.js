import mongoose from "mongoose";

const connectdb=async ()=>{
    try {
        const connectioninstance=await mongoose.connect(process.env.MONGODB_URI)
        console.log(`mongodb connectd db host: ${connectioninstance.connection.host}`)
    } catch (error) {
       console.log("Mongodb connection Error");
        
    }
}
export default connectdb