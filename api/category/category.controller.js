
// sirve para filtrar los datos que quiero y por ende elimina los que noq uiero del objeto

const Category = require('./category.model');

exports.getId = (req, res) => {
  const { id } = req.params;
  Category.findById(id, (err, categoryDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    return res.json({
      ok: true,
      categoryDB,
    });
  }).populate('user', 'nombre email');
};

exports.getAll = (req, res) => {
  const { sky } = req.query || 0;
  const { lim } = req.query || 5;
  Category.find({})
    .sort('description')
    .populate('user', 'nombre email')
    .skip(Number(sky))
    .limit(Number(lim))
    .exec((err, category) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      return res.json({
        ok: true,
        category,
      });
    });
};

exports.saveCategory = (req, res) => {
  const { description } = req.body;
  const { _id } = req.user;
  const category = new Category({
    description,
    user: _id,
  });
  category.save((err, categoryDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (!categoryDB) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    return res.json({
      ok: true,
      user: categoryDB,
    });
  });
};

exports.removeCategory = (req, res) => {
  const { id } = req.params;

  Category.findByIdAndRemove(id, (err, categoriaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!categoriaDB) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    return res.json({
      ok: true,
      message: 'categoria elminada',
    });
  });
};

exports.updateCategory = (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  Category.findByIdAndUpdate(id, { description },
    { new: true, runValidators: true }, (err, categoriaDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      if (!categoriaDB) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      return res.json({
        ok: true,
        categoria: categoriaDB,
      });
    });
};
