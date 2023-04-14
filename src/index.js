const express = require('express');
const talkerRouter = require('./routes/talker');
const loginRouter = require('./routes/login');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/login', loginRouter);
app.use('/talker', talkerRouter);

app.listen(PORT, () => {
  console.log('Online');
});
