const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');

const jwt = require('jsonwebtoken');
const User = require('../user/user.model');

const client = new OAuth2Client(process.env.CLIENT_ID);

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
    }, process.env.SEED_TOKEN, { expiresIn: process.env.EXP_TOKEN }); // expira en 30 dias
    return res.json({
      ok: true,
      userDB,
      token,
    });
  });
};

// configuracion de google
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  console.log(payload.name);
  console.log(payload.email);
  console.log(payload.picture);
  console.log(payload.sub);
  console.log(payload);
  return {
    nombre: payload.name,
    email: payload.email,
    img: payload.picture,
    google: true,
  };
}

exports.google = async (req, res) => {
  let { token } = req.body;
  const googleUser = await verify(token).catch(e => res.status(403).json({
    ok: false,
    err: e,
  }));
  const {
    nombre, email, img, google,
  } = googleUser;

  return User.findOne({ email }, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (userDB) {
      if (userDB.google === false) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'Debe de usar su autenticacion normal',
          },
        });
      }
      token = jwt.sign({
        user: userDB,
      }, process.env.SEED_TOKEN, { expiresIn: process.env.EXP_TOKEN }); // expira en 30 dias
      return res.json({
        ok: true,
        userDB,
        token,
      });
    }
    // si el usuario no existe en la BD
    const user = new User({
      nombre,
      email,
      img,
      password: ';)',
      google,
    });
    return user.save((errSave, saveDB) => {
      if (errSave) {
        return res.status(500).json({
          ok: false,
          errSave,
        });
      }
      token = jwt.sign({
        user: saveDB,
      }, process.env.SEED_TOKEN, { expiresIn: process.env.EXP_TOKEN }); // expira en 30 dias
      return res.json({
        ok: true,
        saveDB,
        token,
      });
    });
  });
};
