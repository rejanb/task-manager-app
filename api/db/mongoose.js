//This file will handel connection logic to mongo db


const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

const DB = 'mongodb+srv://rejan:rejan@task-manager.uzbwi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'



mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log(`connected`)
}).catch((err)=>{
    console.log('not connected')
})


module.exports ={mongoose}
