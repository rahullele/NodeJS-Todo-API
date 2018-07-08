const {ObjectID}=require('mongodb');

const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {user}=require('./../server/models/user');
var id='5b4169bed46eacaf1183277c';
//
// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }

// Todo.find({
//   _id:id       //Advantage due to mongoose, we don't need to write _id:new ObjectID('5b41b803b58d08c34d2e1bce').
//                //mongoose converts id as a variable into object and assigns it to _id
// }).then((todos)=>{
//   console.log('Todos',todos);
// });
//
// Todo.findOne({
//   _id:id
//
//   }).then((todo)=>{
//   console.log('Todos',todo);
//   });

// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id',todo);
// }).catch((e)=>console.log(e));

user.findById('5b4169bed46eacaf1183277c').then((user)=>{

  if(!user){
    return console.log('Id not found');
  }
  console.log(JSON.stringify(user,undefined,2));
}).catch((e)=>console.log(e));
