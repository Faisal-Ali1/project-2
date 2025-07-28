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
userRouter.post('/deletetask', async (req, res) => {
    try {

        if (!req?.body?.taskId)
            return res.status(400).send('taskId is missing');

        if (!req?.body?.groupId)
            return res.status(400).send('groupId is missing');

        const { taskId, groupId } = req?.body;

        const group = await TaskData.findById(groupId);

        const ans = group?.allTask?.filter(item => item._id != taskId);

        // group.allTask = ans;
        // await group.save()

        await TaskData.findByIdAndUpdate(groupId, { allTask: ans });
        res.status(200).send("tasked removed sucessfully");


        // group = allTask

    }
    catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
})

userRouter.patch('/updatetask/:taskId/:groupId', async(req, res) => {

    try {
        const { taskId, groupId } = req?.params;
        

        if (!taskId)
            return res.status(400).send('id is missing');

        if (!req?.body?.newTask) {
            return res.status(400).send('enter task for updation');
        }

        const { newTask } = req?.body;

        const group = await TaskData.findById(groupId);

         group?.allTask?.forEach(item => {
            if(item._id == taskId){
                item.task = newTask;
            }
       });

     const data =  await TaskData.updateOne( {_id:groupId }, { allTask: group.allTask});

        res.status(200).json({
            message:"Sucessfully updated",
            data: data
        });

    }
    catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
})



module.exports = userRouter;