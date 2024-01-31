const router=require('express').Router()
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const User=require('../../models/user')
require('dotenv').config()

const secret=process.env.SECRET
router.post('/register',async (req,res)=>{
    try{
        const user=req.body;
        const {name,email,password}=user
       const isUserExists=await User.findOne({email:email})
       if(isUserExists){
       return res.json('User Already available,Try Login');
       } 
       const hashedPassword=await bcrypt.hash(password,10)
       const registeredUser=await User.create({
        name,
        email,
        password:hashedPassword
       })
       res.json({
        status:200,
        message:"User Registered Successfully"
       })

    }
    catch(err){
        console.log(err);
        res.status(400).json({
            status:400,
            message:err.message.toString()
        })

    }
})
router.post('/login',async(req,res)=>{
    try{
        const user=req.body;
    const {email,password}=user
    const isUserExists=await User.findOne({email})
    if(!isUserExists){
      return  res.status(404).json('No user Found, Register')
    }
    const isValidPassword=await bcrypt.compare(password,isUserExists?.password)
    if(!isValidPassword){
        res.status(401).json({
            status:401,
            message:"Invalid Credentials"
        })
    }
    const token=jwt.sign({_id:isUserExists?._id},secret,{expiresIn:'5h'})
    res.header('auth-token',token).json({
        status:200,
        accessToken:token,
        message:token
    })
   
    }catch(err){
        console.log(err);
        res.status(400).json({
            status:400,
            message:err.message.toString()
        })
    }

})
module.exports=router