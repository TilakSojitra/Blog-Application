import User from "../models/user.js";
import Token from "../models/token.js";
import * as crypto from 'crypto';
import nodemailer from 'nodemailer'

export const sendVerificationMail = async (req, res) => {
  try {
    const email = req.body.email;
    let token;

    const existingToken = await Token.findOne({ email: email});

    if(!existingToken){
      token = crypto.randomBytes(32).toString('hex');
      const newToken = new Token({
        email: email,
        token: token
      })
      await newToken.save()
    }else{
      token = existingToken.token
    }
    

    const mailOptions = {
        from: 'pateltilak9723@gmail.com',
        to: email,
        subject: 'Complete Your Account Setup: Verify Your Email Address',
        text: `Click on this link to verify your email: http://localhost:3000/verifyemail?token=${token}&email=${email}`,
    };

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "pateltilak9723@gmail.com",
        pass: "mdbxdicfpflrjvty" 
      }
    });

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending verification email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Verification email sent.');
        }
    });
  }
  catch(error) {
    console.log(error);
    return res.status(500).json(error.message)
  }
}

export const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email:req.body.email});

    if(!user){
      return res.status(404).json({msg: 'user not found'})
    }

    const token = await Token.findOne({ email:req.body.email});

    if(!token){
      return res.status(404).json({msg: 'token not found'})
    }

    if(token.token !== req.body.token){
      return res.status(403).json({msg: 'invalid token'})
    }
    
    await User.findByIdAndUpdate(user.id, {
      isVerified : true
    } )
    return res.status(200).json({msg: 'email verified successfully'})
  }
  catch(error) {
    return res.status(500).json(error.message)
  }
}