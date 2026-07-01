const mongoose = require("mongoose")

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Database connected successfully")
    }catch(error){
        console.log("Could not connect to database",error)
    }
}

module.exports = connectDB