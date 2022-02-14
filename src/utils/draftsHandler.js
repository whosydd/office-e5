const { mvMail, createDraft, getMailList } = require('../api/ajax')
const fs = require('fs')
require('dotenv').config()

const subject = process.env.DRAFT_MAIL_TITLE
const address = process.env.DRAFT_MAIL_ADDRESS

// 获取邮件内容
const content = fs.readFileSync(__dirname + '/../config/draft.html', 'utf-8').toString()

async function draftsHandler(token) {
  // 获取草稿邮件数量
  const draftList = await getMailList(token, 5, 'drafts')
  // console.log('drafts', draftList)

  // 判断草稿数量
  if (draftList.length >= 5) {
    // 移动到 已删除邮件 文件夹
    const promList = draftList.map(item => mvMail(token, item.id))
    Promise.all(promList)
      .then(res =>
        console.log(
          'MOVE\n',
          res.map(item => (item === 201 ? 'success' : 'failed')),
          '\n'
        )
      ) // 201
      .catch(err => console.log(err.message))
  } else {
    // 创建草稿

    const draft = {
      subject,
      importance: 'Low',
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
    }

    const draftStatus = await createDraft(token, draft)
    if (draftStatus === 201) {
      console.log('create success') // 201
      console.log('drafts already have', draftList.length + 1, '\n')
    }
  }
}

module.exports = draftsHandler
