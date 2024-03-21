const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000;
const routes=require('./routes')
const connection=require('./db')
const redisClient=require('./redis')
const cors=require('cors')
require('dotenv').config();

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());

app.use(cors({
  origin: '*'
}));
// (async()=>{
//     try{
//     await redisClient.connect()
//     console.log('Redis connected');
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// })
  

app.use('/api',routes)


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
