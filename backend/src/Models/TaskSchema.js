const mongoose = require('mongoose');
const { Schema } = mongoose;


const TaskSchema = new Schema({
    group_name: {
        type: String,
        required: true
    },
    allTask: [
        {
            task: {
                type: String,
                required: true
            }
        }
    ]

})

const TaskData = mongoose.model('TaskData', TaskSchema);

module.exports = TaskData;