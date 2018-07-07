//const MongoClient=require('mongodb').MongoClient;
const {MongoClient, ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
if(err){
  return console.log('Unable to connect to MongoDB server.');
}


const db=client.db('TodoApp');

db.collection('Todos').findOneAndUpdate(
  {
    _id:new ObjectID('5b4083e767bab49b636ed4a0')
  },{
   $set:{
     completed:true
   }
 },{
   returnOriginal:false  //returnOriginal is by default set to true which means the method will return original document and
                         // and not the updated one so we need to set it to false.
 }
).then((result)=>{
console.log(result);
});

// db.collection('Users').findOneAndUpdate(
//   {
//     _id:new ObjectID('5b400e34fc4a51913bcaaa17')
//   },{
//    $set:{
//      "name":"Mike"
//    },
//  $inc:{
//     age:1   //increment age by 1
//  }},
//  {
//    returnOriginal:false  //returnOriginal is by default set to true which means the method will return original document and
//                          // and not the updated one so we need to set it to false.
//  }
// ).then((result)=>{
// console.log(result);
// });

//find() returns a pointer to all the documents in Todos
client.close();
});

//5b400e34fc4a51913bcaaa17
