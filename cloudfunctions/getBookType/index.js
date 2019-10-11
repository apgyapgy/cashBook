// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true,
  // env: 'test-gp4ml'
  env:'apgy-876ffd'
});
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  let openid = event.userInfo.openId;
  return await db.collection('bookType').where({
    type:event.type,
    user: _.eq('').or(_.eq(openid))
  }).get();
}