const jwt=require('jsonwebtoken')
const verify=(req,res,next)=>{
    const token=req.header('access-token')
    if(!token){
        res.status(401).json({
            status:401,
            message:"Access Denied"
        })

    }
    try{
        const verified=jwt.verify(token,process.env.SECRET)
        console.log('Verification middleware',verified);
        req.user=verified,
        next()
    }
    catch(err){
        res.status(400).json({
            status:400,
            message:err.message.toString()
        })
    }

}
module.exports=verify