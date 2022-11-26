/* this is the mongoose module */
const mongoose=require('mongoose');
/* creatig our schema, The date can also be shown in the form of string, but since we need the names of the months, it is better to show it this way */
const task_schema=new mongoose.Schema(
    {
        Description:{
            type:String
        },
        Category:{
            type:String
        },
        Due_Date:{
            type:Date
        },

    }
);
/* creating our model with "task_schema" as Schema */
const tasks=mongoose.model('tasks', task_schema);
/* exporting our model so that it can be used by index.js */
module.exports=tasks;