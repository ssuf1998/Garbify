const app = getApp();

Page({
  data: {
    svg: '',
    captchaId: '',
    captchaLoading: true,
    err: false,
    verified: false,
  },
  onLoad() {
    this.getCaptchaSvg();
  },
  onUnload() {
    this.getOpenerEventChannel().emit('back', this.data.verified);
  },
  getCaptchaSvg() {
    const that = this;
    this.setData({captchaLoading: true});
    wx.request({
      url: `${app.globalData.api}/captcha`,
      method: 'POST',
      data: {},
      success(res) {
        const base64Svg = app.$utils.Base64.encode(res.data.captcha);
        const svg = `data:image/svg+xml;base64,${base64Svg}`;
        that.setData({svg: svg, captchaId: res.data.id, captchaLoading: false});
      }
    });
  },
  verifyCaptcha(evt) {
    const that = this;
    wx.request({
      url: `${app.globalData.api}/captcha`,
      method: 'POST',
      data: {captcha: evt.detail, id: this.data.captchaId},
      success(res) {
        if (res.statusCode === 200) {
          that.setData({err: true});
          return that.getCaptchaSvg();
        }
        that.setData({verified: true});
        wx.navigateBack({});
      }
    });
  },
});
