const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  icon: {
    type: String
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
      all: { d: { type: Number }, h: { type: Number }, bd: { type: Number } },
      y: { d: { type: Number }, h: { type: Number }, bd: { type: Number } },
      n: { d: { type: Number }, h: { type: Number }, bd: { type: Number } }

    },
    pro: {
      all: { d: { type: Number }, h: { type: Number }, bd: { type: Number } },
      y: { d: { type: Number }, h: { type: Number }, bd: { type: Number } },
      n: { d: { type: Number }, h: { type: Number }, bd: { type: Number } }
    },
    vh: {
      all: { d: { type: Number }, h: { type: Number }, bd: { type: Number } },
      y: { d: { type: Number }, h: { type: Number }, bd: { type: Number } },
      n: { d: { type: Number }, h: { type: Number }, bd: { type: Number } }
    },
    h: {
      all: { d: { type: Number }, h: { type: Number }, bd: { type: Number } },
      y: { d: { type: Number }, h: { type: Number }, bd: { type: Number } },
      n: { d: { type: Number }, h: { type: Number }, bd: { type: Number } }

    },
    n: {
      all: { d: { type: Number }, h: { type: Number }, bd: { type: Number } },
      y: { d: { type: Number }, h: { type: Number }, bd: { type: Number } },
      n: { d: { type: Number }, h: { type: Number }, bd: { type: Number } }
    }
  },
  cs: {
    all: {
      all: { c: { type: Number }, s: { type: Number } },
      y: { c: { type: Number }, s: { type: Number } },
      n: { c: { type: Number }, s: { type: Number } }

    },
    pro: {
      all: { c: { type: Number }, s: { type: Number } },
      y: { c: { type: Number }, s: { type: Number } },
      n: { c: { type: Number }, s: { type: Number } }
    },
    vh: {
      all: { c: { type: Number }, s: { type: Number } },
      y: { c: { type: Number }, s: { type: Number } },
      n: { c: { type: Number }, s: { type: Number } }
    },
    h: {
      all: { c: { type: Number }, s: { type: Number } },
      y: { c: { type: Number }, s: { type: Number } },
      n: { c: { type: Number }, s: { type: Number } }

    },
    n: {
      all: { c: { type: Number }, s: { type: Number } },
      y: { c: { type: Number }, s: { type: Number } },
      n: { c: { type: Number }, s: { type: Number } }
    }
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
  talent: [{
    l: {
      type: String
    },
    r: {
      type: String
    }
  }],
  items: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'item'
  }],
  tips: { type: String },
  OpponentsAndTeammates: {
    opp: {
      all: {
        all: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }],
        y: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }],
        n: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }]
      },
      pro: {
        all: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }],
        y: { type: Array },

        n: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }]
      },
      vh: {
        all: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }],
        y: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }],
        n: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }]
      },
      h: {
        all: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }],
        y: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }],
        n: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }]
      },
      n: {
        all: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }],
        y: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }],
        n: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }]
      }
    },
    team: {

      all: {
        all: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }],
        y: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }],
        n: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }]
      },
      pro: {
        all: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }],
        y: { type: Array },
        n: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }]
      },
      vh: {
        all: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }],
        y: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }],
        n: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }]
      },
      h: {
        all: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }],
        y: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }],
        n: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }]
      },
      n: {
        all: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }],
        y: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }],
        n: [{
          hero: { type: mongoose.SchemaTypes.ObjectId },
          antiRate: { type: String },
          winRates: { type: String },
          playeds: { type: String }
        }]
      }
    }
  },
  addSkills: {
    all: {
      all: [{
        rate: {
          type: Number
        },
        utilization: {
          type: Number
        },
        addedLevel: [{
          type: Array
        }]
      }],
      y: [{
        rate: {
          type: Number
        },
        utilization: {
          type: Number
        },
        addedLevel: [{
          type: Array
        }]
      }],
      n: [{
        rate: {
          type: Number
        },
        utilization: {
          type: Number
        },
        addedLevel: [{
          type: Array
        }]
      }]
    },
    pro: {
      all: [{
        rate: {
          type: Number
        },
        utilization: {
          type: Number
        },
        addedLevel: [{
          type: Array
        }]
      }],
      y: { type: Array },

      n: [{
        rate: {
          type: Number
        },
        utilization: {
          type: Number
        },
        addedLevel: [{
          type: Array
        }]
      }]
    },
    vh: {
      all: [{
        rate: {
          type: Number
        },
        utilization: {
          type: Number
        },
        addedLevel: [{
          type: Array
        }]
      }],
      y: [{
        rate: {
          type: Number
        },
        utilization: {
          type: Number
        },
        addedLevel: [{
          type: Array
        }]
      }],
      n: [{
        rate: {
          type: Number
        },
        utilization: {
          type: Number
        },
        addedLevel: [{
          type: Array
        }]
      }]
    },
    h: {
      all: [{
        rate: {
          type: Number
        },
        utilization: {
          type: Number
        },
        addedLevel: [{
          type: Array
        }]
      }],
      y: [{
        rate: {
          type: Number
        },
        utilization: {
          type: Number
        },
        addedLevel: [{
          type: Array
        }]
      }],
      n: [{
        rate: {
          type: Number
        },
        utilization: {
          type: Number
        },
        addedLevel: [{
          type: Array
        }]
      }]
    },
    n: {
      all: [{
        rate: {
          type: Number
        },
        utilization: {
          type: Number
        },
        addedLevel: [{
          type: Array
        }]
      }],
      y: [{
        rate: {
          type: Number
        },
        utilization: {
          type: Number
        },
        addedLevel: [{
          type: Array
        }]
      }],
      n: [{
        rate: {
          type: Number
        },
        utilization: {
          type: Number
        },
        addedLevel: [{
          type: Array
        }]
      }]
    }
  }

})

module.exports = mongoose.model('Hero', schema)
