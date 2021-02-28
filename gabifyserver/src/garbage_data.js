const garbageClasses = {
  0: { type: 0, name: '一次性快餐盒' },
  1: { type: 0, name: '污损塑料' },
  2: { type: 0, name: '烟蒂' },
  3: { type: 0, name: '牙签' },
  4: { type: 0, name: '破碎花盆及碟碗' },
  5: { type: 0, name: '竹筷' },
  6: { type: 1, name: '剩饭剩菜' },
  7: { type: 1, name: '大骨头' },
  8: { type: 1, name: '水果果皮' },
  9: { type: 1, name: '水果果肉' },
  10: { type: 1, name: '茶叶渣' },
  11: { type: 1, name: '菜叶菜根' },
  12: { type: 1, name: '蛋壳' },
  13: { type: 1, name: '鱼骨' },
  14: { type: 2, name: '充电宝' },
  15: { type: 2, name: '包' },
  16: { type: 2, name: '化妆品瓶' },
  17: { type: 2, name: '塑料玩具' },
  18: { type: 2, name: '塑料碗盆' },
  19: { type: 2, name: '塑料衣架' },
  20: { type: 2, name: '快递纸袋' },
  21: { type: 2, name: '插头电线' },
  22: { type: 2, name: '旧衣服' },
  23: { type: 2, name: '易拉罐' },
  24: { type: 2, name: '枕头' },
  25: { type: 2, name: '毛绒玩具' },
  26: { type: 2, name: '洗发水瓶' },
  27: { type: 2, name: '玻璃杯' },
  28: { type: 2, name: '皮鞋' },
  29: { type: 2, name: '砧板' },
  30: { type: 2, name: '纸板箱' },
  31: { type: 2, name: '调料瓶' },
  32: { type: 2, name: '酒瓶' },
  33: { type: 2, name: '金属食品罐' },
  34: { type: 2, name: '锅' },
  35: { type: 2, name: '食用油桶' },
  36: { type: 2, name: '饮料瓶' },
  37: { type: 3, name: '干电池' },
  38: { type: 3, name: '软膏' },
  39: { type: 3, name: '过期药物' }
};

const garbageTypes = {
  0: '其他垃圾',
  1: '厨余垃圾',
  2: '可回收物',
  3: '有害垃圾'
};

export {
  garbageClasses,
  garbageTypes
};
