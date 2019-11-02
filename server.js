import express from 'express';
import {routes} from './src/routes/libraryRoutes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;
app.use(express.static('./'))

//mongoose connection
// mongoose.Promise = global.Promise;
var mongoDB = 'mongodb://localhost:27017/library';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;

db.on('error',console.error.bind(console,'Error while connecting to Mongo DB. Please check your connection once !!!'));
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
routes(app);

app.listen(PORT,() =>{
    console.log(`Server listening at PORT ${PORT}`);
});