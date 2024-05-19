const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
    section: { type: String, },
    subsection: { type: String, },
    title: { type: String,  },
    abstract: { type: String,  },
    url: { type: String,  },
    uri: { type: String,  },
    byline: { type: String,  },
    item_type: { type: String,  },
    updated_date: { type: Date,  },
    created_date: { type: Date,  },
    published_date: { type: Date,  },
    multimedia: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Variant' }]
}, {
    timestamps: true
});

const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;
