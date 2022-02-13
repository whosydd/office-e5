const { getToken, getMailList, sendMail, mvMail, rmMail, createDraft } = require('./api/ajax')
const draft = require('./config/draft.json')
const send = require('./config/send.json')

require('dotenv').config()

function getListInFolder(token, mailFolder) {
  return new Promise(resolve => {
    getMailList(token, mailFolder)
      .then(res => resolve(res.map(item => item.id)))
      .catch(err => resolve(err.message))
  })
}

async function app() {
  // 获取token
  const token = await getToken()
  // console.log(token)

  // 获取邮件列表（所有邮件）
  // const mailList = await getMailList(token)
  // console.log(mailList.length)

  // 获取指定文件夹中的邮件列表
  // 文件夹ID参考：https://docs.microsoft.com/zh-cn/graph/api/resources/mailfolder?view=graph-rest-1.0
  const draftList = await getListInFolder(token, 'drafts')
  console.log('drafts', draftList)

  const inboxList = await getListInFolder(token, 'inbox')
  console.log('inbox', inboxList)

  // 删除 ’已删除邮件‘ 文件夹中的邮件
  // deleteditemList.forEach(async item => {
  //   const rmStatus = await rmMail(token, item.id)
  //   console.log(rmStatus) // 204
  // })

  // 创建草稿
  const draftStatus = await createDraft(token, draft)
  console.log('创建成功->201', draftStatus) // 201

  let flag = false

  if (flag) {
    // 发送邮件
    const sendStatus = await sendMail(token, send)
    console.log(sendStatus) // 202

    // 移动邮件
    // const mvStatus = await mvMail(token, mailList[0].id)
    // console.log(mvStatus) // 201
  }
}
module.exports = {
  app,
}
