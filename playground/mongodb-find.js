//const MongoClient=require('mongodb').MongoClient;
const {MongoClient, ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
if(err){
  return console.log('Unable to connect to MongoDB server.');
}


const db=client.db('TodoApp');


// db.collection('Todos').find({
//   _id:new ObjectID('5b400d5dcdb8e19113b06763')
// }).toArray().then((docs)=>{
// console.log('Todos');
// console.log(JSON.stringify(docs,undefined,2));
// },(err)=>{
//   console.log('Unable to fetch todos',err);
// });

db.collection('Todos').find().count().then((count)=>{
console.log(`Todos count:${count}`);

},(err)=>{
  console.log('Unable to fetch todos',err);
});

db.collection('Users').find({name:'Rahul'}).toArray().then((docs)=>{
  console.log('Users with name Rahul');
  console.log(JSON.stringify(docs,undefined,2));

},(err)=>{
  console.log('Unable to fetch todos',err);
});

//find() returns a pointer to all the documents in Todos
client.close();
});
