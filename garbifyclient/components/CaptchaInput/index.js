Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    captcha: '',
    focus: false
  },
  properties: {
    err: {
      type: Boolean,
      value: false
    }
  },
  onLoad: () => {
  },
  methods: {
    focusInput() {
      if (this.data.err) {
        this.setData({err: false, captcha: ''});
      }
      this.setData({focus: true});
    },
    inputBlurred() {
      this.setData({focus: false});
    },
    inputChange() {
      if (!this.data.err && this.data.captcha.length === 4) {
        this.triggerEvent('submit', this.data.captcha);
      }
    }
  },
  observers: {
    'err': function (val) {
      this.setData({focus: false});
    }
  }

});
