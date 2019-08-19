const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {type: String}
})

module.exports = mongoose.model('Category',schema)