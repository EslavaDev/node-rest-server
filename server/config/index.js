// Variables de entorno

// port
process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


let urlDB;
if (process.env.NODE_ENV === 'env') {
  urlDB = 'mongodb://localhost:27017/coffee';
} else {
  urlDB = 'mongodb://<admin>:<admin12>@ds257732.mlab.com:57732/coffee-rest';
}

process.env.MONGODB = urlDB;
