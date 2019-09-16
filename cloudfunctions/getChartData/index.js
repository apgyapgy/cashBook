// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true,
  env: 'test-gp4ml'
  // env:'apgy-876ffd'
});
const db = cloud.database();
const $ = db.command.aggregate;
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();//event.userInfo.openId
  const _ = db.command;
  return await db.collection('bookList').aggregate().match({
    _openid: event.userInfo.openId,
    amtType: event.amtType,
    // bookDate: $.and([$.gte(['$bookDate', event.beginTime]), $.lte(['$bookDate', event.endTime])])
    // bookDate: $.gte(event.beginTime)//.and(_.lte(event.endTime))
    bookDate: { $gte: event.beginTime, $lte: event.endTime }
  }).group({
    _id: {
      bookTypeName: '$bookTypeName',
      bookIcon: '$bookIcon',
      bookType:'$bookType'
    },
    count: $.sum('$bookAmt')
  }).end();
}