const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  banner: { type: String },
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
  race: {type: String},
  profession: {type: String},
  scores: {
    cost: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number }
  },
  skills: [{
    icon: { type: String },
    name: { type: String },
    delay: { type: Number },
    cost: { type: Number },
    description: { type: String },
    tips: { type: String },
    level: {type: Number}
  }]    ,
  stats: [{
    Damage: { type: Number },
    armor: { type: Number },
    probability: { type: Number },
    level: { type: Number },
    HP: { type: Number },
    attackRange: {type: Number},
    description: { type: String }
  }] ,
  items: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },
  partners: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
      description: { type: String }
    }
  ]
});

module.exports = mongoose.model("Hero", schema, 'heroes');
