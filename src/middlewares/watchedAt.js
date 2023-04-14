const watchedMiddleware = (req, _res, next) => {
    const { talk } = req.body;
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    const { watchedAt } = talk;
    if (!watchedAt) {
      return next({ status: 400, message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!dateRegex.test(watchedAt)) {
      return next({ status: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    return next();
};

module.exports = watchedMiddleware;