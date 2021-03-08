const app = getApp();

Page({
  data: {
    img: '',
    result: [],
    typeNameMap: ['dry', 'wet', 'recyclable', 'hazardous'],
    anim: true
  },
  onLoad() {
    this.setData({
      result: app.globalData.result,
      img: app.globalData.img
    });

    setTimeout(() => {
      this.setData({anim: false});
    }, 100);
  },
  format(v) {
    return (v * 100).toString();
  }

});
