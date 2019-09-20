let app = getApp();
Page({
  data: {
    footerIndex: 1,
  },
  onLoad: function (options) {
  },
  onShow: function () {
  },
  changeFooter(e) {
    app.changeFooter(e);
  }
})