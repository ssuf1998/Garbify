import redis from 'redis';
import { promisify } from 'util';

const redisClient = redis.createClient();
const ipLimit = async (ip) => {
  const key = ip;
  const keyExists = await promisify(redisClient.exists)
    .bind(redisClient)(key);

  if (!keyExists) {
    // 5分钟15次
    // 否则需要验证码
    redisClient.set(key, 1); // max 15
    redisClient.expire(key, 300);
    return true;
  } else {
    const curLimitVal = parseInt(await promisify(redisClient.get)
      .bind(redisClient)(key)) + 1;
    if (curLimitVal <= 15) {
      redisClient.setrange(key, 0, curLimitVal);
      return true;
    } else {
      return false;
    }
  }
};

const data = {
  dev: (process.env.NODE_ENV || '').trim() === 'development',
  redisClient,
  ipLimit
};

export default data;
