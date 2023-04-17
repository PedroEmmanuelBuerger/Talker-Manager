const watQueryMiddleware = (req, _res, next) => {
    const query = req.query.date;
    if (!query) {
        return next();
    }
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(query)) {
        return next({ status: 400, message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
      }
    const oldTalkers = req.nameQuery;
    const filteredTalkers = oldTalkers.filter((talker) => talker.talk.watchedAt === query);
    req.nameQuery = filteredTalkers;
    next();
};

module.exports = watQueryMiddleware;