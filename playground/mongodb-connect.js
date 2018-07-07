//const MongoClient=require('mongodb').MongoClient;
const {MongoClient, ObjectID}=require('mongodb');

var user={name:'andrew',age:25};
var {name}=user;
console.log(name);  //Object Destructuring

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
if(err){
  return console.log('Unable to connect to MongoDB server.');
}

console.log('Connected to mongoDB server.');

const db=client.db('TodoApp');

db.collection('Todos').insertOne({  //insertOne inserts one document
text:'Something to do',
completed:false
},(err,result)=>{
if(err)
{
  return console.log('Unable to do todo',err);
}
console.log(JSON.stringify(result.ops,undefined,2));  //ops attribute stores all the documents added, in this case it's
                                                      //just one
});


// db.collection('Users').insertOne({
//  //insertOne inserts one document
// name:'Rahul',
// age:23,
// location:'Los Angeles'
// },(err,result)=>{
// if(err)
// {
//   return console.log('Unable to insert user',err);
// }
// console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));  //ops attribute stores all the documents added, in this case it's
//                                                       //just one
// });


client.close();
});
