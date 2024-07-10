const mongoose=require('mongoose');

async function connectMongoDB(url){
  try{
    await mongoose.connect(url);
    console.log("MongoDB Successfully connected");
  }
  catch{
    console.log("Error while connecting to database!");
  }
}


module.exports={
  connectMongoDB
}