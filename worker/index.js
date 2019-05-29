const keys = require('./keys');
const redis = require('redis');


console.log(keys.redishost);
console.log(keys.redisport);
console.log(keys.redispassword)

const redisClient = redis.createClient({
  host: keys.redishost,
  port: keys.redisport,
  retry_strategy: () => 1000
});
redisClient.auth(keys.redispassword);
const sub = redisClient.duplicate();


function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}


sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');
