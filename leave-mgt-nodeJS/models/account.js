const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  leaveType: {
    type: String,
    required: true,
  },
});

const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'other'],
  },
  firstname: String,
  lastname: String,
  leaves: [leaveSchema],
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
