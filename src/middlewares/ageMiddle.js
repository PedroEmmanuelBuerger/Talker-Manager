const ageMiddleware = (req, _res, next) => {
    const { age } = req.body;
    if (!age) {
      return next({ status: 400, message: 'O campo "age" é obrigatório' });
    }
    if (Number(age) < 18 || !Number.isInteger(age)) {
      return next({ status: 400, 
        message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
    }
    return next();
};

module.exports = ageMiddleware;