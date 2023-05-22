import app from './index.js'
import mongoose from 'mongoose';
async function connect(){
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/social_media_platform');
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error",error);
    }
}

app.listen(3000,()=>{
    connect();
    console.log(`server is running on 3000`);
})