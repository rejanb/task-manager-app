
// const mongoose = require('mongoose');
const express = require('express')
const app = express();
const mongoose = require('./db/mongoose');
const bodyParser = require('body-parser')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTION, PUT, PATCH, DELETE" );
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// const DB = 'mongodb+srv://rejan:rejan@task-manager.uzbwi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'



// mongoose.connect(DB,{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology:true,
//     useFindAndModify:false
// }).then(()=>{
//     console.log(`connected`)
// }).catch((err)=>{
//     console.log('not connected')
// })
//load modules 
const {List} = require('./db/models/list.model');
const {Task} = require('./db/models/task.model');

app.use(bodyParser.json())

app.get('/',(req, res)=>{
    res.send("hellowsdfsorld")
})


/* ROUTE HANDLERS */

/* LIST ROUTES */

/**
 * GET /lists
 * Purpose: Get all lists
 */
 app.get('/lists', (req, res) => {
    // We want to return an array of all the lists that belong to the authenticated user 
    List.find().then((lists) => {
        res.send(lists);
    }).catch((e) => {
        res.send(e);
    });
})



/**
 * POST /lists
 * Purpose: Create a list
 */
 app.post('/lists', (req, res) => {
    // We want to create a new list and return the new list document back to the user (which includes the id)
    // The list information (fields) will be passed in via the JSON request body
    let title = req.body.title;

    let newList = new List({
        title,
        _userId: req.user_id
    });
    newList.save().then((listDoc) => {
        // the full list document is returned (incl. id)
        res.send(listDoc);
    })
});



// POST/Lists
// Purpose: Create a list

app.post('/lists', (req, res)=>{
    //create a list and return the new list document back ti the user which includes the id
    //list
})



app.patch('/lists/:id', (req, res)=>{
    List.findOneAndUpdate({ _id: req.params.id, _userId: req.user_id }, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    });
})



app.delete('/lists/:id', (req, res) => {
    // We want to delete the specified list (document with id in the URL)
    List.findOneAndRemove({
        _id: req.params.id,
    }).then((removedListDoc) => {
        res.send(removedListDoc);

    })
});




/**
 * GET /lists/:listId/tasks
 * Purpose: Get all tasks in a specific list
 */
 app.get('/lists/:listId/tasks',  (req, res) => {
    // We want to return all tasks that belong to a specific list (specified by listId)
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    })
});



/**
 * POST /lists/:listId/tasks
 * Purpose: Create a new task in a specific list
 */
 app.post('/lists/:listId/tasks',  (req, res) => {
    // We want to create a new task in a list specified by listId
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    })

})




app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    // We want to update an existing task (specified by taskId)
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
            $set: req.body
        }
    ).then(() => {
        res.send({ message: 'Updated successfully.' })
    })
})





/**
 * DELETE /lists/:listId/tasks/:taskId
 * Purpose: Delete a task
 */
 app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    })

 })


app.listen(3000,()=>{
    console.log("server is listening at port 3000")
})
