/* This is for importing express */
const express = require('express');
/* the port on which the server will be working */
const port = 8000;
/* instantializing the app */
const app = express();
/* database Configuration */
const db = require('./config/mongoose');
/* database model */
const tasks = require('./models/task')

/* the routes shouldn't be case sensitive */
app.set('case sensitive routing', false);
/* views folder */
app.set('views', './views');
/* setting up viewing engine to ejs */
app.set('view engine', 'ejs');
/* using url encoder to get the query params */
app.use(express.urlencoded({ 'extended': true }));
/* assets folder middleware */
app.use(express.static('assets'));

/* homepage of our app */
app.get('/', function (req, res)
{
    /* finding all the documents in database to show them up on the page */
    tasks.find({}, function (error, task)
    {
        /* the variable "task" will be used as database in the ejs file */
        if (error)/* if error occurs */
        {
            console.log('There was an error in fetching the tasks from the databse');
            return;
        }
        /* else */
        var options =
        {
            title: "Dockett -TODO App",
            task_list:task,/* task list will link the database with out ejs file */
        }
        /* rendering our page on success */
        return res.render('to_do_list.ejs', options);
    })


});
/* route for creating a task */
app.post('/create-task', function (req, res)
{
    /* creating in the database */
    tasks.create(req.body, (error, new_task) =>
    {
        /* if there is some error in creating the task */
        if (error)
        {
            console.log('error in creating a task!');
            return;
        }
        /* else return to the home page "/" can also be used in place of back */
        return res.redirect('back');
    });
});
/* deleting a task */
app.get('/delete-tasks/', function(req, res)
{
    /* I will store all the ids in this array and will be using these ids to delete from the database */
    let ids=new Array();
    for(let i in req.query)
    {
        ids.push(req.query[i]);
    }
    /* added ids */
    /* deleting many documents with given ids together. "$in" searches for "any" id from the given list of ids */
    tasks.deleteMany({_id:{$in:ids}}, function(error)
    {
        if(error)/* on error */
        {
            console.log('Unable to delete from the database.');
            return;
        }
        /* if no error */
        return res.redirect('back');
    })
});

/* listening to the port 8000 */
app.listen(port, (error) =>
{
    /* on error */
    if (error)
    {
        console.log('There was an error in starting the server');
        return;
    }
    /* on success */
        console.log(`Server is running at port ${port}`);
});