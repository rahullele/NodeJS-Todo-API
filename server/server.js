require('./config/config');
const _=require('lodash');
const express=require('express');
const bodyParser=require('body-parser');


const {ObjectID}=require('mongodb');
var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');
var {authenticate}=require('./middleware/authenticate');


var app=express();
const port=process.env.PORT;  //to deploy on Heroku, the process.env.PORT is set when running on Heroku but it is
                                      //not set when running locally, if running locally it is set to 3000.


app.use(bodyParser.json());  //body parser converts your json data into javascript objects and attaches it to
                             //'req' in app.post()

app.post('/todos',(req,res)=>{

var todo=new Todo({
  text:req.body.text
});
todo.save().then((doc)=>{

  res.send(doc);
},(e)=>{
  res.status(400).send(e);
});
});

app.get('/todos',(req,res)=>{

Todo.find().then((todos)=>{
res.send({todos});
},(e)=>{
res.status(400).send(e);
});
});

//GET /todos/1234324

app.get('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectID.isValid(id)){
    console.log('ID not valid');
    return res.status(404).send();
  }


  Todo.findById(id).then((todo)=>{

    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});  //identical to {todo:todo}
  },(e)=>{
    res.status(400).send(e);
  }).catch((e)=>console.log(e));

});

app.delete('/todos/:id',(req,res)=>{

var id=req.params.id;
if(!ObjectID.isValid(id)){
  console.log('ID not valid');
  return res.status(404).send();
}

Todo.findByIdAndRemove(id).then((todo)=>{

if(!todo)
return res.status(404).send();

res.send({todo});
},(e)=>{
  res.status(400).send();
}).catch((e)=>{console.log(e)});



});

app.patch('/todos/:id',(req,res)=>{
var id=req.params.id;
var body=_.pick(req.body,['text','completed']);  //picks the text and completed properties from req.body

if(!ObjectID.isValid(id)){
  return res.status(404).send();
}

if(_.isBoolean(body.completed) && body.completed){
body.completedAt=new Date().getTime();
}else{
body.completed=false;
body.completedAt=null;
}


Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
  //similar to findOneAndUpdate in mongodb-update.js

//new in this method is similar to returnOriginal
                                                                 //If you want the updated copy instead of original                                                             //set new to true
  if(!todo){
    return res.status(404).send();
  }

  res.send({todo});
}).catch((e)=>{
  res.status(400).send();
});

});

app.post('/users',(req,res)=>{

var body=_.pick(req.body,['email','password']);
var user=new User(body);

//user.generateAuthToken() is an instance method. Token is set on every new user created.
//User.findByToken is a model method called on the User model

user.save().then(()=>{
return user.generateAuthToken();

}).then((token)=>{

res.header('x-auth',token).send(user);  //Whenever we prefix a header with 'x-', it means it is a custom field and not
                                        //necessarily supported by http
}).catch((e)=>{

  res.status(400).send(e);

});
});

var authenticate=(req,res,next)=>{

  var token=req.header('x-auth');

  User.findByToken(token).then((user)=>{
    if(!user){
      return Promise.reject();
    }

    req.user=user;
    req.token=token;
    next();

  }).catch((e)=>{
    res.status(401).send();  //401 means authentication is required
  });

};

app.get('/users/me',authenticate, (req,res)=>{

res.send(req.user);

});

app.post('/users/login',(req,res)=>{
  var body=_.pick(req.body,['email','password']);

User.findByCredentials(body.email,body.password).then((user)=>{

return user.generateAuthToken().then((token)=>{
res.header('x-auth',token).send(user);
});

}).catch((e)=>{

res.status(400).send(e);
});

});

app.delete('/users/me/token',authenticate, (req,res)=>{
req.user.removeToken(req.token).then(()=>{
  res.status(200).send();
},()=>{
  res.status(400).send();
});
});

app.listen(port,()=>{
  console.log(`Started up at ${port}`);
});

module.exports={app};
// var newTodo= new Todo({
//   text:'Cook Dinner'
// });
//
// newTodo.save().then((doc)=>{
//   console.log('Saved Todo',doc);
// },(e)=>{
//   console.log('Unable to save todo');
// });

// var otherTodo=new Todo({
//   text:'Feed the cat',
//   completed:true,
//   completedAt:123
// });
//
// otherTodo.save().then((doc)=>{
//   console.log(JSON.stringify(doc,undefined,2));
// },(e)=>{
//   console.log('Unable to save',e);
// });
//
//
// var user=new Todo({
//   email:' abc@example.com '
// });
//
// user.save().then((user)=>{
// console.log(JSON.stringify(user,undefined,2));
// },(e)=>{
//   console.log('Unable to save',e);
// });
