const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000;
const routes=require('./routes')
const connection=require('./db')
const redis = require('redis');

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());

const redisClient = redis.createClient();
redisClient.on('connect', () => {
    console.log('Connected to Redis');
  });
  

app.use('/api',routes)


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
