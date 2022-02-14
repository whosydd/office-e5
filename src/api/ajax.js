const axios = require('axios')
const qs = require('qs')
require('dotenv').config()

// 获取环境变量
const user_id = process.env.USER_ID
const tenant = process.env.TENANT
const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

// 请求默认url
const baseURL = `https://graph.microsoft.com/v1.0/users/${user_id}`

// 获取token
const getToken = () => {
  const req = axios.create({
    timeout: 5000,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  })
  const reqBody = {
    grant_type: 'client_credentials',
    scope: 'https://graph.microsoft.com/.default',
    client_id,
    client_secret,
  }
  return new Promise(resolve => {
    req
      .post(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, qs.stringify(reqBody))
      .then(res => resolve(res.data.access_token))
      .catch(err => resolve(err.message))
  })
}

// 获取邮件列表
const getMailList = (token, count, folder) => {
  // console.log('get mail list', token)
  const req = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      authorization: token,
    },
  })
  return new Promise(resolve => {
    let res
    if (!folder) {
      res = req.get('/messages', {
        params: {
          $select: 'subject,bodyPreview,toRecipients',
          $top: count,
        },
      })
    } else {
      res = req.get(`/mailFolders/${folder}/messages`, {
        params: {
          $top: count,
          $select: 'id',
        },
      })
    }
    res.then(res => resolve(res.data.value)).catch(err => resolve(err.message))
  })
}

// 创建邮件草稿
const createDraft = async (token, draft) => {
  const req = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
      // 'Content-Length': 0,
    },
  })
  return new Promise(resolve => {
    req
      .post('/messages', draft)
      .then(res => resolve(res.status))
      .catch(err => resolve(err.message))
  })
}

// 发送邮件
const sendMail = async (token, message) => {
  const req = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
  })
  return new Promise(resolve => {
    req
      .post('/sendMail', message)
      .then(res => resolve(res.status))
      .catch(err => resolve(err.message))
  })
}

// 移动邮件
const mvMail = (token, mail_id) => {
  const req = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
  })
  return new Promise(resolve => {
    req
      .post(`/messages/${mail_id}/move`, {
        destinationId: 'deleteditems',
      })
      .then(res => resolve(res.status))
      .catch(err => resolve(err.message))
  })
}

// 删除 已删除文件夹 中的邮件
const rmMail = (token, mail_id) => {
  const req = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
  })
  return new Promise(resolve => {
    req
      .delete(`/mailFolders/deleteditems/messages/${mail_id}`)
      .then(res => resolve(res.status))
      .catch(err => resolve(err.message))
  })
}

module.exports = {
  getToken,
  getMailList,
  createDraft,
  sendMail,
  mvMail,
  rmMail,
}
