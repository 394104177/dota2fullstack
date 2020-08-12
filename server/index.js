const express = require('express')
const path = require('path')
const app = express()
app.set('secret', 'chooopa') // 应放在环境变量里
app.use(require('cors')())
app.use(express.json())
require('./plugins/db')(app)
require('./routes/admin')(app)
app.use('/uploads', express.static(path.resolve(__dirname, './uploads')))
app.listen(3000, () => {
  console.log('http://localhost:3000')
})
