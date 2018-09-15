const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../user/user.model');

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (!userDB || !bcrypt.compareSync(password, userDB.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario o contraseña incorrectos',
        },
      });
    }
    const token = jwt.sign({
      user: userDB,
    }, process.env.SEED_TOKEN, { expiresIn: process.env.EXP_TOKEN }); // espira en 30 dias
    return res.json({
      ok: true,
      userDB,
      token,
    });
  });
};
