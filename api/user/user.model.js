const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const rolValid = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol válido',
};

const userSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'el nombre es necesario'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email es obligatorio'],
  },
  password: {
    type: String,
    required: [true, 'the password is required'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: rolValid,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.toJSON = function () {
  const userThis = this;
  const userObject = userThis.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });

module.exports = mongoose.model('User', userSchema);
