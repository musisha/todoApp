const mongoose = require('mongoose');


const TodoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()

    },
    subtasks: [ {name: { type: String, required: true } }, { isComplete: { type: Boolean, required: true} } ],
        // list: [{
        //     listId: {type: this.schema.Types.ObjectId, ref:'Task', required: true},
        //     name: {type: String, required: true},
        //     isComplete: {type: Boolean, required: true}
        // }]
    isCompleted: Boolean
});

// TodoSchema.methods.addSubTask = function(subtask)
// {
//     const subTaskIndex = this.subtasks.list.findIndex(st => {
//         return st.listId.toString() === 
//     })

//     let newTask = 1
//     const updatedSubTaskList = [...this.subtask.list]
//     if()
// }


const Todo = module.exports = mongoose.model('todo', TodoSchema);

module.exports.get = function (callback, limit) {
    Todo.find(callback).limit(limit);
};