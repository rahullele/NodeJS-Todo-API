var mongoose=require('mongoose');

mongoose.Promise=global.Promise;

let db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mlab: 'mongodb://abhishek:abhi123@ds131551.mlab.com:31551/todoapp123'
};
mongoose.connect( db.localhost || db.mlab);
//mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports={mongoose};
