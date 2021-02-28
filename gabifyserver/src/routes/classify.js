import * as garbageData from '../garbage_data';
import axios from 'axios';
import store from '../store';

/**
 *
 * @param {Array} predict
 */
const predictFormat = (predict) => {
  const topFivePred = predict.slice()
    .sort((a, b) => a < b ? 1 : a > b ? -1 : 0)
    .slice(0, 5);
  const result = [];
  topFivePred.forEach(v => {
    const idx = predict.indexOf(v);
    const clazz = garbageData.garbageClasses[idx];
    result.push({
      ...clazz,
      typeName: garbageData.garbageTypes[clazz.type],
      confidence: v
    });
  });

  return result;
};

const doClassify = {
  method: 'POST',
  path: '/classify',
  handler: async (req, h) => {
    const validImgStr = req.payload.img
      .replaceAll('/', '_')
      .replaceAll('+', '-');
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

export default doClassify;
