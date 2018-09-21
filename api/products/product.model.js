const mongoose = require('mongoose');

const { Schema } = mongoose;


const productoSchema = new Schema({
  nombre: { type: String, required: [true, 'El nombre es necesario'] },
  precioUni: { type: Number, required: [true, 'El precio únitario es necesario'] },
  descripcion: { type: String, required: false },
  disponible: { type: Boolean, required: true, default: true },
  categoria: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  usuario: { type: Schema.Types.ObjectId, ref: 'User' },
  img: {
    type: String,
  },
});


module.exports = mongoose.model('Product', productoSchema);
