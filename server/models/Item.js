const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  icon: {
    type: String
  },
  kda: {
    all: {
      all: { k: { type: Number }, d: { type: Number }, a: { type: Number } },
      y: { k: { type: Number }, d: { type: Number }, a: { type: Number } },
      n: { k: { type: Number }, d: { type: Number }, a: { type: Number } }

    },
    pro: {
      all: { k: { type: Number }, d: { type: Number }, a: { type: Number } },
      y: { k: { type: Number }, d: { type: Number }, a: { type: Number } },
      n: { k: { type: Number }, d: { type: Number }, a: { type: Number } }
    },
    vh: {
      all: { k: { type: Number }, d: { type: Number }, a: { type: Number } },
      y: { k: { type: Number }, d: { type: Number }, a: { type: Number } },
      n: { k: { type: Number }, d: { type: Number }, a: { type: Number } }
    },
    h: {
      all: { k: { type: Number }, d: { type: Number }, a: { type: Number } },
      y: { k: { type: Number }, d: { type: Number }, a: { type: Number } },
      n: { k: { type: Number }, d: { type: Number }, a: { type: Number } }

    },
    n: {
      all: { k: { type: Number }, d: { type: Number }, a: { type: Number } },
      y: { k: { type: Number }, d: { type: Number }, a: { type: Number } },
      n: { k: { type: Number }, d: { type: Number }, a: { type: Number } }
    }
  },
  dmg: {
    all: {
      all: { d: { type: Number }, h: { type: Number } },
      y: { d: { type: Number }, h: { type: Number } },
      n: { d: { type: Number }, h: { type: Number } }

    },
    pro: {
      all: { d: { type: Number }, h: { type: Number } },
      y: { d: { type: Number }, h: { type: Number } },
      n: { d: { type: Number }, h: { type: Number } }
    },
    vh: {
      all: { d: { type: Number }, h: { type: Number } },
      y: { d: { type: Number }, h: { type: Number } },
      n: { d: { type: Number }, h: { type: Number } }
    },
    h: {
      all: { d: { type: Number }, h: { type: Number } },
      y: { d: { type: Number }, h: { type: Number } },
      n: { d: { type: Number }, h: { type: Number } }

    },
    n: {
      all: { d: { type: Number }, h: { type: Number } },
      y: { d: { type: Number }, h: { type: Number } },
      n: { d: { type: Number }, h: { type: Number } }
    }
  },
  gpm: {
    all: {
      all: { type: Number },
      y: { type: Number },
      n: { type: Number }

    },
    pro: {
      all: { type: Number },
      y: { type: Number },
      n: { type: Number }
    },
    vh: {
      all: { type: Number },
      y: { type: Number },
      n: { type: Number }
    },
    h: {
      all: { type: Number },
      y: { type: Number },
      n: { type: Number }

    },
    n: {
      all: { type: Number },
      y: { type: Number },
      n: { type: Number }
    }
  },
  xpm: {
    all: {
      all: { type: Number },
      y: { type: Number },
      n: { type: Number }

    },
    pro: {
      all: { type: Number },
      y: { type: Number },
      n: { type: Number }
    },
    vh: {
      all: { type: Number },
      y: { type: Number },
      n: { type: Number }
    },
    h: {
      all: { type: Number },
      y: { type: Number },
      n: { type: Number }

    },
    n: {
      all: { type: Number },
      y: { type: Number },
      n: { type: Number }
    }
  },
  rate: {
    all: {
      all: { type: Number },
      y: { type: Number },
      n: { type: Number }

    },
    pro: {
      all: { type: Number },
      y: { type: Number },
      n: { type: Number }
    },
    vh: {
      all: { type: Number },
      y: { type: Number },
      n: { type: Number }
    },
    h: {
      all: { type: Number },
      y: { type: Number },
      n: { type: Number }

    },
    n: {
      all: { type: Number },
      y: { type: Number },
      n: { type: Number }
    }
  },
  played: {
    all: {
      all: [{
        hero: { type: mongoose.SchemaTypes.ObjectId },
        winRates: { type: String },
        playeds: { type: String }

      }],
      y: [{
        hero: { type: mongoose.SchemaTypes.ObjectId },
        winRates: { type: String },
        playeds: { type: String }

      }],
      n: [{
        hero: { type: mongoose.SchemaTypes.ObjectId },
        winRates: { type: String },
        playeds: { type: String }

      }]

    },
    pro: {
      all: [{
        hero: { type: mongoose.SchemaTypes.ObjectId },
        winRates: { type: String },
        playeds: { type: String }

      }],
      y: [{
        hero: { type: mongoose.SchemaTypes.ObjectId },
        winRates: { type: String },
        playeds: { type: String }

      }],
      n: [{
        hero: { type: mongoose.SchemaTypes.ObjectId },
        winRates: { type: String },
        playeds: { type: String }

      }]
    },
    vh: {
      all: [{
        hero: { type: mongoose.SchemaTypes.ObjectId },
        winRates: { type: String },
        playeds: { type: String }

      }],
      y: [{
        hero: { type: mongoose.SchemaTypes.ObjectId },
        winRates: { type: String },
        playeds: { type: String }

      }],
      n: [{
        hero: { type: mongoose.SchemaTypes.ObjectId },
        winRates: { type: String },
        playeds: { type: String }

      }]
    },
    h: {
      all: [{
        hero: { type: mongoose.SchemaTypes.ObjectId },
        winRates: { type: String },
        playeds: { type: String }

      }],
      y: [{
        hero: { type: mongoose.SchemaTypes.ObjectId },
        winRates: { type: String },
        playeds: { type: String }

      }],
      n: [{
        hero: { type: mongoose.SchemaTypes.ObjectId },
        winRates: { type: String },
        playeds: { type: String }

      }]

    },
    n: {
      all: [{
        hero: { type: mongoose.SchemaTypes.ObjectId },
        winRates: { type: String },
        playeds: { type: String }

      }],
      y: [{
        hero: { type: mongoose.SchemaTypes.ObjectId },
        winRates: { type: String },
        playeds: { type: String }

      }],
      n: [{
        hero: { type: mongoose.SchemaTypes.ObjectId },
        winRates: { type: String },
        playeds: { type: String }

      }]
    }
  },
  description: { type: String }
})

module.exports = mongoose.model('item', schema)
