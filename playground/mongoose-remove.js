const {ObjectID}=require('mongodb');

const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {user}=require('./../server/models/user');
var id='5b4169bed46eacaf1183277c';

// Todo.remove({}).then((result)=>{  //Removes all the records in the database
//   console.log(result);
// })

//Todo.findOneAndRemove - This shows the data which is deleted. In the above method .remove(), it just shows the number
//indicating how many records are deleted.

// Todo.findOneAndRemove(_id:'5b42d3f667bab49b636f4029').then((todo)=>{
// console.log(todo);
// });

Todo.findByIdAndRemove('5b42d3f667bab49b636f4029').then((todo)=>{
console.log(todo);
});
