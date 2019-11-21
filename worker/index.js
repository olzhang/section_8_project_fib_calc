import keys from "./keys";
import redis from "redis";

const redisClient = redis.createClient({
	host: keys.redisHost,
	port: keys.redisPort,
	retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

// const fib = index => {
// 	let a = 0;
// 	let b = c = 1;
// 	for(let i=2; i<index; i++) {
// 		a = b;
// 		b = c;
// 		c = a + b;
// 	}
// 	return c;
// }
// 
const fib = index => {
	if(indx < 2) return 1;
	return fib(index - 1) + fib(index - 2)
}

sub.on("message" (channel, msg) => redisClient.hset("values", msg, fib(parseInt(msg))));
