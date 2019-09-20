let app = getApp();
Page({
  data: {
    footerIndex: 3,
  },
  onLoad: function (options) {
  },
  onShow: function () {
  },
  changeFooter(e) {
    app.changeFooter(e);
  }
})