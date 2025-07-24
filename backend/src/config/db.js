const mongoose = require('mongoose');


async function main(){
    try{
        await mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING);
    }
    catch(err){
        console.log('Error: ', err.message);
        
    }
}

module.exports = main;