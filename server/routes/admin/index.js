const inflection = require('inflection')
const mongoose = require('mongoose')
const axios = require('axios')
const cheerio = require('cheerio')
module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')

  const router = express.Router({ // 子路由
    mergeParams: true
  })
  // 资源创建
  router.post('/', async (req, res) => {
    const Model = require(`../../models/${inflection.classify(req.params.resource)}`)
    const model = await Model.create(req.body)
    res.send(model)
  })
  // 资源删除
  router.delete('/:id', async (req, res) => {
    const Model = require(`../../models/${inflection.classify(req.params.resource)}`)
    await Model.findByIdAndDelete(req.params.id)

    res.send({ success: true })
  })
  // 资源修改
  router.put('/:id', async (req, res) => {
    const Model = require(`../../models/${inflection.classify(req.params.resource)}`)

    const model = await Model.updateOne({ _id: req.params.id }, req.body) // 前者为查询字段，后者为更新内容

    res.send(model)
  })
  // 资源查询
  router.get('/:id', async (req, res) => {
    const Model = require(`../../models/${inflection.classify(req.params.resource)}`)
    const model = await Model.findById(req.params.id)

    res.send(model)
  })
  // 综合统计(单个英雄)
  router.get('/statistics/:id', async (req, res) => {
    const skill = req.query.skill || 'all'
    const ladder = req.query.ladder || 'all'
    const heromModel = require('../../models/Hero.js')
    const itemModel = require('../../models/Item.js')

    let herodatas = await heromModel.find({ _id: req.params.id }, `played.${skill}.${ladder} OpponentsAndTeammates.opp.${skill}.${ladder} OpponentsAndTeammates.team.${skill}.${ladder} addSkills.${skill}.${ladder}`)
    herodatas = herodatas[0]
    const allHero = await heromModel.find({ }, 'icon name')
    const datas = await itemModel.find({ }, `played.${skill}.${ladder} _id icon name`)

    let result = datas.map(item => {
      for (let i = 0; i < item.played[skill][ladder].length; i++) {
        const str = mongoose.Types.ObjectId(item.played[skill][ladder][i].hero).toString()
        if (str === req.params.id) {
          return { name: item.name, icon: item.icon, playeds: item.played[skill][ladder][i].playeds, winRates: item.played[skill][ladder][i].winRates }
        }
      }
    })

    result = result
      .sort((a, b) => {
        return -(parseInt(a.playeds.replace(/,/g, '')) - parseInt(b.playeds.replace(/,/g, ''))
        )
      })
      .slice(0, 10)

    console.log(herodatas._doc)
    const final = Object.assign({}, herodatas._doc)
    final.itemData = result

    console.time('a')
    final.OpponentsAndTeammates.opp.all.all.sort((a, b) => {
      return parseFloat(a.antiRate) - parseFloat(b.antiRate)
    })
    final.OpponentsAndTeammates.team.all.all.sort((a, b) => {
      return parseFloat(a.antiRate) - parseFloat(b.antiRate)
    })
    final.OpponentsAndTeammates.opp.all.all = final.OpponentsAndTeammates.opp.all.all.filter((item, index) => {
      if (index <= 4 || index >= final.OpponentsAndTeammates.opp.all.all.length - 5) {
        return true
      }
    })
    final.OpponentsAndTeammates.team.all.all = final.OpponentsAndTeammates.team.all.all.filter((item, index) => {
      if (index <= 4 || index >= final.OpponentsAndTeammates.team.all.all.length - 5) {
        return true
      }
    })
    final.OpponentsAndTeammates.team.all.all.find(item => {
      allHero.find(i => {
        if (i._id.toString() === item.hero.toString()) {
          item._doc.hero = { icon: i.icon, name: i.name }
          item._doc.name = i.name
        }
      })
    })
    final.OpponentsAndTeammates.opp.all.all.find(item => {
      allHero.find(i => {
        if (i._id.toString() === item.hero.toString()) {
          item._doc.hero = { icon: i.icon, name: i.name }
          item._doc.name = i.name
          //   console.log(Object.getOwnPropertyDescriptors(item))
          console.log(item)
        }
      })
    })
    console.timeEnd('a')
    res.send(final)
  })

  // 装备使用率(单个英雄)
  router.get('/itemRates/:id', async (req, res) => {
    // const Model = require(`../../models/${inflection.classify(req.params.resource)}`)
    // const model = await Model.findById(req.params.id)
    const skill = req.query.skill || 'all'
    const ladder = req.query.ladder || 'all'

    const itemModel = require('../../models/Item.js')

    const datas = await itemModel.find({}, `played.${req.query.skill}.${req.query.ladder} _id icon name`)

    const result = datas.map(item => {
      for (let i = 0; i < item.played[skill][ladder].length; i++) {
        const str = mongoose.Types.ObjectId(item.played[skill][ladder][i].hero).toString()
        if (str === req.params.id) {
          return { name: item.name, icon: item.icon, playeds: item.played[skill][ladder][i].playeds, winRates: item.played[skill][ladder][i].winRates }
        }
      }
    })
    res.send(result)
  })

  // 资源列表获取
  router.get('/', async (req, res) => {
    const Model = require(`../../models/${inflection.classify(req.params.resource)}`)
    const queryOption = {}
    if (Model.modelName === 'Category') {
      queryOption.populate = 'parent'
    } else if (Model.modelName === 'Hero') { // 去除队友和敌人数据
      queryOption.populate = 'categories'
      const skill = req.query.skill || 'all'
      const ladder = req.query.ladder || 'all'
      const model = await Model.find({ }, `icon name rate  cs.${skill}.${ladder} dmg.${skill}.${ladder} kda.${skill}.${ladder} gpm.${skill}.${ladder} xpm.${skill}.${ladder} played.${skill}.${ladder}`).setOptions(queryOption)
      res.send(model)
      return
    } else if (Model.modelName === 'item') {
      const skill = req.query.skill || 'all'
      const ladder = req.query.ladder || 'all'
      const model = await Model.find({ }, `kda.${skill}.${ladder} dmg.${skill}.${ladder} gpm.${skill}.${ladder} xpm.${skill}.${ladder} rate.${skill}.${ladder} played.${skill}.${ladder} name icon description`)
      res.send(model)
      return
    } else if (Model.modelName === 'Article') {
      if (!req.query.kind) {
        console.log('enter')

        return res.send(await Model.find({ }))
      }
      const page = req.query.page || 1
      const limit = req.query.limit || 8
      console.log(page, limit)
      queryOption.limit = limit
      queryOption.skip = (page - 1) * limit
      queryOption.sort = '-addTime'
      const kind = req.query.kind
      let kindId = ''
      switch (kind) {
        case 'comNews':
          var models = await Model.find({ }).setOptions(queryOption)
          res.send(models)
          return

        case 'gameNews':
          kindId = '5f29ce7dc0629212f8b0e769'
          break
        case 'competition':
          kindId = '5fc7994b40b8e81b00e9f322'
          break
        case 'gamePost':
          kindId = '5fc7996040b8e81b00e9f323'
          break

        default:break
      }

      const model = await Model.find({ categories: [kindId] }).setOptions(queryOption)

      res.send(model)
      return
    }
    const model = await Model.find().setOptions(queryOption)

    res.send(model)
  })

  // 资源增删改查

  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    // 验证token
    const token = req.headers.authorization === 'undefined' ? undefined : req.headers.authorization

    assert.ok(token, 401, '请提供token')
    const { id } = jwt.verify(token, app.get('secret'))
    assert.ok(id, 401, '无效的token') // token或者服务器密钥出错
    req.user = require('../../models/AdminUser').findById(id)
    assert.ok(req.user, 401, '请先登录') // token错误或数据库错误
    await next()
  }, router)

  // 上传图片
  const multer = require('multer')
  const path = require('path')
  const upload = multer({ dest: path.resolve(__dirname, '../../uploads') })

  app.use('/admin/api/upload', async (req, res, next) => {
    // 验证token

    const token = req.headers.authorization === 'undefined' ? undefined : req.headers.authorization

    assert.ok(token, 401, '请提供token')
    const { id } = jwt.verify(token, app.get('secret'))
    assert.ok(id, 401, '无效的token') // token或者服务器密钥出错
    req.user = require('../../models/AdminUser').findById(id)
    assert.ok(req.user, 401, '请先登录') // token错误或数据库错误
    await next()
  },
  upload.single('file'),
  async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  // 用户登录
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    const adminData = require('../../models/AdminUser')

    // 根据用户名找密码
    const user = await adminData.findOne({ username }).select('+password')
    assert.ok(user, 422, '用户不存在')

    // 校验密码
    const istrue = require('bcrypt').compareSync(password, user.password)
    assert.ok(istrue, 422, '密码错误')

    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })
  // 首页直播
  app.get('/admin/api/live', async (req, res) => {
    axios.get('http://dotamax.com/live/').then(result => {
      const $ = cheerio.load(result.data)
      $('.live-box a').attr('href', function () {
        console.log(this, '+++++++++++++++++++++++++')
        return 'http://dotamax.com' + this.attribs.href
      })
      var live = $('.main-container').html()

      res.send(live)
    })
  })
  // 文章列表

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}
