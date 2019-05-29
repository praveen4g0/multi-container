const keys = require('./keys');
const redis = require('redis');
const redisPassword = "password" ; 

console.log(keys.redishost);
console.log(keys.redisport);

const redisClient = redis.createClient({
  host: keys.redishost,
  port: keys.redisport,
  no_ready_check: true,
  auth_pass: redisPassword,
  retry_strategy: () => 1000
});

redisClient.on('connect', () => {   
          global.console.log("connected");
});                               

redisClient.on('error', err => {       
          global.console.log(err.message)
});                               

const sub = redisClient.duplicate();


function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}


sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');
