const nameMiddleware = (req, _res, next) => {
 const { name } = req.body;
  if (!name) {
    return next({ status: 400, message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return next({ status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
};

module.exports = nameMiddleware;