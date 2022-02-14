const { getToken } = require('./api/ajax')
const delHandler = require('./utils/delHandler')
const draftsHandler = require('./utils/draftsHandler')
const sendHandler = require('./utils/sendHandler')

async function app() {
  // 获取token
  const token = await getToken()
  // console.log(token)

  // drafts相关
  await draftsHandler(token)

  // deleteditems 相关
  await delHandler(token)
}

async function send() {
  // 获取token
  const token = await getToken()
  // console.log(token)

  // 发送邮件
  const status = await sendHandler(token)
  if (status === 202) console.log('SEND\n', 'success', '\n')
  else console.log('SEND\n', 'failed', '\n')
}

module.exports = {
  app,
  send,
}
