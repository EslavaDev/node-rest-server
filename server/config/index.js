// Variables de entorno

// ======================
//       Port
// ======================
process.env.PORT = process.env.PORT || 3000;

// ======================
//       Entorno
// ======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ======================
//   Vencimiento Token
// ======================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.EXP_TOKEN = process.env.EXP_TOKEN || 60 * 60 * 24 * 30;

// ======================
//       SEED AUTH
// ======================
process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'token_Super_Secret';

// ======================
//     Base de Datos
// ======================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/coffee';
} else {
  urlDB = process.env.MONGODB;
}

process.env.MONGODB = urlDB;
