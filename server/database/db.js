import mongoose from "mongoose";

const Connection = async (username, password) => {
    const URL = `mongodb://${username}:${password}@ac-xur3rca-shard-00-00.e63xpwl.mongodb.net:27017,ac-xur3rca-shard-00-01.e63xpwl.mongodb.net:27017,ac-xur3rca-shard-00-02.e63xpwl.mongodb.net:27017/?ssl=true&replicaSet=atlas-14gtgm-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
        await mongoose.connect(URL,{ useNewUrlParser: true});
        console.log('Database Connected Successfully');
    } 
    catch(error){
        console.log(`error occured,: ${error}.`);
    }
}

export default Connection;