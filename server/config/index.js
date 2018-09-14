// Variables de entorno

// port
process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


let urlDB;
if (process.env.NODE_ENV === 'env') {
  urlDB = 'mongodb://localhost:27017/coffee';
} else {
  urlDB = process.env.MONGODB;
}

process.env.MONGODB = urlDB;
