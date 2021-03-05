import redis from 'redis';

const redisClient = redis.createClient();

const data = {
  dev: (process.env.NODE_ENV || '').trim() === 'development',
  redisClient
};

export default data;
