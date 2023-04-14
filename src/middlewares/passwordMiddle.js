const passwordMiddleware = (req, _res, next) => {
    const { password } = req.body;
    if (!password) {
       return next({ status: 400, message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return next({ status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    return next();
};

module.exports = passwordMiddleware;