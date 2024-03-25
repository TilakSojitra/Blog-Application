import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    token :{
        type: String,
        required:true
    },
    email :{
        type: String,
        required: true
    }
})

const token = new mongoose.model('token',tokenSchema);

export default token;