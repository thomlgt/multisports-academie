import mongoose from "mongoose";

export class AdminDocument extends mongoose.Document {
    username : String;
    password : String;
}

const adminSchema = new mongoose.Schema({
    username : {
        type: String
    },
    password : {
        type: String
    }
})

export const Admin = mongoose.model<AdminDocument>("Admin", adminSchema);