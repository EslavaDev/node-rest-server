const fs = require('fs');
const path = require('path');

exports.image = (req, res) => {
  const { tipo, img } = req.params;
  const pathImg = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
  if (fs.existsSync(pathImg)) {
    return res.sendFile(pathImg);
  }
  const noImage = path.resolve(__dirname, '../../server/assets/no-image.jpg');
  return res.sendFile(noImage);
};
