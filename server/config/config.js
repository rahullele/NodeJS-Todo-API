var env=process.env.NODE_ENV || 'development';

console.log('env ****',env);

if(env==='development' || env==='test'){
var config=require('./config.json'); //Here the entire data in the json file is stored as a javascript object in config
                                      //so JSON.parse is not required
var envConfig=config[env];          //Here envConfig is set as per the current environment i.e. test or development

Object.keys(envConfig).forEach((key)=>{
process.env[key]=envConfig[key];   //we this notation process.env[key] for properties. Here as per key value, it is either
                                    //process.env.PORT or process.env.MONGODB_URI
});

}
//Note - Currently config variables are in config.js which is a part of your repository on github. So to avoid that we
//store all configuration variables in config.json and config.json won't be a part of the repository
//so we mention in .gitignore to prevent it from getting uploaded to github. Also, the salt(secret key) used is directly seen in
//the code as 'abc123', to avoid that we store it as an environment variable in config.json as a random string


// if(env==='development'){
// process.env.PORT=3000;
// process.env.MONGODB_URI='mongodb://localhost:27017/TodoApp';
// }else if(env==='test'){
// process.env.PORT=3000;
// process.env.MONGODB_URI='mongodb://127.0.0.1:27017/TodoAppTest'
// }

//Previously, the when the app was run on localhost the some data was added,updated or deleted from
//TodoApp database. Then, when the test environment was run, this data was wiped with new data
//To avoid this and to use separate databases as per the environment, the above code has been written
//There are three environments
//1 production-Heroku
//2 development-localhost
//3 test environment- Mocha
