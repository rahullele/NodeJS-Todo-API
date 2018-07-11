const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');
const bcrypt=require('bcryptjs');

var UserSchema=new mongoose.Schema(
  {
    email:{
      type:String,
      required:true,
      minlength:1,
      trim:true,  //remove leading and trailing spaces
      unique:true, //doesn't allow a duplicate email to be entered. If an email id is already in use, you can't use that email id.
      validate:{
        // validator:(value)=>{
        //   return validator.isEmail(value);
        // } //The above code can also be written as-
        isAsync:false,
        validator:validator.isEmail,
        message:'{VALUE} is not a valid email'
      }

    },
    password:{
      type:String,
      require:true,
      minlength:6
    },
    tokens:[{
      access:{
        type:String,
        required:true
      },
      token:{
        type:String,
        required:true
      }
    }]
  }
);

UserSchema.methods.toJSON=function(){  //toJSON and generateAuthToken are instance methods so these are called on .methods
var user=this;
var userObject=user.toObject();

return _.pick(userObject,['_id','email']);
};

UserSchema.methods.generateAuthToken=function(){ //We are not using an arrow function so that we can use 'this' keyword.
                                                  //this points to the user object using which call is given to this method
                                                  // in server.js
  var user=this;
  var access='auth';
  var token=jwt.sign({_id:user._id.toHexString(),access},process.env.JWT_SECRET).toString();

  user.tokens=user.tokens.concat([{access,token}]);

  return user.save().then(()=>{
    return token;
  });

};

UserSchema.methods.removeToken=function(token){
var user=this;

return user.update({
$pull:{
  tokens:{token}
}
});
};

UserSchema.statics.findByCredentials=function(email,password){

var User=this;

return User.findOne({email}).then((user)=>{
  if(!user){
    return Promise.reject();
  }

 return new Promise((resolve,reject)=>{
   bcrypt.compare(password,user.password,(err,res)=>{
     if(res){
     resolve(user);
   }
     else{
     reject();
   }
   });
 });
 });
};


UserSchema.statics.findByToken=function(token){  //This is a model method. Model methods are called on .statics

var User=this;
var decoded;

try{
  decoded=jwt.verify(token,process.env.JWT_SECRET);
}catch(e){
   // return new Promise((resolve,reject)=>{
   //    reject();
   // });
   return Promise.reject(); //This statement and the above code mean the same
}
return User.findOne({
'_id':decoded._id,
'tokens.token':token,
'tokens.access':'auth'
});
};


UserSchema.pre('save',function(next){  //This is mongoose middleware which helps you to do something before or after an event
                                        //Here, we want to hash the password before saving to the database
var user=this;
if(user.isModified('password')){  //We need to calculate and store the hash only when password is modified. There can be
                                  //a case where email is modified but password is untouched but the pre method will be called
                                  //even in that case. Rather it will be called everytime a post request is sent
                                  //To avoid that we use if(user.isModified('password')) to check if the password is modified
                                  //We need to calculate and store the hash only when the password is modified

  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(user.password,salt, (err,hash)=>{
                                               //advantage of bcrypt, it automatically generates the random salt
          user.password= hash;                    //10 indicates the number of rounds for random generation of salt
          next();                                    //more the rounds, more secure it is

    });
  });

}else{
next();
}

});



var User=mongoose.model('Users',UserSchema);

module.exports={User};
