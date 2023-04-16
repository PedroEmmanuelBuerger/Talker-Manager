const express = require('express');

const talkerRouter = express.Router();
const { readTalkers, readTalkersId, writeTalkers,
    attTalkers, deleteTalker } = require('../utils/fsFunctions');

const tokkenMiddleware = require('../middlewares/tokenMiddle');
const nameMiddleware = require('../middlewares/nameMiddle');
const ageMiddleware = require('../middlewares/ageMiddle');
const talkMiddleware = require('../middlewares/talkMiddle');
const watchedMiddleware = require('../middlewares/watchedAt');
const rateMiddleware = require('../middlewares/rateMiddle');
const queryMiddleware = require('../middlewares/qMiddle');

talkerRouter.get('/', async (_req, res) => {
    const talkers = await readTalkers();
    res.status(200).json(talkers);
});

talkerRouter.get('/search', tokkenMiddleware, queryMiddleware, async (req, res) => {
    const result = req.nameQuery;
    return res.status(200).json(result);
});

talkerRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talkerById = await readTalkersId(id);
    if (talkerById) {
      return res.status(200).json(talkerById);
    }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

talkerRouter.post('/',
    tokkenMiddleware, nameMiddleware, ageMiddleware,
    talkMiddleware, watchedMiddleware, rateMiddleware,
 async (req, res) => {
    const newTalker = req.body;
    const newTalkerJson = await writeTalkers(newTalker);
    res.status(201).json(newTalkerJson);
});

talkerRouter.put('/:id',
tokkenMiddleware, nameMiddleware, ageMiddleware,
    talkMiddleware, watchedMiddleware, rateMiddleware,
 async (req, res) => {
    const { id } = req.params;
    const newTalker = req.body;
    const attTalker = await attTalkers(id, newTalker);
    if (!attTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(attTalker);
});

talkerRouter.delete('/:id', tokkenMiddleware, async (req, res) => {
    const { id } = req.params;
    await deleteTalker(id);
   return res.status(204).json();
});

module.exports = talkerRouter;
