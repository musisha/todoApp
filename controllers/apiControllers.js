const Todo = require('../models/apiModels');

exports.index = (req, res) => {
    Todo.get((err, todos) => {
        if (err) {
            res.json({
                status: "error",
                messsage: err,
            });
        }
        res.json({
            Task: todos
        });
    });
};

exports.postAddTask = (req, res) => {
    let todo = new Todo();
    todo.name = req.params.name;
    todo.subtaks = req.params.subtasks;
    todo.isCompleted = req.params.isCompleted;

    todo.save((err) => {
        if (err)
            res.json(err);

    res.json({
        todo: todo
         });
    });
};

exports.searchTask = (req, res) => {
    let names = req.params.name;
    Todo.find( { name: names }, (err, todo) => {
        if (err)
            res.send(err);
        res.json({
            todo: todo
        });
    });
};


//for updating
exports.updateTask = (req,res) => {
    const names = req.params.names;
    Todo.findOne({ name: names }, (err, todo) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if(!todo) {
                res.status(404).send();
            } else {
                if(req.params.names) {
                    todo.name = req.params.name;
                    todo.subtasks = req.params.subtasks;
                    todo.isCompleted = req.params.isCompleted;
                }
                todo.save((err, todo) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send();
                    } else
                    res.json({
                        messsage: 'updated',
                        todo: todo
                    });
                });
            }
        }
        

    });
};


//for updating
exports.AddSubTask = (req,res) => {
    console.log('i am here');
    const names = req.params.names;
    Todo.findOne({ name: names }, (err, todo) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if(!todo) {
                res.status(404).send();
            } else {
                if(req.params.names) {
                    let newTask = {
                    name: req.params.name,
                    isComplete: req.params.isCompleted
                    };
                    todo.subtasks.push(newTask);
                }
                todo.save((err, todo) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send();
                    } else
                    res.json({
                        messsage: 'added subtasks',
                        todo: todo
                    });
                });
            }
        }
        

    });
};

exports.marksComplete = (req,res) =>
{

    const isComplete = req.params.isComplete;
    const taskname = req.params.task;
    const subtask = req.params.subtask;

    
   if(isComplete === "true")
    {
    
       Todo.findOne({Name:taskname})
       .then(task => 
        {
            
          const subtask =  task.subtasks.find(subtask => {

                return subtask.subtask === subtask;
            });
            if(subtask)
            {
                subtask.isComplete = true;
                task.save()
                .then(sub =>
                    {
                        res.status(200).json(sub);
                    })
                    .catch(err =>
                        {
                            throw err;
                        });
            }

            

        })
        .catch(err =>
            {
                throw err;
            });
    }

};
exports.deleteTask = (req,res) =>
{
    const taskname = req.params.taskName;

    Todo.deleteOne({name:taskname})
    .then(results =>
        {
           res.status(200).json(results); 
        })
        .catch(err =>
            {
                throw err;
            });
};

exports.deleteSubTask = (req,res) =>
{
    const taskname = req.params.task;
    const subtask = req.params.subtask;
    Todo.findOne({name:taskname})
    .then(task => 
     {
         
       const subTaskIndex =  task.subtasks.indexOf(subtask => {

             return subtask.subtaskName === subtaskName;
         });
         task.subtasks.splice(subTaskIndex);
         task.save()
         .then(task  => {
             res.status(200).json(task);
         })
         .catch(err =>
            {
                throw err;
            });
         
     })
     .catch(err =>
        {
            throw err;
        });

   
};


