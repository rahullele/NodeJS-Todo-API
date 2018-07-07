//const MongoClient=require('mongodb').MongoClient;
const {MongoClient, ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
if(err){
  return console.log('Unable to connect to MongoDB server.');
}


const db=client.db('TodoApp');


//deleteMany
db.collection('Todos').deleteMany({text:'Eat Lunch'}).then((result)=>{
console.log(result);
});

//deleteOne
db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result)=>{
console.log(result);
});

//findOneAndDelete //In this method, it shows the details of the entire row which is deleted.In the above two methods,
it shows the number of how many records are deleted
db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
console.log(result);
});



//deleteMany
// db.collection('Users').deleteMany({"name":"Andrew"}).then((result)=>{
// console.log(result);
// });

// db.collection('Users').findOneAndDelete({_id:new ObjectID('5b401ab475c2f093d7bb3e67')}).then((result)=>{
// console.log(result);
// });


//find() returns a pointer to all the documents in Todos
client.close();
});
