const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.get('token');
  jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: 'Token no valido',
        },
      });
    }
    req.user = decoded.user;
    return next();
  });
};

exports.verifyTokenQuery = (req, res, next) => {
  const { token } = req.query;
  jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: 'Token no valido',
        },
      });
    }
    req.user = decoded.user;
    return next();
  });
};

exports.verifyAdminRole = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      ok: false,
      err: {
        message: 'No tienes el rol suficiente para realizar esta peticion',
      },
    });
  }
  return next();
};
