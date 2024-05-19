const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    url: { type: String,  },
    format: { type: String,  },
    height: { type: Number,  },
    width: { type: Number,  },
    type: { type: String,  },
    subtype: { type: String,  },
    caption: { type: String,  },
    copyright: { type: String, },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent', required: true }
}, {
    timestamps: true
});

const Variant = mongoose.model('Variant', variantSchema);

module.exports = Variant;
