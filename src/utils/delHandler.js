const { rmMail, getMailList } = require('../api/ajax')

async function delHandler(token) {
  // 获取已删除邮件数量
  const delList = await getMailList(token, 10, 'deleteditems')

  if (typeof delList === 'string') {
    console.log(delList)
    return
  }
  if (delList.length >= 10) {
    // 删除 ’已删除邮件‘ 文件夹中的邮件
    const promList = delList.map(item => rmMail(token, item.id))
    Promise.all(promList)
      .then(res =>
        console.log(
          'DELETE\n',
          res.map(item => (item === 204 ? 'success' : 'failed')),
          '\n'
        )
      ) // 204
      .catch(err => console.log(err.message))
  } else {
    console.log('deleteditems already have', delList.length, '\n')
    return
  }
}

module.exports = delHandler
