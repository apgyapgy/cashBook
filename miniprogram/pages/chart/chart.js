let app = getApp();
Page({
  data: {
    footerIndex: 1,
    amtType:'0',//0支出，1收入
    amtTypeArr:['支出','收入'],
    dateType:1,//时间范围1月，2年
    chartList:[],
    chartListCount:0
  },
  onLoad: function (options) {
  },
  onShow: function () {
    let month = new Date().getMonth()+1;
    let year = new Date().getFullYear();
    this.initData(year,month);
  },
  initData(year,month){
    let _this = this;
    app.getAjax({
      url:'getChartData',
      params:{
        amtType:_this.data.amtType,
        year: year,
        month:month
      },
      success(res){
        console.log("getChartData:",res);
        let data = res.result.list;
        let count = 0;
        for(var key in data){
          data[key].count = parseInt(data[key].count*100)/100;
          count += data[key].count;
        }
        _this.setData({
          chartList:data,
          chartListCount:count
        });
      }
    });
  },
  amtTypeChange(e){//选择账单类型
    this.setData({
      amtType:e.detail.value
    });
  },
  setDateType(e){//选择日期范围
    let type = e.currentTarget.dataset.type;
    if(type != this.data.dateType){
      this.setData({
        dateType:type
      });
    }
  },
  changeFooter(e) {
    app.changeFooter(e);
  }
})