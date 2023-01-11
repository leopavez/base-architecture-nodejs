/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const { userSchema } = require('../schemas/users');

const createNewUserController = async (req) => {
  // eslint-disable-next-line object-curly-newline
  const { name, password, email, country, user_type, phone } = req;

  const User = mongoose.model('users', userSchema);

  const newUser = new User({
    name,
    password,
    email,
    country,
    user_type,
    contact: {
      phone,
    },
  });

  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error('Email already exist');
  }

  const save = User.create(newUser);

  return save;
};

module.exports = { createNewUserController };
