import mongoose from 'mongoose';

class CaptainDocument extends mongoose.Document {
    firstname : String;
    lastname : String;
    email : String;
    password : String;
    phone : String;
    birthdate : Date;
    gender : Boolean;
}

const captainSchema = new mongoose.Schema({
    firstname : {
        type : String
    },
    lastname : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    phone : {
        type : String
    },
    birthdate : {
        type : Date
    },
    gender : {
        type : Boolean
    }
});

export const Captain = mongoose.model<CaptainDocument>("Captain", captainSchema);