const talkMiddleware = (req, _res, next) => {
    const { talk } = req.body;
    if (!talk) {
      return next({ status: 400, message: 'O campo "talk" é obrigatório' });
    }
    return next();
};

module.exports = talkMiddleware;