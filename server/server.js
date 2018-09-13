const express = require('express');

const app = express();
require('./config');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/user', (req, res) => {
  res.json('get user');
});
app.post('/user', (req, res) => {
  const { body } = req;

  if (!body.nombre) {
    return res.status(400).json({
      ok: false,
      mensaje: 'el nombre es necesario',
    });
  }
  return res.status(201).json(
    {
      body: { ...body, ok: true },
    },
  );
});
app.put('/user/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
  });
});
app.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
