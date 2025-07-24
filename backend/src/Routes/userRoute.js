const express = require('express')
const userRouter = express.Router();
const TaskData = require('../Models/TaskSchema');

userRouter.post('/create', async (req, res) => {
    try {

        const {group_name} = req?.body;
        const {task} = req?.body;

        if(!group_name)
            return res.status(400).send('enter group name');

        
        if (!task)
            return res.status(400).send('enter your task');


        const group = await TaskData.findOne({group_name});
        

        if(group){
            await TaskData.updateOne({group_name} ,{ $push: { allTask: {task}}});
            return res.status(200).send('task added sucessfully');
        }

        console.log('working');
        
        await TaskData.create({...req?.body , allTask: [ { task}] });

        // await TaskData.create(req.body);
        res.status(200).send('Task created sucessfully');
        

    }
    catch (err) {
        res.send(`Error: ${err.message}`)
        
    }
})

userRouter.get('/getall' , async(req , res)=>{
    try{
        const allGroupData = await TaskData.find({});
        res.status(200).send(allGroupData)
    }
    catch(err){
        res.status(400).send(`Error: ${err.message}`)
    }
})

module.exports = userRouter;