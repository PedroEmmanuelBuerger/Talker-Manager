const rattSearchMiddleware = (req, _res, next) => {
const filteredByQuery = req.nameQuery;
const query = req.query.rate;
if (query === undefined) {
return next();
}
const queryNumber = Number(query);
if (!Number.isInteger(queryNumber) || queryNumber < 1 || queryNumber > 5) {
  return next({ status: 400, message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
}
const newFilters = filteredByQuery.filter((talker) => talker.talk.rate === queryNumber);
req.nameQuery = newFilters;
next();
};

module.exports = rattSearchMiddleware;