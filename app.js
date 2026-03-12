import mongoose from "mongoose"
import express from "express"
import cors from "cors"

import { User, Task } from "./db.js"

const app = express()
app.use(cors())
app.use(express.json())

app.post("/user", async function(req, res){
    const name = req.body.name
    const email = req.body.email
    let response = await User.findOne({ email: email })
    if (!response) {
        response = await User.create({
            "name" : name,
            "email" : email
        });
    }

    res.json({
        message: "Work",
        userId: response._id
    })

});

app.get("/getuser", async function(req, res){
    const userList = await User.find({})
    res.json({
        user : userList
    })
});


app.get("/tasks/:userID", async function(req, res){
    if (!mongoose.Types.ObjectId.isValid(req.params.userID)) {
        return res.json({ task: [] })
    }

    const tasks = await Task.find({ 
        userId: req.params.userID 
    });
    res.json({ 
        task: tasks
    })
});

app.post("/task", async function(req, res){
    if (!req.body.userId || !mongoose.Types.ObjectId.isValid(req.body.userId)) {
        return res.status(400).json({ message: "Valid userId is required" })
    }

    if (!req.body.content || !req.body.content.trim()) {
        return res.status(400).json({ message: "content is required" })
    }

    const task = await Task.create({ 
        userId: req.body.userId, 
        content: (req.body.content || "").trim(), 
        checkbox: false 
    })
    res.json({ task })
})

app.delete("/task/:taskId", async function(req, res){
    await Task.findByIdAndDelete(req.params.taskId)
    res.json({ message: "Deleted" })
})


app.listen("3000", async function(){
    await mongoose.connect("mongodb://localhost:27017/midsem")
    console.log("Listening on port 3000....")
})
