const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');

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

UserSchema.methods.toJSON=function(){
var user=this;
var userObject=user.toObject();

return _.pick(userObject,['_id','email']);
};

UserSchema.methods.generateAuthToken=function(){ //We are not using an arrow function so that we can use 'this' keyword.
                                                  //this points to the user object using which call is given to this method
                                                  // in server.js
  var user=this;
  var access='auth';
  var token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();

  user.tokens=user.tokens.concat([{access,token}]);

  return user.save().then(()=>{
    return token;
  });

};

UserSchema.statics.findByToken=function(token){

var User=this;
var decoded;

try{
  decoded=jwt.verify(token,'abc123');
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

var User=mongoose.model('Users',UserSchema);

module.exports={User};
