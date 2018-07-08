var mongoose=require('mongoose');

var user=mongoose.model('Users',{
  email:{
    type:String,
    required:true,
    minlength:1,
    trim:true  //remove leading and trailing spaces
  }
});

module.exports={user};
