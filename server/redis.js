const redis = require('redis');
require('dotenv').config();



const redisClient = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOSTNAME,
        port: process.env.REDIS_PORT
    }
});

// redisClient.on('connect', () => {
//     console.log('Connected to Redis');
// })

// redisClient.on('error', (err) => {
//     console.log(err.message);
// })

// redisClient.on('ready', () => {
//     console.log('Redis is ready');
// })

// redisClient.on('end', () => {
//     console.log('Redis connection ended');
// })

// process.on('SIGINT', () => {
//     redisClient.quit();
// })

redisClient.connect().then(() => {
    console.log('Connected to Redis');
}).catch((err) => {
    console.log(err.message);
})

module.exports=redisClient
  