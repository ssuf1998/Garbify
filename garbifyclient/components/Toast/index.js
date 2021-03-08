Component({
  properties: {
    msg: String,
    type: {
      type: String,
      value: 'success'
    },
    autoHide: {
      type: Number,
      value: 3000
    },
    show: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    popup() {
      if (this.data.show) return;
      this.setData({
        show: true
      });
      if (this.properties.autoHide > 0) {
        setTimeout(() => {
          this.setData({
            show: false
          });
        }, this.properties.autoHide + 300);
      }
    },
    close() {
      if (!this.data.show) return;

      this.setData({
        show: false
      });
    }
  }
});
