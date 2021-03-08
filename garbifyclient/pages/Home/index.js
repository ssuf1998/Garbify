const app = getApp();

Page({
  data: {
    uploadingShow: false,
    uploadingRandGif: app.globalData.gifs[0],
    uploadingMsg: '验证中',
  },
  onLoad() {
    this.uploadingPopping();
  },
  pickBtnClick() {
    const that = this;
    this.setData({uploadingShow: true, uploadingMsg: '验证中'});
    wx.request({
      url: `${app.globalData.api}/captcha`,
      method: 'GET',
      success(res) {
        if (!res.data) {
          wx.navigateTo({
            url: '../Captcha/index',
            events: {back: that.captchaBack}
          });
          return;
        }
        that.pickGarbagePic();
      }
    });
  },
  captchaBack(val) {
    if (!val) {
      setTimeout(() => {
        this.setData({uploadingShow: false});
      }, 500);
      return;
    }
    this.pickGarbagePic();
  },
  pickGarbagePic() {
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0],
          encoding: 'base64',
          success: res => {
            that.uploadNClassify(res.data);
          }
        });
      },
      fail() {
        that.setData({uploadingShow: false});
      }
    });
  },
  uploadNClassify(base64) {
    const that = this;
    this.setData({uploadingMsg: '上传分析中'});
    wx.request({
      url: `${app.globalData.api}/classify`,
      method: 'POST',
      data: {img: base64},
      success(res) {
        app.globalData.result = res.data.slice(0, 3);
        app.globalData.img = `data:image/jpeg;base64,${base64}`;
        wx.navigateTo({
          url: '../Result/index',
        });
      },
      complete() {
        that.setData({uploadingShow: false});
      }
    });

  },
  uploadingPopping() {
    const nameIdx = Math.floor(Math.random() * app.globalData.gifs.length);
    const shinny = Math.random();
    this.setData({
      uploadingRandGif: app.globalData.gifs[nameIdx] + (shinny > 0.9 ? '_s' : '')
    });
  },
  // closeUploading() {
  //   this.setData({uploadingShow: false, cancel: true});
  // }
});
