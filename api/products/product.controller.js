const Product = require('./product.model');

exports.saveProduct = (req, res) => {
  const {
    nombre,
    precioUni,
    descripcion,
    disponible,
    categoria,
  } = req.body;

  const { _id } = req.user;

  const product = new Product({
    nombre,
    precioUni,
    descripcion,
    disponible,
    categoria,
    usuario: _id,
  });

  product.save((err, productDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (!productDB) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    return res.status(201).json({
      ok: true,
      product: productDB,
    });
  });
};

exports.getAll = (req, res) => {
  const { sky } = req.query || 0;
  const { lim } = req.query || 5;
  Product.find({ disponible: true })
    .sort('nombre')
    .populate('usuario', 'nombre email')
    .populate('categoria', 'description')
    .skip(Number(sky))
    .limit(Number(lim))
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      return res.json({
        ok: true,
        product,
      });
    });
};

exports.getProductSearch = (req, res) => {
  const { term } = req.params;
  // const { _id } = req.user;

  const regex = new RegExp(term, 'i');
  Product.find({ nombre: regex })
    .populate('categoria', 'description')
    .exec((err, products) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      if (!products) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'El termino no existe',
          },
        });
      }
      return res.json({
        ok: true,
        products,
      });
    });
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  Product.findByIdAndUpdate(id, body,
    { new: true }, (err, productDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      if (!productDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'El ID no existe',
          },
        });
      }
      return res.json({
        ok: true,
        categoria: productDB,
      });
    });
};

exports.getId = (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .populate('usuario', 'nombre email')
    .populate('categoria', 'description')
    .exec((err, productDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      if (!productDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'El ID no existe',
          },
        });
      }
      return res.json({
        ok: true,
        productDB,
      });
    });
};

exports.removeProduct = (req, res) => {
  const { id } = req.params;
  Product.findByIdAndUpdate(id, { disponible: false },
    { new: true }, (err, productDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      if (!productDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'El ID no existe',
          },
        });
      }
      return res.json({
        ok: true,
        categoria: productDB,
      });
    });
};
