import classify from './classify';
import { captcha, needCaptcha } from './captcha';

export default [].concat(
  classify,
  captcha,
  needCaptcha
);
