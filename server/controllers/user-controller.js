import User from "../models/user.js"; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import token from "../models/token.js";
import user from "../models/user.js";

dotenv.config();
export const signupUser = async (request,response) => {
    try{
        
        const hashedPassword = await bcrypt.hash(request.body.password,10);

        const user = {
            username:request.body.username,
            name:request.body.name,
            password:hashedPassword,
            email:request.body.email
        };
        const newUser = new User(user);
    
        await newUser.save();

        return response.status(200).json({msg: 'signup successful'});
    }
    catch(error){
        return response.status(500).json(error);
    }
}

export const loginUser = async(request,response) => {
    let user = await User.findOne({email: request.body.email});
    if(!user){
        return response.status(404).json({msg: 'Email does not exist'}); 
    }
    try{
        let match = await bcrypt.compare(request.body.password, user.password);
        if(match){
            const accessToken = jwt.sign(user.toJSON() ,process.env.SECRET_ACCESS_KEY,{ expiresIn:'15m'});

            return response.status(200).json({ accessToken:accessToken, name:user.name,username:user.username,email:user.email, isVerified:user.isVerified});
        }
        else{
            return response.status(400).json({msg: 'Email and password does not match!! kindly feel the correct details!!'});
        }
    }
    catch(error){
        return response.status(500).json({msg:'something went wrong, error while logging'});        
    }
}

export const isUserExist = async (request,response) => {
    try{
        
        const user = await User.findOne({ username:request.params.username});
       
        if(user){
            return response.status(200).json(true);
        }
        else{
            return response.status(200).json(false)
        }
    }
    catch(error){
        return response.status(500).json(error);
    }
}

export const isEmailExist = async (request,response) => {
    try{
        
        const user = await User.findOne({ email:request.params.email});
      
        if(user){
            return response.status(200).json(true);
        }
        else{
            return response.status(200).json(false)
        }
    }
    catch(error){
        return response.status(500).json(error);
    }
}

export const getLoggedinUser = (request, response) => {
    try{  
        delete request.user.password
        return response.status(200).json(request.user)
    }
    catch(error){
        return response.status(500).json(error);
    }
}
