// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser:true,
  env:'test-gp4ml'
  // env:'apgy-876ffd
});
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  // const params = {
  //   bookMonth: event.bookMonth,
  //   bookYear: event.bookYear
  // };
  const params = {
    bookDate:_.gte(event.beginTime).and(_.lt(event.endTime)),
    amtType: event.amtType,
    bookType:event.bookType
  };
  params._openid = event.userInfo.openId;
  return await db.collection('bookList').where(params)
  .orderBy('bookDate', 'desc')
  .get();
}