const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memberSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true,
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;