import svgCaptcha from 'svg-captcha';
import store from '../store';
import { v4 as uuidv4 } from 'uuid';
import { promisify } from 'util';

const captcha = {
  method: 'POST',
  path: '/captcha',
  handler: async (req, h) => {
    const create = (key) => {
      const _key = key || uuidv4();
      const captcha = svgCaptcha.create({
        ignoreChars: '0o1i',
        color: true,
        noise: 1 + ((Math.random() * 3) << 0)
      });

      store.redisClient.set(_key, captcha.text);
      store.redisClient.expire(_key, 360);
      return {
        id: _key,
        captcha: captcha.data
      };
    };

    const verify = async () => {
      const ip = req.headers['x-forwarded-for'] || req.info.remoteAddress;
      const clientCaptcha = req.payload.captcha;
      const key = req.payload.id;

      const captcha = (await promisify(store.redisClient.get)
        .bind(store.redisClient)(key));

      if (!captcha) return create();

      if (clientCaptcha.toLowerCase() === captcha.toString().toLowerCase()) {
        store.redisClient.del(key);
        store.redisClient.del(ip);

        return h.response().code(204);
      }
      return create(key);
    };

    if (req.payload && req.payload.id && req.payload.captcha) {
      return await verify();
    }
    return create();
  }
};

const needCaptcha = {
  method: 'GET',
  path: '/captcha',
  handler: async (req, h) => {
    const ip = req.headers['x-forwarded-for'] || req.info.remoteAddress;
    return await store.ipLimit(ip);
  }
};

export { captcha, needCaptcha };
