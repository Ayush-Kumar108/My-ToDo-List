/* imported mongoose */
const mongoose=require('mongoose');
/* connected to the database and added params to ignore all the deprecation warnings */
mongoose.connect('mongodb://localhost/to_do_list_db', {useNewUrlParser: true, useUnifiedTopology: true });

/* using the connection for all the further actions */
const db=mongoose.connection;

/* on error in connection */
db.on('error', console.error.bind(console, 'Error in connecting to the database!'));
/* on successful connection with the database */
db.once('open', function()
{
    console.log('Successfully connected to the database!');
});