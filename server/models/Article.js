const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  categories: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }],
  title: {
    type: String
  },
  subTitle: {
    type: String
  },
  logo: {
    type: String
  },
  body: {
    type: String
  },
  addTime: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('Article', schema)
