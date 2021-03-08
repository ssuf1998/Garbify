Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    modal: {
      type: Boolean,
      value: false
    },
    show: {
      type: Boolean,
      value: false
    }
  },
  data: {
    dialogAnimStatus: 'hidden',
    maskAnimStatus: 'hidden',
    _show: false,
  },
  methods: {
    popup() {
      if (this.data.dialogAnimStatus !== 'hidden' ||
        this.data.maskAnimStatus !== 'hidden')
        return;

      this.setData({
        show: true,
        _show: true,
        dialogAnimStatus: 'entering',
        maskAnimStatus: 'entering',
      });

      this.triggerEvent('popup');

      setTimeout(() => {
        this.setData({
          dialogAnimStatus: '',
        });
      }, 250);

      setTimeout(() => {
        this.setData({
          maskAnimStatus: '',
        });
      }, 750);
    },
    close() {
      if (this.data.dialogAnimStatus !== '' ||
        this.data.maskAnimStatus !== '')
        return;

      this.triggerEvent('close');

      this.setData({
        dialogAnimStatus: 'leaving',
        maskAnimStatus: 'leaving',
      });

      setTimeout(() => {
        this.setData({
          dialogAnimStatus: 'hidden',
        });
      }, 250);

      setTimeout(() => {
        this.setData({
          maskAnimStatus: 'hidden',
          show: false,
          _show: false
        });
      }, 750);

    },
    _closeDialog() {
      if (this.properties.modal) {
        if (this.dialogAnimStatus !== 'focus') {
          this.setData({
            dialogAnimStatus: 'focus',
          });
          setTimeout(() => {
            this.setData({
              dialogAnimStatus: '',
            });
          }, 150);
        }
        return;
      }
      this.close();
    }
  },
  observers: {
    'show': function (val) {
      val ? this.popup() : this.close();
    }
  }
});
