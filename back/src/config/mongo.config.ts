import mongoose from "mongoose";

export const setMongoConnection = () => {
    const mongoUrl = `mongodb://${process.env["MONGO_HOST"] || "localhost"}:27017/ms-db`;
    console.log(mongoUrl)
    mongoose.connect(mongoUrl, {
        autoIndex: true
    }, (err) => {
        if(err) {
            console.error(err);
        } else {
           console.log("Connecté à la base de données"); 
        }
        
    })
} 