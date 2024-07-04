
const mongoose  = require('mongoose');
const uri = "mongodb+srv://vinoth19rfc:A0uSgqQZeq4PvQ2t@cluster0.gfffp8j.mongodb.net/?retryWrites=true&w=majority&appName=sciflare";


const connectDb = async ()=>{
    try{
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    }catch(error){
        
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}



module.exports = connectDb