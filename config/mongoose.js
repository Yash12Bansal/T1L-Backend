var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/T1LifeDB')
const db = mongoose.connection;
db.on('error',console.error.bind(console,'error dbs'));
db.once('open',function(){
    console.log('Success connection the database mongo'); 
});


module.exports = db;