const mongoose = require("mongoose");

const schema = mongoose.Schema({
  username: { type: String },
  password: { 
      type: String, 
      select: false,
      set(val){
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(val, salt);
      }
    }
});

module.exports = mongoose.model("AdminUser", schema);
