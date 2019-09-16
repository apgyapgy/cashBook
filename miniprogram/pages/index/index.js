let app = getApp();
Page({
  data: {
    footerIndex:0,
  },
  onLoad: function (options) {
  },
  onShow: function () {
  },
  changeFooter(e){
    app.changeFooter(e);
  }
})