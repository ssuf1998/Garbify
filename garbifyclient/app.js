import * as utils from 'utils/utils';
import {Base64} from 'js-base64';

App({
  globalData: {
    gifs: ['grimer', 'gulpin', 'koffing', 'trubbish', 'burmy'],
    api: 'https://garbify.vesuvianite.work'
  },
  onLaunch() {

  },
});

getApp().$utils = {...utils, Base64};
