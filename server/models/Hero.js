const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  icon: {
    type: String
  },
  categories: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }],
  scores: {
    difficult: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
    agile: { type: Number }
  },
  skills: [{
    icon: {
      type: String
    },
    name: {
      type: String
    },
    descrition: {
      type: String
    }
  }],
  items: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'item'
  }],
  tips: { type: String },
  partners: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Hero'
  }]
})

module.exports = mongoose.model('Hero', schema)
