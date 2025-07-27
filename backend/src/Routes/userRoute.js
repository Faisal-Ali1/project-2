const express = require('express')
const userRouter = express.Router();
const TaskData = require('../Models/TaskSchema');

userRouter.post('/create', async (req, res) => {
    try {

        const { group_name } = req?.body;
        const { task } = req?.body;

        if (!group_name)
            return res.status(400).send('enter group name');


        if (!task)
            return res.status(400).send('enter your task');


        const group = await TaskData.findOne({ group_name });


        if (group) {
            await TaskData.updateOne({ group_name }, { $push: { allTask: { task } } });
            return res.status(200).send('task added sucessfully');
        }


        await TaskData.create({ ...req?.body, allTask: [{ task }] });

        res.status(200).send('Task created sucessfully');


    }
    catch (err) {
        res.send(`Error: ${err.message}`)

    }
})

userRouter.get('/getall', async (req, res) => {
    try {
        const allGroupData = await TaskData.find({});
        res.status(200).send(allGroupData)
    }
    catch (err) {
        res.status(400).send(`Error: ${err.message}`)
    }
})

userRouter.patch('/update', async (req, res) => {
    try {
        const { id } = req?.body

        if (!id)
            return res.status(404).send('id is missing');

        const allTask = await TaskData.findById(id);

        const res = allTask.filter((item) => item._id != id);

        await TaskData.findByIdAndUpdate(id, { res })

        await TaskData.updateOne({ group_name }, { $filter })
    }
    catch (err) {
        res.status(400).send(`Error: ${err.message}`)
    }
})

// group delete
userRouter.delete('/delete/:id', async (req, res) => {
    try {

        const { id } = req.params;
        await TaskData.findByIdAndDelete(id);
        res.status(200).send('group deleted');
    }
    catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
})

// task delete
userRouter.delete('/deletetask/:tid/:gid' , async(req , res) => {
    try{

        const { tid , gid} = req.params;

        const group = await TaskData.findById(gid);
        const allTask = group.TaskData.filter( item => item._id !== tid);
        
        // group = allTask

    }
    catch(err){
        res.status(400).send(`Error: ${err.message}`);
    }
})



module.exports = userRouter;