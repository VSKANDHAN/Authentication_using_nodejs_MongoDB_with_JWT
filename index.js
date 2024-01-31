const express=require('express')
require('dotenv').config()
const connect=require('./config/db')
const auth=require('./routes/auth/auth')
const authVerify=require('./routes/auth/authVerify')
require('dotenv').config()
const app=express()

app.use(express.json())

app.use('/user',auth)

app.get('/',authVerify,(req,res)=>{
   res.json("Welcome To Home Page")
})
app.listen(5000,()=>{
    console.log('Server Started at the port 5000');
})