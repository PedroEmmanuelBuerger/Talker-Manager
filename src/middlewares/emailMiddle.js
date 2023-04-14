const emailMiddleware = (req, _res, next) => {
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validateEmail = emailRegex.test(email);
    if (!email) {
      return next({ status: 400, message: 'O campo "email" é obrigatório' });
    }
    if (!validateEmail) {
        return next({ status: 400, message: 'O "email" deve ter o formato "email@email.com"' });
    }
    return next();
};

module.exports = emailMiddleware;