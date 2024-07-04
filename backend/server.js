const express = require('express');
const bodyParser = require('body-parser');
const connectDb = require('./utils/database'); 
const userRouter = require('./users/user-route');
const cors = require('cors');


require('dotenv').config();
const app = express();
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());
app.use('/',userRouter);


connectDb();


const server = app.listen(8080,function(){

    var host = server.address().address
    var port = server.address().port 
   
   console.log("Example app listening at http://%s:%s", host, port)


});



