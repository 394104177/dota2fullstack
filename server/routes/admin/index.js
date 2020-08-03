const inflection = require('inflection')
module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  }) // 子路由

  router.post('/', async (req, res) => {
    const Model = require(`../../models/${inflection.classify(req.params.resource)}`)
    const model = await Model.create(req.body)

    res.send(model)
  })
  router.delete('/:id', async (req, res) => {
    const Model = require(`../../models/${inflection.classify(req.params.resource)}`)
    await Model.findByIdAndDelete(req.params.id)

    res.send({ success: true })
  })
  router.put('/:id', async (req, res) => {
    const Model = require(`../../models/${inflection.classify(req.params.resource)}`)
    const model = await Model.findByIdAndUpdate(req.params.id, req.body) // 前者为查询字段，后者为更新内容

    res.send(model)
  })
  router.get('/', async (req, res) => {
    const Model = require(`../../models/${inflection.classify(req.params.resource)}`)
    const queryOption = {}
    if (Model.modelName === 'Category') {
      queryOption.populate = 'parent'
    }
    const model = await Model.find().setOptions(queryOption).limit(10)

    res.send(model)
  })
  router.get('/:id', async (req, res) => {
    const Model = require(`../../models/${inflection.classify(req.params.resource)}`)
    const model = await Model.findById(req.params.id)

    res.send(model)
  })
  app.use('/admin/api/rest/:resource', router)

  const multer = require('multer')
  const path = require('path')
  const upload = multer({ dest: path.resolve(__dirname, '../../uploads') })
  app.use('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}
