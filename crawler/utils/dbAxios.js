
const axios = require('axios')
axios.defaults.retry = 100
axios.defaults.retryDelay = 1000
const http = axios.create({ timeout: 100000, maxContentLength: Infinity })

http.interceptors.request.use(req => {
  req.headers.Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFhMDZhMmQxODliMzY3NGRiYmI5OCIsImlhdCI6MTU5Njc1MzUwNH0.cVGuBl5a_7i_ORPxOMWkbYLbZrAl6qdWacO_N92PUBQ'
  return req
}, err => {
  console.log(err)
})

module.exports = http
