const { sendMail } = require('../api/ajax')
const fs = require('fs')
require('dotenv').config()

const subject = process.env.SEND_MAIL_TITLE
const address = process.env.SEND_MAIL_ADDRESS

// 获取邮件内容
const content = fs.readFileSync(__dirname + '/../config/send.html', 'utf-8').toString()

// 创建邮件
const mail = {
  message: {
    subject,
    body: {
      contentType: 'HTML',
      content,
    },
    toRecipients: [
      {
        emailAddress: {
          address,
        },
      },
    ],
  },
  saveToSentItems: 'false',
}

function sendHandler(token) {
  return new Promise(resolve => resolve(sendMail(token, mail)))
}

module.exports = sendHandler
