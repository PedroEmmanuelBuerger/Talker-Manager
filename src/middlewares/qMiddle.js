const { readTalkers } = require('../utils/fsFunctions');

const queryMiddleware = async (req, _res, next) => {
    const query = req.query.q;
    const allTalkers = await readTalkers();
    if (!query) {
    req.nameQuery = allTalkers;
    return next();
    }
    const talkersByQuery = allTalkers.filter((talker) => talker.name.includes(query));
    req.nameQuery = talkersByQuery;
    next();
};

module.exports = queryMiddleware;