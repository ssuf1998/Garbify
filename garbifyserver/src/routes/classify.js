import * as garbage from '../const/garbage';
import axios from 'axios';
import store from '../store';
import {promisify} from 'util';

/**
 *
 * @param {Array} predict
 * predict是predictNode的数组
 * predictNode为一个对象，包括属性type、name、typeName、confidence
 */
const predictFormat = (predict) => {
  const topFivePred = predict.slice()
    .sort((a, b) => a < b ? 1 : a > b ? -1 : 0)
    .slice(0, 5);
  const result = [];
  topFivePred.forEach(v => {
    const idx = predict.indexOf(v);
    const clazz = garbage.garbageClasses[idx];
    result.push({
      ...clazz,
      typeName: garbage.garbageTypes[clazz.type],
      confidence: v
    });
  });

  return result;
};

const ipLimit = async (ip) => {
  const key = `${ip}-limit`;
  // const keyExists = store.redisClient.exists(key);
  const keyExists = await promisify(store.redisClient.exists)
    .bind(store.redisClient)(key);

  if (!keyExists) {
    // 5分钟15次
    // 否则需要验证码
    store.redisClient.set(key, 1); // max 15
    store.redisClient.expire(key, 300);
    return true;
  } else {
    const curLimitVal = parseInt(await promisify(store.redisClient.get)
      .bind(store.redisClient)(key)) + 1;
    if (curLimitVal <= 15) {
      store.redisClient.set(key, curLimitVal);
      return true;
    } else {
      return false;
    }
  }
};

const classify = {
  method: 'POST',
  path: '/classify',
  handler: async (req, h) => {
    const ip = req.headers['x-forwarded-for'] || req.info.remoteAddress;
    // 验证码为POST，没法重定向，需要前端配合
    if (!await ipLimit(ip)) return h.response().code(403);

    const validImgStr = req.payload.img
      .replace(/[/+]/, $0 => {
        if ($0 === '/') return '_';
        if ($0 === '+') return '-';
      });

    const predict = (await axios.post(
      store.dev
        ? 'https://ai.vesuvianite.work/v1/models/garbify:predict'
        : 'http://localhost:8501/v1/models/garbify:predict',
      {
        instances: [validImgStr]
      })).data.predictions[0];

    return predictFormat(predict);
  }
};

export default classify;
