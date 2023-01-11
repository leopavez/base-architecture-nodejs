const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, required: true, default: 'active' },
  country: { type: String, required: true },
  email_verified: { type: Boolean, required: true, default: false },
  user_type: { type: String, required: true },
  contact: {
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    region: { type: String, required: true },
  },
}, {
  collection: 'users',
});

module.exports = { userSchema };
