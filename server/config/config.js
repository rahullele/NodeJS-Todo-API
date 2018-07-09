var env=process.env.NODE_ENV || 'development';

console.log('env ****',env);

if(env==='development'){
process.env.PORT=3000;
process.env.MONGODB_URI='mongodb://localhost:27017/TodoApp';
}else if(env==='test'){
process.env.PORT=3000;
process.env.MONGODB_URI='mongodb://localhost:27017/TodoAppTest'
}

//Previously, the when the app was run on localhost the some data was added,updated or deleted from
//TodoApp database. Then, when the test environment was run, this data was wiped with new data
//To avoid this and to use separate databases as per the environment, the above code has been written
//There are three environments
//1 production-Heroku
//2 development-localhost
//3 test environment- Mocha
