const fs = require('fs');
const path = require('path');
const User = require('../user/user.model');
const Product = require('../products/product.model');

const deleteFile = (image, type) => {
  const pathImg = path.resolve(__dirname, `../../uploads/${type}/${image}`);
  if (fs.existsSync(pathImg)) {
    fs.unlinkSync(pathImg);
  }
};

exports.imageUser = (id, name) => new Promise((resolve, reject) => {
  User.findById(id, (err, userDB) => {
    if (err) {
      deleteFile(name, 'users');
      const error = { err, ok: false, status: 500 };
      return reject(error);
    }
    if (!userDB) {
      deleteFile(name, 'users');
      const error = { err: { message: 'Usuario no existe' }, ok: false, status: 400 };
      return reject(error);
    }

    deleteFile(userDB.img, 'users');
    const user = userDB;
    user.img = name;
    return user.save((err1, userSave) => {
      if (err1) {
        const error = { err: err1, ok: false, status: 500 };
        return reject(error);
      }
      return resolve({
        ok: true,
        userSave,
        img: name,
      });
    });
  });
});

exports.imageProduct = (id, name) => new Promise((resolve, reject) => {
  Product.findById(id, (err, productDB) => {
    if (err) {
      deleteFile(name, 'products');
      const error = { err, ok: false, status: 500 };
      return reject(error);
    }
    if (!productDB) {
      deleteFile(name, 'users');
      const error = { err: { message: 'Producto no existe' }, ok: false, status: 400 };
      return reject(error);
    }

    deleteFile(productDB.img, 'products');
    const product = productDB;
    product.img = name;
    return product.save((err1, productSave) => {
      if (err1) {
        const error = { err: err1, ok: false, status: 500 };
        return reject(error);
      }
      return resolve({
        ok: true,
        productSave,
        img: name,
      });
    });
  });
});
