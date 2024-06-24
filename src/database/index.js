import { error } from "console";
import mongoose from "mongoose";

const connectToDB = async ()=>{
    const url = 'mongodb+srv://manjay6428:hodJEmKkn1pNaiRi@cluster0.t4wovbj.mongodb.net/';

    mongoose.connect(url).then(()=> {
        console.log("Connected to MongoDB successfully")
    }).catch(error=> console.log(error));
}

export default connectToDB;