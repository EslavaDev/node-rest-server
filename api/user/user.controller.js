const bcrypt = require('bcrypt');

// sirve para filtrar los datos que quiero y por ende elimina los que noq uiero del objeto
const _ = require('underscore');

const User = require('./user.model');

exports.saveUser = (req, res) => {
  const {
    nombre, email, password, role,
  } = req.body;
  const user = new User({
    nombre,
    email,
    password: bcrypt.hashSync(password, 10),
    role,
  });

  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    // userDB.password = null;
    return res.json({
      ok: true,
      user: userDB,
    });
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

  User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    return res.json({
      ok: true,
      user: userDB,
    });
  });
};

exports.getUsers = (req, res) => {
  const { sky } = req.query || 0;
  const { lim } = req.query || 5;
  User.find({ estado: true }, 'nombre email role estado google img')
    .skip(Number(sky))
    .limit(Number(lim))
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      return User.countDocuments({ estado: true }, (errCount, count) => {
        if (errCount) {
          return res.status(400).json({
            ok: false,
            errCount,
          });
        }
        return res.json({
          ok: true,
          users,
          count,
        });
      });
    });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  // User.findByIdAndUpdate(id, (err, userDB) => {
  User.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    if (!userDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario no encontrado',
        },
      });
    }
    return res.json({
      ok: true,
      delete: userDB,
    });
  });
};
