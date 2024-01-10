import User from "../models/user.js"; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import token from "../models/token.js";

dotenv.config();
export const signupUser = async (request,response) => {
    try{
        
        const hashedPassword = await bcrypt.hash(request.body.password,10);
        // const u = await User.find({username:request.body.username});
        // console.log(u);
        // if(u){
        //     return response.status(200).json({msg:'Username already exist!!'});
        // }
        const user = {
            username:request.body.username,
            name:request.body.name,
            password:hashedPassword
        };
        // console.log(user);
        const newUser = new User(user);

        await newUser.save();

        return response.status(200).json({msg: 'signup successful'});
    }
    catch(error){
        console.log(error);
        return response.status(500).json(error);
    }
}

export const loginUser = async(request,response) => {
    let user = await User.findOne({username: request.body.username});
    if(!user){
        return response.status(400).json({msg: 'Username does not exist'}); 
    }
    try{
        let match = await bcrypt.compare(request.body.password, user.password);
        // console.log(match);
        if(match){
            const accessToken = jwt.sign(user.toJSON() ,process.env.SECRET_ACCESS_KEY,{ expiresIn:'15m'});
            const refreshToken = jwt.sign(user.toJSON(),process.env.SECRET_REFRESH_KEY);
            
            const newToken = new token({ token:refreshToken});
            await newToken.save();

            return response.status(200).json({ accessToken:accessToken, refreshToken:refreshToken,name:user.name,username:user.username});
        }
        else{
            return response.status(400).json({msg: 'Username and password does not match!! kindly feel the correct details!!'});
        }
    }
    catch(error){
        // console.log(error);
        return response.status(500).json({msg:'something went wrong, error while logging'});        
    }
}

export const isUserExist = async (request,response) => {
    try{
        
        const user = await User.findOne({ username:request.params.username});
        // console.log(user);
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