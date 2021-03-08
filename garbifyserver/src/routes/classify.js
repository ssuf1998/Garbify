import * as garbage from '../const/garbage';
import axios from 'axios';
import store from '../store';
import { promisify } from 'util';

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

const classify = {
  method: 'POST',
  path: '/classify',
  handler: async (req, h) => {
    const ip = req.headers['x-forwarded-for'] || req.info.remoteAddress;
    if (!await store.ipLimit(ip)) return h.response().code(403);

    const validImgStr = req.payload.img
      .replace(/[/+]/g, $0 => {
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
