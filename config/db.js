const {Mongoose, default: mongoose}=require('mongoose')
const MongoDBURI=process.env.MONGODB_URI

const connect= mongoose.connect(MongoDBURI).then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
})
module.exports=connect