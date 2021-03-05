import svgCaptcha from 'svg-captcha';
import store from '../store';
import { promisify } from 'util';

const captcha = {
  method: 'POST',
  path: '/captcha',
  handler: async (req, h) => {
    const ip = req.headers['x-forwarded-for'] || req.info.remoteAddress;
    const key = `${ip}-captcha`;

    const create = () => {
      const captcha = svgCaptcha.create({
        ignoreChars: '0o1i',
        color: true,
        noise: 1 + (Math.random() * 3) << 0
      });

      store.redisClient.set(key, captcha.text);
      store.redisClient.expire(key, 360);
      return captcha.data;
    };

    const verify = async () => {
      const clientCaptcha = req.payload.captcha;
      const captcha = (await promisify(store.redisClient.get)
        .bind(store.redisClient)(key)).toString();

      if (!captcha) return create();

      if (clientCaptcha.toLowerCase() === captcha.toLowerCase()) {
        store.redisClient.del(key);
        store.redisClient.del(`${ip}-limit`);

        return h.response().code(204);
      }
      return create();
    };

    if (req.payload &&
      req.payload.captcha) {
      return await verify();
    }
    return create();
  }
};

export default captcha;
