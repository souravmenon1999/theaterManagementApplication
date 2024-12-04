import mongoose from "mongoose";



async function dbConfig() {

    try {
         const connect = await mongoose.connect('mongodb+srv://finalProject:finalProject123@cluster0.pxd9mr9.mongodb.net/');
         console.log('App Connected to DB successfully');
    } catch (error) {

        console.error("Failed to connect with MongoDB:", error.message);
        throw new Error("connectDB failed: " + error.message);
        
    }
}

export default dbConfig;