const path = require('path');
const { imageUser, imageProduct } = require('./uploads.services');

exports.updates = (req, res) => {
  const { tipo, id } = req.params;

  if (!req.files) {
    return res.status(400)
      .json({
        ok: false,
        err: {
          message: 'No files were uploaded.',
        },
      });
  }

  // tipos validos
  const typesOk = ['products', 'users'];
  if (typesOk.indexOf(tipo) < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        message: `el tipo es incorrecto, tipos validos ${typesOk.join(', ')}`,
        tipo,
      },
    });
  }


  const files = req.files.archivo;
  const nameFileSplit = files.name.split('.');
  const extention = nameFileSplit[nameFileSplit.length - 1];

  // extensiones permitidas
  const extentionOk = ['png', 'jpg', 'jpeg'];

  if (extentionOk.indexOf(extention) < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        message: `La extension del archivo no es valida. las permitidas son ${extentionOk.join(', ')}`,
        extention,
      },
    });
  }


  // cambiar nombre al archivo
  const nameArchivo = `${id}-${new Date().getMilliseconds()}.${extention}`;

  // Use the mv() method to place the file somewhere on your server
  return files.mv(path.resolve(__dirname, `../../uploads/${tipo}/${nameArchivo}`), (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (tipo === 'products') {
      return imageProduct(id, nameArchivo)
        .then((ok) => {
          console.log(ok);
          return res.json(ok);
        })
        .catch((ok) => {
          if (ok.status === 500) {
            const ok1 = ok;
            delete ok1.status;
            return res.status(500).json(ok1);
          }
          const ok1 = ok;
          delete ok1.status;
          return res.status(400).json(ok1);
        });
    }
    return imageUser(id, nameArchivo)
      .then((ok) => {
        console.log(ok);
        return res.json(ok);
      })
      .catch((ok) => {
        if (ok.status === 500) {
          const ok1 = ok;
          delete ok1.status;
          return res.status(500).json(ok1);
        }
        const ok1 = ok;
        delete ok1.status;
        return res.status(400).json(ok1);
      });
  });
};
