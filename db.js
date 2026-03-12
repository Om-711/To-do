import mongoose, { model } from "mongoose";    


const UserSchema = new mongoose.Schema({
    name : String,
    email : String
});


const TaskSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content: String,
    checkbox : Boolean
})

export const Task = mongoose.model("Task", TaskSchema)
export const User = mongoose.model("User", UserSchema)