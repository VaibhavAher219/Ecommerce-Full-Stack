const app = require('./app')
const dotenv = require ('dotenv');
const connectDatabase = require('./config/database')


//uncaught excaetipn
process.on('uncaughtException',(err)=>{
    console.log('server shutting down');
    process.exit();
})

dotenv.config({path:"backend/config/config.env"});
connectDatabase();
const server = app.listen(process.env.PORT,()=>{
    console.log("server is working")
})

//unhandled rror
process.on('unhandledRejection',err=>{
    console.log(`Error ${err.message}`);
    console.log("Shutting Down Server");
    server.close(()=>{
        process.exit();
    })
})