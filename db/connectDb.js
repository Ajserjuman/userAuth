const mongoose = require("mongoose");

const connectDB = async () => {
    try {   
        console.log('reached here');
        const conn = await mongoose.connect('mongodb://localhost:27017/userAuth',{}
        );
        console.log(`MongDb connected:${conn.connection.host}`);
    }
    catch (error){
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB