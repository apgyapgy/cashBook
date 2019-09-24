let app = getApp();
Page({
  data: {
    id:'',//类型id
    footerIndex: 1,
    amtType:'0',//0支出，1收入
    amtTypeArr:['支出','收入'],
    dateType:1,//时间范围1月，2年
    chartList:[],
    chartListCount:0,
    year:'',
    beginMonth:'',
    endMonth:''
  },
  onLoad: function (options) {
    if(options.id){
      this.setData({
        amtType:options.type,
        id:options.id,
        year:options.year,
        beginMonth:options.mon1,
        endMonth:options.mon2
      });
      this.getChartDetail();
    }else{
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
      this.setData({
        year:year,
        beginMonth:month,
        endMonth:month
      });
      this.initData();
    }
  },
  onShow: function () {
  },
  initData(){
    let _this = this;
    let data = this.data;
    app.getAjax({
      url:'getChartData',
      params:{
        amtType:data.amtType,
        year: data.year,
        beginMonth: data.beginMonth,
        endMonth:data.endMonth
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
  getChartDetail(){
    let _this = this;
    let data = this.data;
    app.getAjax({
      url:'getChartDetailData',
      params:{
        id:data.id,
        year:data.year,
        beginMonth:data.beginMonth,
        endMonth:data.endMonth
      },
      success(res){
        console.log("getChartDetailData:",res);
        let data = res.result.data;
        let count = 0;
        for(var key in data){
          count += data[key].bookAmt
        }
        _this.setData({
          chartList: data,
          chartListCount: count
        });
      }
    });
  },
  toChartDetail(e){
    let id = e.currentTarget.dataset.id;
    let data = this.data;
    app.navigate(`/pages/chart/chart?id=${id}&year=${data.year}&mon1=${data.beginMonth}&mon2=${data.endMonth}&type=${data.amtType}`);
  },
  amtTypeChange(e){//选择账单类型
    if(e.detail.value != this.data.amtType){
      this.setData({
        amtType:e.detail.value
      });
      if(this.data.id){
        this.getChartDetail();
      }else{
        this.initData();
      }
    }
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