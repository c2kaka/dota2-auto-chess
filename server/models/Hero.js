const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {type: String},
    avatar: {type: String}
})

module.exports = mongoose.model('Hero',schema)