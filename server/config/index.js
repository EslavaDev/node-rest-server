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
process.env.EXP_TOKEN = process.env.EXP_TOKEN || '720h';

// ======================
//       SEED AUTH
// ======================
process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'token_Super_Secret';

// ======================
//    Google CLIENTID
// ======================
process.env.CLIENT_ID = process.env.CLIENT_ID || '633492711856-pcka0g6op48ugs2or0t6pln9c5p3sqbn.apps.googleusercontent.com';

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
