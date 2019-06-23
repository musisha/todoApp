const express = require('express');
const router = express.Router();
const apiControllers = require('../controllers/apiControllers');

//get all the tasks available


//add new task
router.post('/add/:name/:subtasks/:isCompleted', apiControllers.postAddTask);

//get a specific task
router.get('/search/:name', apiControllers.searchTask);

//update task
router.put('/update-task/:names/:name/:subtask/:isComplete', apiControllers.updateTask);

//add subtaks
router.post('/subtasks/names/name/isCompleted', apiControllers.AddSubTask);

//mark task if completed
router.patch('/isComplete/:task/:subtask/:isComplete',apiControllers.marksComplete);

//delete tasks
router.delete('/delete/:name',apiControllers.deleteTask);

//delete sub tasks
router.delete('/delete-subtask/:task/:subtask',apiControllers.deleteSubTask);



module.exports = router;