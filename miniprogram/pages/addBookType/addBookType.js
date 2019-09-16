let app = getApp();
import {iconList} from '../../utils/js/iconList.js';
Page({
  data: {
    type:'0',//0支出，1收入
    iconList:iconList,//图标列表
    indexX:0,
    indexY:0,
    typeText:'',
  },
  onLoad: function (options) {
    if(options.type!=undefined){
      this.setData({
        type:options.type
      });
    }
    let title =  `添加${options.type==1?'收入':'支出'}类别`;
    wx.setNavigationBarTitle({
      title: title,
    });
  },
  selectIcon(e){//选择icon
    let data = e.currentTarget.dataset;
    let setDatas = {};
    if(data.idx != this.data.indexX){
      setDatas.indexX = data.idx;
    }
    if (data.idy != this.data.indexY) {
      setDatas.indexY = data.idy;
    }
    this.setData(setDatas);
  }, 
  setType(e){//设置类别名称
    let text = e.detail.value;
    if(text.length <= 4){
      this.setData({
        typeText:text
      });
    }
  },
  addType(e){//提交新增的类别
    let typeText = this.data.typeText;
    if(!this.data.typeText){
      app.showModal('请输入类别名称!');
      return;
    }
    let data = this.data;
    app.getAjax({
      url:'addBookType',
      params:{
        icon: data.iconList[data.indexX].icons[data.indexY],
        name:data.typeText,
        type: data.type
      },
      success(res){
        console.log("addBookType:",res);
        app.showModal('添加成功!',()=>{
          wx.navigateBack();
        })
      }
    });
  }
})