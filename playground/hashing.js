const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

var password='123abc!';
// bcrypt.genSalt(10,(err,salt)=>{
//   bcrypt.hash(password,salt, (err,hash)=>{ //advantage of bcrypt, it automatically generates the random salt
//                                             //10 indicates the number of rounds for random generation of salt
//                                             //more the rounds, more secure it is
//    console.log(hash);
//   });
// });


var hashedPassword='$2a$10$nF13bYouagjUzSKVsCzYRe6mDh5OBPFyW.hFH2Faya/yEE6WTeOl6';

bcrypt.compare(password,hashedPassword,(err,result)=>{
console.log(result);
});
// var data={
//   id:5
// };
//
// var token=jwt.sign(data,'123abc');    //go to jwt.io in your browser, it has a facility where you can put your encoded hash,
//                                        //it will decode the hash for you.
// console.log(token);
//
// var decoded=jwt.verify(token,'123abc');
// console.log('decoded',decoded);

// var message='I am user no 3';
// var hash=SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data={
//   id:4
// };
//
// var token={
//   data,
//   hash:SHA256(JSON.stringify(data)+'somesecret').toString()  //SHA256() takes a string data and returns an object
//                                                              // so we use toString() to convert it to a string
// };
//
// token.data.id=5;
// token.hash=SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash=SHA256(JSON.stringify(token.data)+'somesecret').toString();
// if(resultHash===token.hash){
//   console.log('Data was not changed.');
// }else{
//   console.log('Data was changed. Do not trust!!');
// }
