import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, select: false},
    googleId: {type: String},
})

export const User = mongoose.models?.User || mongoose.model("User",userModel);